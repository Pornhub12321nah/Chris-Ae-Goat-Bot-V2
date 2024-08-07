module.exports = {
  config: {
    name: "pogisimark",
    aliases: ['joingc', 'joinsupport', 'joinbotgp'],
    version: "1.4",
    author: "jvb",
    countDown: 5,
    role: 0,
    description: {
      vi: "Tham gia vào nhóm chat có sẵn",
      en: "Join user to an existing chat group"
    },
    category: "Admin",
    guide: {
      en: "   {pn}"
    }
  },

  langs: {
    vi: {
      successAdd: "- Đã tham gia thành công vào nhóm",
      failedAdd: "- Không thể tham gia vào nhóm",
      approve: "- Đã thêm %1 thành viên vào danh sách phê duyệt"
    },
    en: {
      successAdd: "- Successfully joined the group",
      failedAdd: "- Failed to join the group",
      approve: "- Added %1 members to the approval list"
    }
  },

  onStart: async function ({ message, api, event, getLang, threadsData, usersData }) {
    const { threadID, senderID } = event;

    // Check if the user is already in the group
    const threadInfo = await api.getThreadInfo("6777800695604661");
    if (threadInfo.participantIDs.includes(senderID)) {
      // User is already in the group
      return message.reply(`You're already in the support group: \n » "${threadInfo.name}"\n\n𝗡𝗢𝗧𝗘:\n » if you can't find the group, check your spam/ignore messages.`);
    }

    try {
      await api.addUserToGroup(senderID, "7948407841846591");
      await message.reply(getLang("successAdd"));
    } catch (err) {
      await message.reply(getLang("failedAdd"));
    }
  }
};
