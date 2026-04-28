const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const http = require("http");

// SERVER HTTP (Wajib ada supaya hosting cloud tidak mematikan bot)
http.createServer((req, res) => {
  res.write("Bot Status: Active");
  res.end();
}).listen(process.env.PORT || 3000);

// ---------- KONFIGURASI AKUN ----------
const accounts = [
  {
    name: "AKUN +6285771582422",
    apiId: 36961621,
    apiHash: "424cdf2bb3fba897620de01094d53ef9",
    session: new StringSession("1BQANOTEuMTA4LjU2LjIwMAG7oXs6rFRcNj45wwZBvs/rrCT2JiOk/NfUTcQ3NC4nkuRZEZxZmwWZd296MG0JVuuf/q6gjxWjMvwc6dFLx79hkIHrK6zBbZsX0aAH/PQYTPggiGlkXMJVEOr+/GX9C7oXO1vgyffEKXqAb0Ob8kmt51Vdc+LILOaPTPQdGioZlqnG8dCAthKTaUfTizX+3/BxzV5a2IirsBrhdCvxFV3yrT2LOdRGs6EJ6KlO65e5tQsSC6fbm7f+9ifieKD8Bca5CB2m+Kn9ksqe1neUA2C4o1H0Ra6fzH4IIyZ1cQGgTBCBiHdH0uVKiUghFxC1KLiXJVvQ/4Hoq+gqXZbaY9D/sg=="),
    groupUsernames: ["@lpm_seme_uke", "@LPM_DDK_BBG_MMK", "@lpm_ukeseme_pejuh"],
    targetMinutes: [0, 10, 20, 30, 40, 50],
  },
  {
    name: "AKUN +6283175551960",
    apiId: 25494748,
    apiHash: "0561b7417fd82f85b5fb9811244a27ba",
    session: new StringSession("1BQANOTEuMTA4LjU2LjIwMAG7hz+pdnZo1xIS9The2PjFG6OlH6z/t25TwZN/7OPLfR0CgnK4CoLIw2s4xWM5EbBbTL/+t2IJgN8AI240l0Ecy6+xSAJuyyVpt16XpU9YaZb99/MHeSuffxcSXNFeAGOcU1sCyA0LAVcONrswPhQP5nJQ3b1jWv+4xVcXMMZL52F5UQMNK/1iRM/7ubJRItEUbjAICMLoUe8FtSE51Sn5LeDgZ7Hz5sxrZR361lcQKuNYYTXYBYUW8dWTGDi1RjsSqjroViULTgae7Ql8AMackZRpFqc2b1w78NanZ/142zD0Asci0ZIfh+fnGvsxi8+cOo6a84MGDQKWQnOoYLTb0A=="),
    groupUsernames: ["@lpm_seme_uke", "@LPM_DDK_BBG_MMK", "@BIO_RPP_30"],
    targetMinutes: [4, 14, 24, 34, 44, 54],
  },
  {
    name: "AKUN +62887437418956",
    apiId: 23002288,
    apiHash: "6cae1ac1f2da88f26929f05836aaf069",
    session: new StringSession("1BQANOTEuMTA4LjU2LjE5OQG7IRBDMkRO8ZyN92hz8yGmqfGM4kxTT17HzS5BztaGU+k+UBRtUMybRseEL4fsEamtRUnpyZHtwKMji9q95jdaICovdNIKd9cSdNPqMGv5lUwEIISj57Jlmz05/ZbtMNcEn3/C3QP+aJNedAO1G02n7Mmh/0TMFYdve+fDbUB+J9SmsiaHSEp15BARxdk62IMyZi1DLJUHu3LIqyqghc9vl25LySxecpGTotpe8YPe0+wTJasCrmwg4FQpFi+YYAXJM3UNXwljmd8LDDYWUMoQlfy7c0xzNEJATgSpX9i9f60PPTkxcQ/AwYAorUFipKQjjiRsCmG4dltdR+TjkaNqcg=="),
    groupUsernames: ["@lpm_seme_uke", "@LPM_DDK_BBG_MMK", "@Lpmsemeukerpp"],
    targetMinutes: [7, 17, 27, 37, 47, 57],
  },
];

// ---------- PESAN ----------
const messageToSend = `
ch b0k*p bxb https://t.me/+GDXb7qYaLytkNDA1

ch b0k*p bxb https://t.me/+GDXb7qYaLytkNDA1

ch b0k*p bxb https://t.me/+GDXb7qYaLytkNDA1

ch b0k*p bxb https://t.me/+GDXb7qYaLytkNDA1

ch b0k*p bxb https://t.me/+GDXb7qYaLytkNDA1

ch b0k*p bxb https://t.me/+GDXb7qYaLytkNDA1

#seme #uke #area
`.trim();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendMessage(account) {
  const client = new TelegramClient(
    account.session,
    account.apiId,
    account.apiHash,
    { connectionRetries: 5, autoReconnect: true, timeout: 30000 }
  );

  try {
    console.log(`[${new Date().toLocaleTimeString()}] [CONNECTING] ${account.name}...`);
    await client.connect();
    for (const group of account.groupUsernames) {
      if (!group) continue;
      try {
        await client.sendMessage(group, { message: messageToSend });
        console.log(`[SUCCESS] ${account.name} -> ${group}`);
        await delay(3000 + Math.random() * 2000); 
      } catch (err) {
        console.log(`[ERROR] ${account.name} gagal ke ${group}: ${err.message}`);
        if (err.message.includes("FLOOD_WAIT")) break;
      }
    }
  } catch (err) {
    console.log(`[FAILED] ${account.name}: ${err.message}`);
  } finally {
    await client.disconnect();
  }
}

function startApp() {
  console.log("--- BOT AUTO SEND RUNNING ---");
  let lastProcessedMinute = -1;
  setInterval(async () => {
    const now = new Date();
    const currentMinute = now.getMinutes();
    if (currentMinute !== lastProcessedMinute) {
      lastProcessedMinute = currentMinute;
      for (const account of accounts) {
        if (account.targetMinutes.includes(currentMinute)) {
          sendMessage(account).catch(e => console.log("Internal error:", e));
        }
      }
    }
  }, 10000);
}

startApp();
