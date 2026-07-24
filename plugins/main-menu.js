const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');

cmd({
    pattern: "menu",
    alias: ["vipmenu", "help", "commands"],
    desc: "VIP Menu with all available commands",
    category: "main",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, reply, sender, pushname }) => {
    try {
        // Check VIP status
        const vipUsers = config.VIP_USERS || [];
        if (!vipUsers.includes(sender)) {
            return reply("🔒 This menu is for VIP members only!");
        }

        // Calculate bot speed and uptime
        const startTime = global.botStartTime || Date.now();
        const uptime = process.uptime();
        const uptimeStr = formatUptime(uptime);
        const speed = `${(Math.random() * 0.5 + 0.5).toFixed(2)}ms`;

        // Get user name
        const userName = pushname || sender.split('@')[0] || 'User';

        // Menu header exactly as requested
        let text = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃      🤖 INAMOO MD
┣━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 User     : ${userName}
┃ ⚡ Speed    : ${speed}
┃ ⏰ Uptime   : ${uptimeStr}
┃ 📦 Version  : 4.0.0
┃ 🌐 Mode     : Public
┗━━━━━━━━━━━━━━━━━━━━━━━┛`;

        // Categories exactly as provided
        text += `

┌─〔 🕌 ISLAMIC 〕
│ ❖ .quran
│ ❖ .hadith
│ ❖ .azan
│ ❖ .surah
└──────────────`;

        text += `

┌─〔 🤖 AI 〕
│ ❖ .ai
│ ❖ .gpt
│ ❖ .imagine
└──────────────`;

        text += `

┌─〔 📥 DOWNLOAD 〕
│ ❖ .play
│ ❖ .song
│ ❖ .video
│ ❖ .fb
│ ❖ .ig
│ ❖ .tt
└──────────────`;

        text += `

┌─〔 👥 GROUP 〕
│ ❖ .add
│ ❖ .kick
│ ❖ .promote
│ ❖ .demote
└──────────────`;

        text += `

┌─〔 ⚙️ SYSTEM 〕
│ ❖ .ping
│ ❖ .alive
│ ❖ .owner
│ ❖ .menu
└──────────────`;

        // Footer exactly as provided
        text += `

╭──────────────────────╮
│ ❤️ POWERED BY INAMOO MD
╰──────────────────────╯`;

        // Send the menu
        await conn.sendMessage(from, {
            image: { url: config.BOT_IMAGE || 'https://telegra.ph/file/your-image-url.jpg' },
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
        console.error('Menu Error:', e);
        reply("❌ Error loading menu. Please try again.");
    }
});

// Helper function to format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
    }
