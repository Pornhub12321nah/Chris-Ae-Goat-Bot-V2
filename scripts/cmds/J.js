module.exports = {
  config:{
    name: "rps",
    version: "1.0.0",
    role: 0,
    author: "Kaizen",
    description: {
      en: "Play the game of jak en poy with the computer"
    },
    category: "game",
    guide: { en: " To use this command, type {pn} < rock | paper | scissors> to start playing rps" },
    countDown: 10
  },

  onStart: async function({ message, event, args }) {
    let choices = ['rock', 'paper', 'scissors'];
    let computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    if (!args || args.length === 0) {
        message.reply("Please provide your choice of 'rock', 'paper', or 'scissors'");
        return;
    }

    let userChoice = args[0];
    
    if (!userChoice || !choices.includes(userChoice)) {
        message.reply("Invalid choice, please choose either 'rock', 'paper', or 'scissors'");
        return;
    }
    
    if (userChoice === computerChoice) {
        message.reply("It's a tie! Both you and the computer chose " + userChoice);
    } else if (userChoice === 'rock' && computerChoice === 'scissors') {
        message.reply("You win! Rock beats scissors");
    } else if (userChoice === 'paper' && computerChoice === 'rock') {
        message.reply("You win! Paper beats rock");
    } else if (userChoice === 'scissors' && computerChoice === 'paper') {
        message.reply("You win! Scissors beats paper");
    } else {
        message.reply("You lose! " + computerChoice + " beats " + userChoice);
    }
}
  };
