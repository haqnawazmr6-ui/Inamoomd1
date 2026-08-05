const { cmd } = require('../command');

cmd({
pattern: "owner",
desc: "Get owner number",
category: "main",
react: "💀",
filename: __filename
}, async (sock, m, msg, { from }) => {
try {

const OWNER_NUMBER = "923363272354";
const OWNER_NAME = "𝆺𝅥𝆬𓍢ִ໋͙⋆𝚭𝚵𝚴𝚿𝐓𝚮 𝚫𝚰💸˚₊· ͟͟͞͞➳";
const TEAM_NAME = "𝙕𝘼𝙄𝘿𝙄 𝙏𝙀𝙓𝙆";

await sock.sendPresenceUpdate("composing", from);

const vcard =
  'BEGIN:VCARD\n' +
  'VERSION:3.0\n' +
  `FN:${OWNER_NAME}\n` +
  `ORG:${TEAM_NAME};\n` +
  `TEL;type=CELL;type=VOICE;waid=${OWNER_NUMBER}:+${OWNER_NUMBER}\n` +
  'END:VCARD';

// 📌 CONTACT (same style + only newsletter added)
await sock.sendMessage(from, {
  contacts: {
    displayName: OWNER_NAME,
    contacts: [{ vcard }]
  },
  contextInfo: {
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363409398296443@newsletter",
      newsletterName: "*»𓆩•༎ࠫ𝆺꯭𝅥𝚭𝛆̽ƞ̽ɣ̬ʈⱶ֟ؖ꧊  𝚫͢ī֟፝ ☠️🚩 »*",
      serverMessageId: Date.now()
    }
  }
});

// 📌 REACTION
await sock.sendMessage(from, {
  react: { text: "💓", key: m.key }
});

} catch (e) {
console.error(e);
}
});
