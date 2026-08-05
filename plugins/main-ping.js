const config = require('../config');
const { cmd, commands } = require('../command');

// 🎨 RANDOM FONT STYLE (ONLY TEXT LOOK CHANGE)
const styleText = (text = '') => {
    const fonts = [
        {
            a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',
            j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',
            s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'
        },
        {
            a:'𝙖',b:'𝙗',c:'𝙘',d:'𝙙',e:'𝙚',f:'𝙛',g:'𝙜',h:'𝙝',i:'𝙞',
            j:'𝙟',k:'𝙠',l:'𝙡',m:'𝙢',n:'𝙣',o:'𝙤',p:'𝙥',q:'𝙦',r:'𝙧',
            s:'𝙨',t:'𝙩',u:'𝙪',v:'𝙫',w:'𝙬',x:'𝙭',y:'𝙮',z:'𝙯'
        },
        {
            a:'𝒶',b:'𝒷',c:'𝒸',d:'𝒹',e:'ℯ',f:'𝒻',g:'ℊ',h:'𝒽',i:'𝒾',
            j:'𝒿',k:'𝓀',l:'𝓁',m:'𝓂',n:'𝓃',o:'ℴ',p:'𝓅',q:'𝓆',r:'𝓇',
            s:'𝓈',t:'𝓉',u:'𝓊',v:'𝓋',w:'𝓌',x:'𝓍',y:'𝓎',z:'𝓏'
        }
    ];

    const font = fonts[Math.floor(Math.random() * fonts.length)];

    return text.toLowerCase().split('').map(c => font[c] || c).join('');
};


// ===================== PING =====================
cmd({
    pattern: "ping",
    alias: ["speed","pong"],
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},

async (conn, mek, m, { from, sender, reply }) => {

    try {
        const start = Date.now();

        const reactionEmojis = ['🔥','⚡','🚀','💨','🎯','🎉','🌟','💥','🕐','🔹'];
        const textEmojis = ['💎','🏆','⚡️','🚀','🎶','🌠','🌀','🔱','🛡️','✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const responseTime = Date.now() - start;

        const text = `> *${styleText("inamoo MD MINI BOT SPEED")}: ${responseTime}ms ${reactionEmoji}*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363409398296443@newsletter',
                    newsletterName: "𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝐌𝐃💸˚₊· ͟͟͞͞➳",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        reply(`Error: ${e.message}`);
    }
});


// ===================== PING 2 =====================
cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},

async (conn, mek, m, { from, reply }) => {

    try {
        const startTime = Date.now();

        await new Promise(r => setTimeout(r, 400));

        const ping = Date.now() - startTime;

        let status;
        if (ping < 1000) status = "⚡ Fast & Responsive";
        else if (ping < 1400) status = "⚙️ Normal Speed";
        else status = "🐢 Slow Response";

        const msg = `
╭┈──〔 ⚡ ${styleText("*»𓆩•༎ࠫ𝆺꯭𝅥𝚭𝛆̽ƞ̽ɣ̬ʈⱶ֟ؖ꧊  ϻ֟͡𝛛֟ ☠️🚩 »* BOT PING")} 〕─⊷
├▢ 📶 ${styleText("Response")}: ${ping} ms
├▢ 🧠 ${styleText("Status")}: ${status}
├▢ 💫 ${styleText("Mode")}: Active & Stable
╰───────────────⊷
        `;

        await conn.sendMessage(from, { text: msg.trim() }, { quoted: mek });

    } catch (e) {
        reply(`Error: ${e.message}`);
    }
});
