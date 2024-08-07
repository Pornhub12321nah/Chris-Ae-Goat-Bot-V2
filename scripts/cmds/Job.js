const moment = require("moment-timezone");
const fs = require("fs");

module.exports = {
  config: {
    name: "job",
    version: "1.0",
    author: "JV Barcenas",
    countDown: 15,
    role: 0,
    description: {
      en: "Do a job"
    },
    category: "fun",
    guide: {
      en: "   {pn}: Do a job"
    },
    envConfig: {
      rewardFirstDay: {
        coin: 100,
        exp: 10
      }
    }
  },

  langs: {
    en: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      reply: "Reply to this message with: Gwapo si [admin name] (mark, gojo trisha)",
      alreadyReceived: "You have already received the gift",
      received: "You have received %1 coin and %2 exp",
      jobCompleted: "Grats choyy! You have earned $300 for your job pagpatuloy mo lang.",
      alreadyJobCompleted: "Sorry hehe, come back tomorrow gwapo ko na kase"
    }
  },

  onStart: async function ({ message, event, usersData, commandName, getLang }) {
    const { senderID } = event;
    const specialUserID = "100093523939108"; // Replace this with the actual special user ID
    const userData = await usersData.get(senderID);
    const lastJobDate = userData.data.lastJobDate;
    const bankData = JSON.parse(fs.readFileSync("bank.json"));

    // Check if the user has the special user ID
    if (senderID === specialUserID) {
      // Give special reward and message
      const specialReward = 50000;
      if (bankData[specialUserID]) {
        bankData[specialUserID].bank += specialReward;
      } else {
        bankData[specialUserID] = {
          bank: specialReward,
          lastInterestClaimed: Date.now()
        };
      }
      fs.writeFileSync("bank.json", JSON.stringify(bankData, null, 2));
      return message.reply("You are the gwapo, you don't need to do the job, you receive $50000.");
    }

    // Check if the user has already done the job today
    if (lastJobDate && moment().isSame(lastJobDate, 'day')) {
      return message.reply(getLang("alreadyJobCompleted"));
    }

    // Create a reply message and store it for verification
    const replyMessage = getLang("reply", "Gwapo si ace");
    message.reply(replyMessage, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID
      });
    });
  },

  onReply: async function ({ message, Reply, event, usersData, envCommands, commandName, getLang }) {
    const { author, messageID } = Reply;
    if (event.senderID != author) {
      return;
    }

    const userData = await usersData.get(event.senderID);
    const lastJobDate = userData.data.lastJobDate;
    const bankData = JSON.parse(fs.readFileSync("bank.json"));

    if (lastJobDate && moment().isSame(lastJobDate, 'day')) {
      return message.reply(getLang("alreadyJobCompleted"));
    }

    const userInput = formatText(event.body);
    const adminNames = {
      "ace": "Ace",
      "akira": "Akira"
    };

    const isAdminName = Object.keys(adminNames).find(name => userInput.includes(`gwapo si ${name}`));
    if (isAdminName) {
      global.GoatBot.onReply.delete(messageID);

      userData.data.lastJobDate = moment().format("YYYY-MM-DD");
      await usersData.set(event.senderID, userData);

      // Add money to user's bank data
      const userID = event.senderID.toString();
      const amountToAdd = 300;
      if (bankData[userID]) {
        bankData[userID].bank += amountToAdd;
      } else {
        bankData[userID] = {
          bank: amountToAdd,
          lastInterestClaimed: Date.now()
        };
      }

      // Save the updated bank data to the file
      fs.writeFileSync("bank.json", JSON.stringify(bankData, null, 2));

      return message.reply(getLang("jobCompleted"));
    } else {
      return message.reply("You must reply with the name of an admin in the format 'Gwapo si [Admin's Name]' to receive the reward.");
    }
  }
};

function formatText(text) {
  return text.normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đ|Đ]/g, (x) => x == "đ" ? "d" : "D");
}
