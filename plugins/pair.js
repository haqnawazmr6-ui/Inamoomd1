const { cmd } = require('../command');
const axios = require('axios');

const API_BASE_URL = 'https://inamoomd.vercel.app/api';

// helper: safe request
const fetchData = async (url, options = {}) => {
    try {
        const res = await axios.get(url, { timeout: 15000, ...options });
        return res.data;
    } catch (err) {
        return null;
    }
};

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "🔐",
    desc: "Get pairing code for INAMOO-MD bot",
    category: "owner",
    use: ".pair 923XXXXXXXXX",
    filename: __filename
}, async (conn, mek, m, { senderNumber, reply, react, q }) => {

    try {
        await react('⏳');

        const phoneNumber = String(q || senderNumber || "")
            .replace(/[^0-9]/g, '');

        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            await react('❌');
            return reply("❌ Invalid number!\nExample: .pair 923001234567");
        }

        const data = await fetchData(`${API_BASE_URL}/servers`);

        const servers = data?.servers;

        if (!Array.isArray(servers) || !servers.length) {
            await react('❌');
            return reply("❌ No servers available right now.");
        }

        const randomServer = servers[Math.floor(Math.random() * servers.length)];

        if (!randomServer?.url) {
            await react('❌');
            return reply("❌ Server error.");
        }

        const codeData = await fetchData(
            `${randomServer.url}/code?number=${phoneNumber}`
        );

        const pairingCode = codeData?.code;

        if (!pairingCode) {
            await react('❌');
            return reply("❌ Failed to generate pairing code.");
        }

        await react('✅');

        // 1st message (style only)
        const caption =
`████████████████████
█   INAMOO MD BOT  █
████████████████████
📱 ${phoneNumber}
🔐 PAIRING READY
████████████████████`;

        await conn.sendMessage(m.chat, {
            text: caption
        }, { quoted: mek });

        // 2nd message (ONLY code)
        await conn.sendMessage(m.chat, {
            text: pairingCode
        }, { quoted: mek });

    } catch (error) {
        console.error("Pair command error:", error);
        await react('❌');
        return reply("❌ Server error! Please try again later.");
    }
});
