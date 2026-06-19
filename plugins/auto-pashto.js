// 🌐 NAWAZ MD AUTO PASHTO GLOBAL SYSTEM

global.botLang = "ps"; // 🔥 FORCE PASHTO ALWAYS

const langPack = {
  ps: {
    notAllowed: "❌ تاسو ته اجازه نشته",
    processing: "⏳ انتظار وکړئ...",
    done: "✔️ بشپړ شو",
    error: "❌ خطا رامنځته شوه",
    wait: "⏳ صبر وکړئ..."
  }
};

// 🔥 GLOBAL OVERRIDE FUNCTION
global.tlang = (key) => {
  return langPack.ps[key] || key;
};

// ⚡ AUTO PATCH MESSAGES (IMPORTANT PART)
const originalReply = global.reply;

global.reply = function (text) {
  try {
    // If text is string → force pashto replacement if matches
    if (typeof text === "string") {
      text = text
        .replace(/not allowed/gi, "❌ تاسو ته اجازه نشته")
        .replace(/processing/gi, "⏳ انتظار وکړئ...")
        .replace(/done/gi, "✔️ بشپړ شو")
        .replace(/error/gi, "❌ خطا رامنځته شوه");
    }

    return originalReply.call(this, text);
  } catch (e) {
    return originalReply.call(this, text);
  }
};

// 🔥 OPTIONAL: FORCE OUTGOING MESSAGES (if bot uses sendMessage)
const oldSend = global.sendMessage;

if (oldSend) {
  global.sendMessage = async function (jid, content, options) {
    try {
      if (typeof content === "string") {
        content = content
          .replace(/not allowed/gi, "❌ تاسو ته اجازه نشته")
          .replace(/processing/gi, "⏳ انتظار وکړئ...")
          .replace(/done/gi, "✔️ بشپړ شو");
      }

      return oldSend.call(this, jid, content, options);
    } catch (e) {
      return oldSend.call(this, jid, content, options);
    }
  };
}
