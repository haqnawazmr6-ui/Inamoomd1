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

> owner : 𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳
> prefix: .
> mode  : public

------------------------

>> ACCESS GRANTED ✔
`;

        const imageLink = "https://up6.cc/2026/08/17859431626931.png";

        // ✅ SINGLE MESSAGE (IMAGE + TEXT TOGETHER)
        await conn.sendMessage(from, {
            image: { url: imageLink },
            caption: text,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363409398296443@newsletter",
                    newsletterName: "𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳",
                    serverMessageId: Date.now().toString()
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: "❌ Error in alive command" });
    }

});
