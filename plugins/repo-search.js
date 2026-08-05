const { cmd } = require('../command');

cmd({
    pattern: "repo",
    desc: "Show server link",
    category: "main",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from }) => {

    const serverLink = "https://nawazmd.vercel.app/";

    const message = `
✦✦✦✦✦✦✦✦✦✦
   📦 𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳REPO
✦✦✦✦✦✦✦✦✦✦

🌐 SERVER LINK:
🔗 ${serverLink}

⚡ 𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳ System
`.trim();

    await conn.sendMessage(from, {
        text: message,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363409398296443@newsletter",
                newsletterName: "𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳",
                serverMessageId: 1
            }
        }
    }, { quoted: mek });

});
