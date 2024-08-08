const axios = require("axios");

const status = {
  enabled: true,
};

module.exports = {
  config: {
    name: "sim",
    aliases: [/*"sim", */"simsimi"], 
    version: "1.0.0",
    author: "KENLIEPLAYS",
    countDown: 12,
    role: 0,
    description: {
      en: "Talk with Simsimi."
    }, 
    category: "fun",
    guide: {
      en: "{pn} [ask]",
    },
  },

  onStart: async function({ message, event, args }) {
    if (args[0] === "off" && event.senderID === "100085947075503") {
      status.enabled = false;
      return message.reply("Turned off Simsimi Akira-AI ♡ successfully!");
    } else if (args[0] === "on" && event.senderID === "100085947075503") {
      status.enabled = true;
      return message.reply("Turned on Simsimi Akira-AI ♡ successfully");
    }

    if (!status.enabled) {
      return message.reply("Simsimi Akira-AI ♡ is Already Off, Try Again Later");
    }

    const content = encodeURIComponent(args.join(" "));
    if (!args[0])
      return

    try {
      const res = await axios.get(
        `https://simsimi.site/api/v2/?mode=talk&lang=ph&message=${content}&filter=false`
      );
      const respond = res.data.success;
      if (res.data.error) {
        message.reply(`Error: ${res.data.error}`);
      } else {
        message.reply(respond);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while fetching the data.");
    }
  },
};
