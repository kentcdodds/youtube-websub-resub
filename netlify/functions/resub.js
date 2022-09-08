// Check on the current status of the subscription here:
// https://pubsubhubbub.appspot.com/subscription-details?hub.callback=https%3A%2F%2Fkcd-discord-bot-v2.fly.dev%2Fresources%2Fyoutube-push-callback&hub.topic=https%3A%2F%2Fwww.youtube.com%2Fxml%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCz-BYvuntVRt_VpfR6FKXJw&hub.secret=

const { fetch, Request, FormData } = require("@remix-run/web-fetch");

const CALLBACK_URL =
  "https://kcd-discord-bot-v2.fly.dev/resources/youtube-push-callback";
const CHANNEL_ID = "UCz-BYvuntVRt_VpfR6FKXJw";

async function handler() {
  const formData = new FormData();
  formData.set("hub.callback", CALLBACK_URL);
  formData.set(
    "hub.topic",
    `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${CHANNEL_ID}`
  );
  formData.set("hub.verify", "sync");
  formData.set("hub.mode", "subscribe");
  // can optionally set these, but they don't seem to honor lease_seconds and
  // I don't know what the others are for anyway 🤷‍♂️
  // formData.set('hub.verify_token', '')
  // formData.set('hub.secret', '')
  // formData.set('hub.lease_seconds', '')
  const request = new Request("https://pubsubhubbub.appspot.com/subscribe", {
    method: "POST",
    body: formData,
  });
  console.log(
    `\n\nsending request\n`,
    request.url,
    "\n",
    Object.fromEntries(formData.entries())
  );
  const response = await fetch(request);
  console.log(`\n\nreceived response\n`, response.status, response.statusText);

  return {
    statusCode: response.status,
  };
}

module.exports = { handler };
