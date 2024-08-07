const fs = require('fs');

module.exports = {
  config: {
    name: "wordgame",
    version: "1.0",
    author: "AceGerome",
    role: 0,
    countdown: 10,
    category: "game",
    description: {
      en: "A game where you have to unscramble a given word within a given time limit to win a prize"
    },
    guide: {
      en: "{pn} - Start the word rearranging game"
    }
  },

  onStart: async function({ message, event, commandName }) {
    const words = JSON.parse(fs.readFileSync('words.json'));
    const randomWord = words[Math.floor(Math.random() * words.length)];

    const shuffledWord = shuffleWord(randomWord);

    message.reply(`What is this word: "${shuffledWord}" ?`, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        answer: randomWord
      });
    });
  },

  onReply: async ({ message, Reply, event, usersData, envCommands, commandName }) => {
    const { author, messageID, answer } = Reply;

    if (formatText(event.body) === formatText(answer)) {
      global.GoatBot.onReply.delete(messageID);
      message.unsend(event.messageReply.messageID);
      const reward = Math.floor(Math.random() * (100 - 50 + 1) + 50);
      await usersData.addMoney(event.senderID, reward);
      message.reply(`You win and gained ${reward} coins!`);
    }
    else {
      message.reply("Sorry, that's incorrect.");
    }
  }
};

function shuffleWord(word) {
  const shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
  if (shuffled === word) {
    return shuffleWord(word);
  }
  return shuffled;
}

function formatText(text) {
  return text.normalize("NFD").toLowerCase();
    }
