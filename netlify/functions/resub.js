const { schedule } = require("@netlify/functions");
const { fetch, FormData } = require("@remix-run/web-fetch");

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
  const response = await fetch("https://pubsubhubbub.appspot.com/subscribe", {
    method: "POST",
    body: formData,
  });

  return {
    statusCode: 200,
  };
}

module.exports = { handler };
