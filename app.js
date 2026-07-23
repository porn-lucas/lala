const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const http = require("http");

// Server sederhana agar bot tetap hidup (misal jika dihosting di Replit/Heroku)
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
        await delay(3000 + Math.random() * 2000); // Jeda aman antar grup
      } catch (err) {
        console.log(`[ERROR] ${account.name} gagal ke ${group}: ${err.message}`);
        if (err.message.includes("FLOOD_WAIT")) break; // Hentikan jika kena flood limit
      }
    }
  } catch (err) {
    console.log(`[FAILED] ${account.name}: ${err.message}`);
  } finally {
    await client.disconnect();
  }
}

function getNextRunTimeMs(accountIndex) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  // Pola dasar: Akun 1 mulai (0, 20, 40), Akun 2 mulai (10, 30, 50)
  const baseSchedules = [
    [0, 20, 40],
    [10, 30, 50]
  ];
  
  const base = baseSchedules[accountIndex % baseSchedules.length];

  // Fungsi untuk mendapatkan "shift" (pergeseran menit) berdasarkan jam
  // Jam 1 -> shift 0, Jam 2 -> shift 1, dst (berulang maksimal per 10 menit agar aman dalam 1 jam)
  const getShift = (hour) => {
    let shift = (hour - 1) % 10;
    if (shift < 0) shift += 10; // Menangani pergantian hari (jam 0)
    return shift;
  };

  const currentShift = getShift(currentHour);
  // Tambahkan pergeseran pada menit dasar
  const currentTargets = base.map(m => m + currentShift);

  // Cari apakah di jam SAAT INI masih ada jadwal yang belum terlewat
  let targetMin = currentTargets.find(m => m > currentMin);
  let targetHour = currentHour;
  let addDay = 0;

  // Jika semua jadwal di jam saat ini sudah terlewat, maju ke jam berikutnya
  if (targetMin === undefined) {
    targetHour = currentHour + 1;
    const nextShift = getShift(targetHour % 24);
    const nextTargets = base.map(m => m + nextShift);
    targetMin = nextTargets[0]; // Ambil jadwal pertama di jam berikutnya
    
    if (targetHour >= 24) {
      targetHour = targetHour % 24;
      addDay = 1; // Lompat ke hari berikutnya
    }
  }

  // Hitung selisih waktu (milidetik) dari sekarang ke target jadwal
  const nextTime = new Date();
  if (addDay > 0) {
    nextTime.setDate(nextTime.getDate() + addDay);
  }
  nextTime.setHours(targetHour);
  nextTime.setMinutes(targetMin);
  nextTime.setSeconds(2); // Tambah jeda 2 detik agar trigger berjalan pasti di menit tersebut
  nextTime.setMilliseconds(0);

  return nextTime.getTime() - now.getTime();
}

async function runAccountLoop(account, accountIndex) {
  while (true) {
    // Hitung berapa ms harus menunggu ke jadwal bergeser berikutnya
    const waitMs = getNextRunTimeMs(accountIndex);
    const nextRun = new Date(Date.now() + waitMs).toLocaleTimeString();
    
    console.log(`[JADWAL] ${account.name} dijadwalkan berjalan pada ${nextRun}`);
    await delay(waitMs); // Tunggu sampai waktu target
    
    console.log(`\n[TERPICU] Waktu: ${new Date().toLocaleTimeString()} | Giliran: ${account.name}`);
    await sendMessage(account);
  }
}

function startApp() {
  console.log("--- BOT AUTO SEND RUNNING ---");
  console.log("--- JADWAL: Dinamis (Bergeser +1 Menit Setiap Pergantian Jam) ---");
  
  accounts.forEach((account, index) => {
    // Mulai pengulangan jadwal berdasarkan index akun (0 untuk akun 1, 1 untuk akun 2)
    runAccountLoop(account, index).catch(e =>
      console.log(`[FATAL ERROR] ${account.name}:`, e)
    );
  });
}

startApp();
