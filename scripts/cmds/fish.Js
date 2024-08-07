module.exports = {
  config: {
    name: "fish",
    aliases: [],
    version: "1.0",
    author: "Aryan",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Fish command - win money",
      tl: "Fish command - manalo ng pera"
    },
    longDescription: {
      en: "Fish command - try your luck and win some money!",
      tl: "Fish command - subukan ang iyong kapalaran at manalo ng pera!"
    },
    category: "goatBot",
    guide: {
      en: "{p}fish",
      tl: "{p}fish"
    }
  },

  onStart: async function({ event, message, threadsData, usersData, api }) {
    const userId = event.senderID;
    const userData = await usersData.get(userId);
    const { name, money } = userData;

    const bet = 100; // Amount of money user needs to bet
    if (money < bet) {
      message.reply("You don't have enough money to play.");
      return;
    }

    const slotItems = ["🐟", "🐡", "🦑", "🦀", "🐠"];
    const result = [];

    for (let i = 0; i < 3; i++) {
      const itemIndex = Math.floor(Math.random() * slotItems.length);
      result.push(slotItems[itemIndex]);
    }

    const won = result.every((item) => item === result[0]);

    if (won) {
      const winnings = 500; // Amount of money user wins
      await usersData.set(userId, { name, money: money + winnings });
      message.reply(`Congratulations! You won ${winnings} money! 🎉`);
    } else {
      await usersData.set(userId, { name, money: money - bet });
      message.reply(`Sorry, you lost ${bet} money. Better luck next time! 😢`);
    }
  },
};
