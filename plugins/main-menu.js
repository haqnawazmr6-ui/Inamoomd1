const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    alias: ["vipmenu", "help", "commands"],
    desc: "Dynamic Premium Menu",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {

        const total = commands.length;

        let text = `
┏━━━━━━━━━━━━━━━┓
┃      🤖 𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳
┣━━━━━━━━━━━━━━━┫
┃ 👑 Owner   : ${config.OWNER_NAME}
┃ 📦 Commands: ${total}
┃ ⚙️ Mode    : ${config.MODE}
┃ 🚀 Version : ${config.VERSION}
┗━━━━━━━━━━━━━━┛`;

        // Dynamic Categories
        const grouped = {};

        for (const c of commands) {
            if (!c.pattern) continue;

            const cat = c.category || "other";

            if (!grouped[cat]) {
                grouped[cat] = [];
            }

            grouped[cat].push(c);
                    }
        // Build Dynamic Menu
        for (const cat in grouped) {

            text += `

┌─〔 ${cat.toUpperCase()} 〕`;

            for (const command of grouped[cat]) {
                if (!command.pattern) continue;

                text += `
│ ❖ .${command.pattern}`;
            }

            text += `
└──────────────`;
        }

        text += `

╭─────────────────╮
│POWERED BY 𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳
╰─────────────────╯`;
                        await conn.sendMessage(from, {
            image: { url: config.BOT_IMAGE },
            caption: text,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363409398296443@newsletter",
                    newsletterName: "𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳",
                    serverMessageId: Date.now()
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log("Menu Error:", e);
        reply("❌ Error loading menu.");
    }
});
