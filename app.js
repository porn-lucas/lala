const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const http = require("http");

http.createServer((req, res) => {
  res.write("Bot Status: Active");
  res.end();
}).listen(process.env.PORT || 3000);

const accounts = [
  {
    name: "AKUN +6287856442412",
    apiId: 36961621,
    apiHash: "424cdf2bb3fba897620de01094d53ef9",
    session: new StringSession("1BQANOTEuMTA4LjU2LjIwMAG7oXs6rFRcNj45wwZBvs/rrCT2JiOk/NfUTcQ3NC4nkuRZEZxZmwWZd296MG0JVuuf/q6gjxWjMvwc6dFLx79hkIHrK6zBbZsX0aAH/PQYTPggiGlkXMJVEOr+/GX9C7oXO1vgyffEKXqAb0Ob8kmt51Vdc+LILOaPTPQdGioZlqnG8dCAthKTaUfTizX+3/BxzV5a2IirsBrhdCvxFV3yrT2LOdRGs6EJ6KlO65e5tQsSC6fbm7f+9ifieKD8Bca5CB2m+Kn9ksqe1neUA2C4o1H0Ra6fzH4IIyZ1cQGgTBCBiHdH0uVKiUghFxC1KLiXJVvQ/4Hoq+gqXZbaY9D/sg=="),
    groupUsernames: ["@BIO_RPP_30", "@lpmsemeukerpp", "@LPM_SEME_UKE_RPW"],
  },
  {
    name: "AKUN +6283175551960",
    apiId: 25494748,
    apiHash: "0561b7417fd82f85b5fb9811244a27ba",
    session: new StringSession("1BQANOTEuMTA4LjU2LjIwMAG7hz+pdnZo1xIS9The2PjFG6OlH6z/t25TwZN/7OPLfR0CgnK4CoLIw2s4xWM5EbBbTL/+t2IJgN8AI240l0Ecy6+xSAJuyyVpt16XpU9YaZb99/MHeSuffxcSXNFeAGOcU1sCyA0LAVcONrswPhQP5nJQ3b1jWv+4xVcXMMZL52F5UQMNK/1iRM/7ubJRItEUbjAICMLoUe8FtSE51Sn5LeDgZ7Hz5sxrZR361lcQKuNYYTXYBYUW8dWTGDi1RjsSqjroViULTgae7Ql8AMackZRpFqc2b1w78NanZ/142zD0Asci0ZIfh+fnGvsxi8+cOo6a84MGDQKWQnOoYLTb0A=="),
    groupUsernames: ["@BIO_RPP_30", "@lpmsemeukerpp", "@LPM_SEME_UKE_RPW"], // <-- diperbaiki: tambah [ di awal
  },
  {
    name: "AKUN 3 (GANTI NAMA)",
    apiId: 33262151,
    apiHash: "8874860f8cae4c88d20fa6898918937b",
    session: new StringSession("1BQANOTEuMTA4LjU2LjE4MwG7wwKZTDXuT9P4I2G957q5Y5Sak0aS09DlpZ2GsRnAHhKSDnkytA73CENYEQqt0E2FMKIHj1PvA0+M8PM8uz8KpIB1n4qewpDxdZBP5EFP3tX88g2Zgin2T7LSBY3IgKts+PuZHm8zeJ9nm62GpiSC808hWKEUATqd7/cCcEvdomYG4h66tlm/gi9C2HO5c3iEvmAwxf5lenGjYs8mo5dOIFLzbu0DP17G1A8RBw5VoEK56BaDVyvI2Ac1FRS2HU9USlvrYMQGWvSpZ+91asxkVHe3f9JO8UT1QXfVaMsUHKjchSXXqBK06BF02YPA2cD9QrFgwILQgG4gFNtSZAz8EA=="),
    groupUsernames: ["@BIO_RPP_30", "@lpmsemeukerpp", "@LPM_SEME_UKE_RPW"],
  }
];

const messageToSend = `
ch video g4y bxb https://t.me/+GDXb7qYaLytkNDA1

ch video g4y bxb https://t.me/+GDXb7qYaLytkNDA1

ch video g4y bxb https://t.me/+GDXb7qYaLytkNDA1

ch video g4y bxb https://t.me/+GDXb7qYaLytkNDA1

ch video g4y bxb https://t.me/+GDXb7qYaLytkNDA1

ch video g4y bxb https://t.me/+GDXb7qYaLytkNDA1
#seme #uke #area #mlm 
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

function getMsUntilNextTarget(targetMinutes) {
  const now = new Date();
  const currentMin = now.getMinutes();
  const sortedTargets = [...targetMinutes].sort((a, b) => a - b);
  let nextMin = sortedTargets.find((m) => m > currentMin);
  let addHour = 0;
  if (nextMin === undefined) {
    nextMin = sortedTargets[0];
    addHour = 1;
  }
  const nextTime = new Date();
  nextTime.setHours(now.getHours() + addHour);
  nextTime.setMinutes(nextMin);
  nextTime.setSeconds(2);
  nextTime.setMilliseconds(0);
  return nextTime.getTime() - now.getTime();
}

async function runAccountLoop(account, targetMinutes) {
  while (true) {
    const waitMs = getMsUntilNextTarget(targetMinutes);
    const nextRun = new Date(Date.now() + waitMs).toLocaleTimeString();
    console.log(`[JADWAL] ${account.name} dijadwalkan berjalan pada ${nextRun}`);
    await delay(waitMs);
    console.log(`\n[TERPICU] Waktu: ${new Date().toLocaleTimeString()} | Giliran: ${account.name}`);
    await sendMessage(account);
  }
}

const schedules = [
  [0, 20, 40],
  [5, 25, 45],
  [10, 30, 50]
];

function startApp() {
  console.log("--- BOT AUTO SEND RUNNING ---");
  console.log("--- JADWAL: Menit Spesifik Setiap Jam ---");
  accounts.forEach((account, index) => {
    const schedule = schedules[index % schedules.length];
    runAccountLoop(account, schedule).catch(e =>
      console.log(`[FATAL ERROR] ${account.name}:`, e)
    );
  });
}

startApp();
