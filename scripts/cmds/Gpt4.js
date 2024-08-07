const axios = require("axios");

module.exports = {
  config: {
    name: 'gpt4',
    version: '1.0.1',
    author: 'Null69',
    countDown: 0,
    role: 0,
    category: '🤖| AI',
    shortDescription: {
      en: 'Just an AI',
    },
    longDescription: {
      en: 'Just an AI nothing special',
    },
    guide: {
      en: '{pn} [prompt |clear (to reset conversation)]',
    },
  },

  onStart: async function({ api, message, event, args, commandName }) {
    let prompt = args.join(' ');
    
    if (prompt === 'clear') {
        const resetUrl = `http://94.130.129.40:8370/gpt4?prompt=clear&uid=${event.senderID}`;

        try {
            await axios.get(resetUrl);
            message.reply("Conversation reset successfully.");
        } catch (error) {
            console.error(error.message);
            message.reply("An error occurred while resetting the conversation.");
        }
        return;
    }
      const custom = ``;
      let tae = custom + prompt;
    
    if (!prompt) {
      message.reply("Please provide a query.");
      return;
    }


    api.setMessageReaction("🟡", event.messageID, () => {}, true);

    const url = `http://94.130.129.40:8370/gpt4?prompt=${encodeURIComponent(tae)}&uid=${event.senderID}`;

    try {
      const response = await axios.get(url);
      const result = response.data.gpt4;

      message.reply(`${result}`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      api.setMessageReaction("🟢", event.messageID, () => {}, true);
    } catch (error) {
      message.reply('An error occurred.');
      api.setMessageReaction("🔴", event.messageID, () => {}, true);
    }
  },

  onReply: async function({ api, message, event, Reply, args }) {
    const prompt = args.join(' ');
      const custom = ``;
      const tubol = custom + prompt;
    const { author, commandName } = Reply;

    if (author !== event.senderID) return; // Check if sender matches

  if (args[0] === 'clear') {
        const resetUrl = `http://94.130.129.40:8370/gpt4?prompt=clear&uid=${event.senderID}`;

        try {
            await axios.get(resetUrl);
            message.reply("Conversation reset successfully.");
        } catch (error) {
            console.error(error.message);
            message.reply("An error occurred while resetting the conversation.");
        }

        return;
    }
    api.setMessageReaction("🟡", event.messageID, () => {}, true);

    const url = `http://94.130.129.40:8370/gpt4?prompt=${encodeURIComponent(tubol)}&uid=${event.senderID}`;
    
    try {
        const response = await axios.get(url);
        const content = response.data.gpt4;

        message.reply(`${content}`, (err, info) => {
            if (!err) {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName,
                    messageID: info.messageID,
                    author: event.senderID,
                });
            }
        });

        api.setMessageReaction("🟢", event.messageID, () => {}, true);
    } catch (error) {
        console.error(error.message);
        message.reply("An error occurred.");
        api.setMessageReaction("🔴", event.messageID, () => {}, true);
    }
}
};
