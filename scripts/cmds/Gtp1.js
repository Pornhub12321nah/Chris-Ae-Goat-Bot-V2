const axios = require('axios');

module.exports = {
  config: {
    name: 'bestgpt',
    version: '1.0',
    author: 'Liane',
    role: 0,
    category: 'Ai-Chat',
    description: {
      en: `Best ChatGPT Ever!`
    },
    guide: {
      en: '{pn}bestgpt [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const BoxID = "61562919594080";
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking Best GPT. Please wait a moment...`,
          BoxID
        );

        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/bestgpt?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          const text = trimmedMessage.replace(`𝚊𝚗𝚍 𝚝𝚑𝚊𝚗𝚔𝚜 𝚏𝚘𝚛 𝚞𝚜𝚒𝚗𝚐.\n\n𝙵𝚘𝚕𝚕𝚘𝚠:\nfacebook.com/nealiana.kaye.cagara`, ``);
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: text }, event.threadID, event.messageID);

          console.log(`Sent Best GPT's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from Best GPT API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get Best GPT's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
