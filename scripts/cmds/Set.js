module.exports = {
  config: {
    name: "setmoney",
    aliases: ["money"],
    version: "1.0",
    author: "tanvir",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Set user's money amount"
    },
    longDescription: {
      en: "Set the money amount for a user"
    },
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      en: "{pn} <money> [<userID>]"
    }
  },

  langs: {
    en: {
      success: "Successfully set money amount for user '%1' (ID: %2)",
      noUidProvided: "No userID provided. Setting money amount for the command sender."
    }
  },

  onStart: async function ({ api, args, message, event, usersData, getLang }) {
    const money = args[0];
    let uid = args[1];

    if (!uid) {
      uid = event.senderID;
      message.reply(getLang("noUidProvided"));
    }

    const userinfo = await api.getUserInfo([uid]);
    const user = userinfo[uid];
    const name = user.name;

    usersData.set(uid, {
      money: money,
      data: usersData.data
    });

    message.reply(getLang("success", name, uid));
  }
};
