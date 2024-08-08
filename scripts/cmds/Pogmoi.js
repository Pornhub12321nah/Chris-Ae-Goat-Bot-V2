module.exports = {
  config: {
    name: "wordcount",
    //aliases: ["wc", "wcount"],
    version: 1.0,
    author: "AceGerome",
    countDown: 5,
    role: 0,
    description: { 
         en: "Count the words and characters in a chat" },
    category: "info",
    guide: { 
         en: "{pn} <sentence or word> - Count the words and characters in a chat" }
  },
  onStart: async function ({ message, args }) {
    const chat = args.join(" ");
    const wordCount = chat.trim().split(/\s+/).length;
    const charCount = chat.trim().length;

    message.reply(`There is ${wordCount} words and ${charCount} characters`);
  }
};
