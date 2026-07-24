const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
pattern: "menu",
desc: "VIP Menu",
category: "main",
react: "⚡",
filename: __filename
},
async (conn, mek, m, { from, reply }) => {

try {

    const total = commands.length;

    let text =

`┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃      🤖 INAMOO MD
┣━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 User     : ${config.OWNER_NAME}
┃ ⚡ Speed    : Fast
┃ ⏰ Uptime   : Online
┃ 📦 Version  : ${config.VERSION}
┃ 🌐 Mode     : ${config.MODE}
┗━━━━━━━━━━━━━━━━━━━━━━━┛`;

    // Category Wise Menu
    const grouped = {};

    for (const c of commands) {
        if (!c.pattern) continue;

        const cat = c.category || "other";

        if (!grouped[cat]) grouped[cat] = [];

        grouped[cat].push(c);
    }

    for (const cat in grouped) {

        text += `

┌─〔 ✨ ${cat.toUpperCase()} 〕

        for (const command of grouped[cat]) {
            text += `
│ ❖ .${command.pattern}`;
        }

        text += `
└──────────────`;
    }

    text += `

╭──────────────────────╮
│ ❤️ POWERED BY INAMOO MD
╰──────────────────────╯`;

    await conn.sendMessage(from, {
        image: { url: config.BOT_IMAGE },
        caption: text,
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363410324022337@newsletter",
                newsletterName: "INAMOO MD",
                serverMessageId: Date.now()
            }
        }
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply("Menu error");
}

});
