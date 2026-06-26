const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const http = require("http");

// Server sederhana agar bot bisa running terus-menerus di hosting (seperti Replit/Heroku)
http.createServer((req, res) => {
  res.write("Bot Status: Active");
  res.end();
}).listen(process.env.PORT || 3000);

const accounts = [
 {
    name: "AKUN +6287856442412", // AKUN 1
    apiId: 36961621,
    apiHash: "424cdf2bb3fba897620de01094d53ef9",
    session: new StringSession("1BQANOTEuMTA4LjU2LjIwMAG7oXs6rFRcNj45wwZBvs/rrCT2JiOk/NfUTcQ3NC4nkuRZEZxZmwWZd296MG0JVuuf/q6gjxWjMvwc6dFLx79hkIHrK6zBbZsX0aAH/PQYTPggiGlkXMJVEOr+/GX9C7oXO1vgyffEKXqAb0Ob8kmt51Vdc+LILOaPTPQdGioZlqnG8dCAthKTaUfTizX+3/BxzV5a2IirsBrhdCvxFV3yrT2LOdRGs6EJ6KlO65e5tQsSC6fbm7f+9ifieKD8Bca5CB2m+Kn9ksqe1neUA2C4o1H0Ra6fzH4IIyZ1cQGgTBCBiHdH0uVKiUghFxC1KLiXJVvQ/4Hoq+gqXZbaY9D/sg=="),
    groupUsernames: ["@BIO_RPP_30", "@LPM_SEME_UKE_RPW"],
  },
  {
    name: "AKUN +6283175551960", // AKUN 2
    apiId: 25494748,
    apiHash: "0561b7417fd82f85b5fb9811244a27ba",
    session: new StringSession("1BQANOTEuMTA4LjU2LjIwMAG7hz+pdnZo1xIS9The2PjFG6OlH6z/t25TwZN/7OPLfR0CgnK4CoLIw2s4xWM5EbBbTL/+t2IJgN8AI240l0Ecy6+xSAJuyyVpt16XpU9YaZb99/MHeSuffxcSXNFeAGOcU1sCyA0LAVcONrswPhQP5nJQ3b1jWv+4xVcXMMZL52F5UQMNK/1iRM/7ubJRItEUbjAICMLoUe8FtSE51Sn5LeDgZ7Hz5sxrZR361lcQKuNYYTXYBYUW8dWTGDi1RjsSqjroViULTgae7Ql8AMackZRpFqc2b1w78NanZ/142zD0Asci0ZIfh+fnGvsxi8+cOo6a84MGDQKWQnOoYLTb0A=="),
    groupUsernames: ["@BIO_RPP_30", "@lpmsemeukerpp"],
  },
  {
    name: "AKUN 3 (GANTI NAMA)", // AKUN 3 - SILAKAN ISI DATANYA
    apiId: 33262151, // <-- GANTI DENGAN API ID AKUN 3
    apiHash: "8874860f8cae4c88d20fa6898918937b", // <-- GANTI DENGAN API HASH AKUN 3
    session: new StringSession("1BQANOTEuMTA4LjU2LjE4MwG7wwKZTDXuT9P4I2G957q5Y5Sak0aS09DlpZ2GsRnAHhKSDnkytA73CENYEQqt0E2FMKIHj1PvA0+M8PM8uz8KpIB1n4qewpDxdZBP5EFP3tX88g2Zgin2T7LSBY3IgKts+PuZHm8zeJ9nm62GpiSC808hWKEUATqd7/cCcEvdomYG4h66tlm/gi9C2HO5c3iEvmAwxf5lenGjYs8mo5dOIFLzbu0DP17G1A8RBw5VoEK56BaDVyvI2Ac1FRS2HU9USlvrYMQGWvSpZ+91asxkVHe3f9JO8UT1QXfVaMsUHKjchSXXqBK06BF02YPA2cD9QrFgwILQgG4gFNtSZAz8EA=="), // <-- GANTI DENGAN SESSION AKUN 3
    groupUsernames: ["@LPM_SEME_UKE_RPW", "@lpmsemeukerpp"], // <-- GANTI DENGAN TARGET GRUP AKUN 3
  }
];

const messageToSend = `
ch video bk*₱ bxb https://t.me/+GDXb7qYaLytkNDA1

ch video bk*₱ bxb https://t.me/+GDXb7qYaLytkNDA1

ch video bk*₱ bxb https://t.me/+GDXb7qYaLytkNDA1

ch video bk*₱ bxb https://t.me/+GDXb7qYaLytkNDA1

ch video bk*₱ bxb https://t.me/+GDXb7qYaLytkNDA1

ch video bk*₱ bxb https://t.me/+GDXb7qYaLytkNDA1
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
        if (err.message.includes("FLOOD_WAIT")) break; // Berhenti kirim jika kena limit Telegram
      }
    }
  } catch (err) {
    console.log(`[FAILED] ${account.name}: ${err.message}`);
  } finally {
    await client.disconnect();
  }
}

// === LOGIKA BARU: TIMER MENIT TETAP ===
// Menit 10 tidak ada di daftar ini sesuai permintaan Anda. Tambahkan ", 10" jika itu typo.
const targetMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// === LOGIKA BARU: AKUN ACAK (RANDOM SHUFFLE) ===
let accountQueue = [];

function getNextRandomAccountIndex() {
  // Jika antrean kosong, isi ulang dengan index [0, 1, 2] lalu acak (shuffle)
  if (accountQueue.length === 0) {
    accountQueue = [0, 1, 2];
    for (let i = accountQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap (tukar posisi)
      [accountQueue[i], accountQueue[j]] = [accountQueue[j], accountQueue[i]];
    }
  }
  // Ambil (hapus dan return) elemen pertama dari antrean yang sudah diacak
  return accountQueue.shift();
}

function startApp() {
  console.log("--- BOT AUTO SEND RUNNING (MENIT TETAP & AKUN ACAK) ---");
  let lastProcessedMinute = -1;
  
  // Looping pengecekan setiap 10 detik
  setInterval(async () => {
    const now = new Date();
    const currentMinute = now.getMinutes();
    const currentHour = now.getHours();
    
    // Mencegah pesan dikirim berulang kali di menit yang sama
    if (currentMinute !== lastProcessedMinute) {
      
      // Mengeksekusi pesan jika menit saat ini ada di dalam targetMinutes
      if (targetMinutes.includes(currentMinute)) {
        lastProcessedMinute = currentMinute;
        
        // Ambil akun acak dari antrean
        const accountIndex = getNextRandomAccountIndex();
        const accountToRun = accounts[accountIndex];
        
        console.log(`\n[JADWAL TERPICU] Jam: ${currentHour}, Menit: ${currentMinute} | Giliran Acak: ${accountToRun.name}`);
        sendMessage(accountToRun).catch(e => console.log("Internal error:", e));
      }
    }
  }, 10000); // Cek setiap 10 detik
}

startApp();
