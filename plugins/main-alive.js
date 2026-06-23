const { cmd } = require('../command');

cmd({
    pattern: "alive",
    alias: ["status", "runtime"],
    desc: "Alive message with video",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from }) => {

    try {

        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const mnt = Math.floor((uptime % 3600) / 60);
        const sec = Math.floor(uptime % 60);

        let text = `
[ SYSTEM STATUS // LIVE ]

> ping: 0ms
> status: ONLINE
> uptime: ${h}h ${mnt}m ${sec}s

------------------------

[ BOT INFO ]

> owner : INAMOO TECH
> prefix: .
> mode  : public

------------------------

>> ACCESS GRANTED ✔
`;

        const imageLink = "https://files.catbox.moe/80hmoh.jpg";

        // ✅ SINGLE MESSAGE (IMAGE + TEXT TOGETHER)
        await conn.sendMessage(from, {
            image: { url: imageLink },
            caption: text,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363408907671996@newsletter",
                    newsletterName: "inamoo TECH MD",
                    serverMessageId: Date.now().toString()
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: "❌ Error in alive command" });
    }

});
