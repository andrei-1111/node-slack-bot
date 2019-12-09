const express = require('express');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');

const router = express.Router();

module.exports = (params) => {
  const { config } = params;

  const slackEvents = createEventAdapter(config.slack.signingSecret);
  const slackWebClient = new WebClient(config.slack.token);

  router.use('/events', slackEvents.requestListener());

  async function handleMention(event) {
    const text = 'Example text message.';
    const username = 'John';

    return slackWebClient.chat.postMessage({
      text: text,
      channel: event.channel,
      username: username,
    });
  }

  slackEvents.on('app_mention', handleMention);

  return router;
};
