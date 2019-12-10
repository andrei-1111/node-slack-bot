const express = require('express');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const moment = require('moment');

const router = express.Router();

module.exports = (params) => {
  const { config, witService, reservationService } = params;

  const slackEvents = createEventAdapter(config.slack.signingSecret);
  const slackWebClient = new WebClient(config.slack.token);

  router.use('/events', slackEvents.requestListener());

  async function handleMention(event) {
    const mention = /<@[A-Z0-9]+>/; // Bot name mention
    const eventText = event.text.replace(mention, '').trim();
    const username = 'John';

    let text = '';

    if(!eventText) {
      text = 'No text';
    } else {
      const entities = await witService.query(eventText);
      const { intent, customerName, reservationDateTime, numberOfGuests } = entities;

      if (!intent || intent !== 'reservation' || !customerName ||
          !reservationDateTime || !numberOfGuests) {
        text = 'Sorry - could you rephrase that?';
      } else {
        const reservationResult = await reservationService
          .tryReservation(
            moment(reservationDateTime).unix(),
            numberOfGuests,
            customerName);
        text = reservationResult.success || reservationResult.error;
      }
    }

    return slackWebClient.chat.postMessage({
      text,
      channel: event.channel,
      username: username,
    });
  }

  slackEvents.on('app_mention', handleMention);

  return router;
};
