const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

// category format
const formatCategory = (category, cmds) => {

    const validCmds = cmds.filter(cmd => cmd.pattern);
    if (!validCmds.length) return '';

    let body = '';
    for (let i = 0; i < validCmds.length; i++) {
        body += `┃ ➤ .${validCmds[i].pattern}\n`;
    }

    return body;
};

cmd({
    pattern: "menu",
    alias: ["allmenu", "Nawaz", "commands"],
    desc: "Show bot menu",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {

    try {

        const BOT_NAME = config.BOT_NAME || "BOT";
        const OWNER_NAME = config.OWNER_NAME || "OWNER";
        const PREFIX = config.PREFIX || ".";
        const VERSION = config.VERSION || "1.0";
        const MODE = config.MODE || "public";

        const totalCommands = commands.length;

        let menuText = `
╔════════════════════╗
   ⚡ ${BOT_NAME} ⚡
╚════════════════════╝

👑 Owner   : ${OWNER_NAME}
📦 Commands: ${totalCommands}
⚙️ Mode    : ${MODE}
🚀 Version : ${VERSION}

┏━━━━━━━━━━━━━━━━┓
┃ 📌 MENU LIST   ┃
┣━━━━━━━━━━━━━━━━┫
`;

        // group commands
        const grouped = {};
        for (let c of commands) {
            if (!c.pattern) continue;
            if (!grouped[c.category]) grouped[c.category] = [];
            grouped[c.category].push(c);
        }

        for (let cat in grouped) {
            menuText += `┃ ◆ ${cat.toUpperCase()}\n`;
            menuText += formatCategory(cat, grouped[cat]);
        }

        menuText += `┗━━━━━━━━━━━━━━━━┛\n\n> POWERED BY ${BOT_NAME}`;

        await conn.sendMessage(from, {
            image: { url: config.BOT_IMAGE },
            caption: menuText,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363429447258290@newsletter",
                    newsletterName: BOT_NAME,
                    serverMessageId: Date.now()
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("Error in menu");
    }

});
