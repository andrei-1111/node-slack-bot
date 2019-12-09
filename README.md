
This project is based on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/daniel-khan) 'Building Bots with Node.js' course.


## Initial project setup
  - Install npm packages.
  ```
  npm install -S @slack/events-api
  npm install -S @slack/web-api
  ```
  - Setup Slack API app and credentials on https://api.slack.com/
  - Set the slack variables on .env file
  ```
  SLACK_SIGNING_SECRET={slack_signing_secret}
  SLACK_TOKEN={slack_token}
  ```
  - Run node server.  By default this would run on port 3000.:
  ```
  npm run dev
  ```
  - Run the node server on a tunnel using Ngrok:
  ```
  ngrok http 3000
  ```
  - Set the ngrok URL on [slack](https://api.slack.com/), under Features -> Event Subscriptions.
    - Example URL: https://1234.ngrok.io/bots/slack/events
  - Add Event Subscriptions:
    - `app_mention`
    - `message.channels`
    - `message.groups`
    - `message.im`

---
