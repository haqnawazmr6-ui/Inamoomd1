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

`━━━━━━━━━━━━━━━━━━
⚡ INAMOO MD ⚡
📢 VIP MENU 📢
━━━━━━━━━━━━━━━━━━

👑 Owner   : ${config.OWNER_NAME}
📦 Commands: ${total}
⚙️ Mode    : ${config.MODE}
🚀 Version : ${config.VERSION}
`;

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

━━━━━━━━━━━━━━━━━━
📂 ${cat.toUpperCase()} MENU
━━━━━━━━━━━━━━━━━━
`;

        for (const command of grouped[cat]) {
            text += `• .${command.pattern}\n`;
        }
    }

    text += `

━━━━━━━━━━━━━━━━━━
POWERED BY INAMOO MD
━━━━━━━━━━━━━━━━━━`;

    await conn.sendMessage(from, {
        image: { url: config.BOT_IMAGE },
        caption: text,
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363429447258290@newsletter",
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
