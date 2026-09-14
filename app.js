const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const http = require("http");

// 1. Server HTTP sederhana dengan error listener agar tidak crash jika port terpakai di Render
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Bot Status: Active");
  res.end();
});

server.listen(PORT, () => {
  console.log(`[SERVER] Web server aktif di port ${PORT} (Siap untuk Render)`);
});

server.on("error", (err) => {
  console.log(`[SERVER WARNING] ${err.message}`);
});

// 2. Konfigurasi Akun
const accounts = [
  {
    name: "AKUN +6287856442412",
    apiId: 36961621,
    apiHash: "424cdf2bb3fba897620de01094d53ef9",
    session: new StringSession("1BQANOTEuMTA4LjU2LjIwMAG7oXs6rFRcNj45wwZBvs/rrCT2JiOk/NfUTcQ3NC4nkuRZEZxZmwWZd296MG0JVuuf/q6gjxWjMvwc6dFLx79hkIHrK6zBbZsX0aAH/PQYTPggiGlkXMJVEOr+/GX9C7oXO1vgyffEKXqAb0Ob8kmt51Vdc+LILOaPTPQdGioZlqnG8dCAthKTaUfTizX+3/BxzV5a2IirsBrhdCvxFV3yrT2LOdRGs6EJ6KlO65e5tQsSC6fbm7f+9ifieKD8Bca5CB2m+Kn9ksqe1neUA2C4o1H0Ra6fzH4IIyZ1cQGgTBCBiHdH0uVKiUghFxC1KLiXJVvQ/4Hoq+gqXZbaY9D/sg=="),
    groupUsernames: ["@BIO_RPP_30", "@lpmsemeukerpp", "@LPM_SEME_UKE_RPW"],
  },
  {
    name: "AKUN 3 (GANTI NAMA)",
    apiId: 32752229,
    apiHash: "c683eea0fcac6726c10e2d77285272d6",
    session: new StringSession("1BQANOTEuMTA4LjU2LjE0MwG7Z4o6Iu7yoqdTV+8YB9EJ5leweLV6XccLGaC8GFs2S5SUS/xKuRBeXLgLAdOqCCXorze4d4D2kdHiFAOdWg0nNGdlyKW33HH4MMQaFM3IytSQLNyE+KjEWdj2qY7eTMeB53UL2K9jyrSzqmsrfrIfcxXpjug1Ld2w/ITy1gVzcORVNacNphRKKAkyorqLVN1bAOy+VciZhizktHrzb6U+0CCvwy2MoxyMVvsT/OvYrmcYeXr1UW4X1O/dwHsp69YBkMb5fiI0UEqRBwe/DEhFGBXkGBKNQlpcvwq0yno8zhJl150qvzz4qnrxxkjwyKo2KqoYsA62K8pKDHQbMsPPkA=="),
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
        const entity = await client.getEntity(group);
        await client.sendMessage(entity, { message: messageToSend });

        console.log(`[SUCCESS] ${account.name} -> ${group}`);
        await delay(3000 + Math.random() * 2000); // Jeda aman antar grup
      } catch (err) {
        console.log(`[ERROR] ${account.name} gagal ke ${group}: ${err.message}`);
        if (err.message.includes("FLOOD_WAIT")) {
          console.log(`[LIMIT] ${account.name} terkena FLOOD_WAIT, melewatai grup tersisa.`);
          break;
        }
      }
    }
  } catch (err) {
    console.log(`[FAILED KONEKSI] ${account.name}: ${err.message}`);
  } finally {
    await client.disconnect();
  }
}

// 3. Logika Penjadwalan Bergantian (0, 5, 10, 15, dst)
function getNextRunTimeMs(accountIndex) {
  const now = new Date();
  const currentMin = now.getMinutes();

  // Akun 1 berjalan di menit: 0, 10, 20, 30, 40, 50
  // Akun 2 berjalan di menit: 5, 15, 25, 35, 45, 55
  const baseSchedules = [
    [0, 10, 20, 30, 40, 50],
    [5, 15, 25, 35, 45, 55]
  ];

  const targetMinutes = baseSchedules[accountIndex % baseSchedules.length];

  // Cari menit yang lebih besar dari menit saat ini
  let targetMin = targetMinutes.find((m) => m > currentMin);
  let targetHour = now.getHours();
  let addDay = 0;

  // Jika tidak ada menit tersisa di jam ini, lompat ke jam berikutnya
  if (targetMin === undefined) {
    targetHour += 1;
    targetMin = targetMinutes[0]; // Ambil menit pertama dari jadwal akun ini

    // Jika melewati tengah malam
    if (targetHour >= 24) {
      targetHour = 0;
      addDay = 1;
    }
  }

  const nextTime = new Date();
  if (addDay > 0) {
    nextTime.setDate(nextTime.getDate() + 1);
  }
  
  // Set target waktu (Detik 2 agar tidak terjadi double-trigger saat pergantian detik)
  nextTime.setHours(targetHour, targetMin, 2, 0);

  const diffMs = nextTime.getTime() - now.getTime();
  return diffMs > 0 ? diffMs : 1000;
}

async function runAccountLoop(account, accountIndex) {
  while (true) {
    const waitMs = getNextRunTimeMs(accountIndex);
    const nextRun = new Date(Date.now() + waitMs).toLocaleTimeString();
    const waitMinutes = Math.round(waitMs / 1000 / 60);

    console.log(`[JADWAL] ${account.name} akan berjalan jam ${nextRun} (tunggu ~${waitMinutes} menit)`);
    
    // Menunggu waktu eksekusi selanjutnya
    await delay(waitMs);

    console.log(`\n[TERPICU] Waktu: ${new Date().toLocaleTimeString()} | Giliran: ${account.name}`);
    await sendMessage(account);
  }
}

function startApp() {
  console.log("--- BOT AUTO SEND RUNNING ---");
  console.log("--- JADWAL: Bergantian Setiap 5 Menit (Akun 1 = 0, 10... | Akun 2 = 5, 15...) ---");

  accounts.forEach((account, index) => {
    runAccountLoop(account, index).catch((e) =>
      console.log(`[FATAL ERROR] ${account.name}:`, e)
    );
  });
}

startApp();
