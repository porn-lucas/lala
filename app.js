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
    name: "AKUN +6283197439676", // AKUN 1
    apiId: 30337008,
    apiHash: "40507eaab253855a9cf48622cee368c7",
    session: new StringSession("1BQANOTEuMTA4LjU2LjE4MwG7lt5mRxcs/kQuyGYwoVtwsNov3oMdcRqkQJawXgqk42MNhR/+xrpDAyNXHjn9pq+tgi73Vv4dNGZslVbBi0LnrHqw5CcRP/M/mE2c1FXO9PUGXPBwjZEzsCg/gr9n3B3+lhXoXimcLQMmFbppU+I4OlwTOvcagrEaEt0uLTC/zbnPVvOigZvKu9pLBuonhn64e0buCj5+mRICarwtVOd9UypBdlvKbLQ1tScM8K+fvHx77QvfEQrd7mEbDxpANjCw9kvf6XjZeAawf5XL30lf+hn4AMnVpCaTy3xp7vQN+d5+Kvo+scOBR4Bq/hOmTLkM31QcNTHkrFpuU+vD/wrynw=="),
    groupUsernames: ["@LPM_SEME_UKE_RPW", "@lpmsemeukerpp"],
  },
  {
    name: "AKUN +6281995790983 ", // AKUN 2
    apiId: 37406618,
    apiHash: "aa22c42a8c05b156cf534953a11e522d",
     session: new StringSession("1BQANOTEuMTA4LjU2LjE4MwG7teOCWQMyZeLxb9k3lLOk6IKzhajjZ3S0RKtEZolc/zuP5cyJtOyj/uKaED0dPofi4k4ubWpqg7KTbqUsIdHWJRggWi6CqCL6BnltWk+r9zCUPdAWIbmyfiKvlzaXsGbYAO2Z1bxkHKa/5KpfENT+mOkM9KoDZONuTVRPcIzTM0a9a4BadlX+ai1jBPNptwmn2Bi07TmgXeMCSM+CZ3vE1as1VcwJ+Ey3A64ToDBGYOjbTMEiZZMaa+eWvs8VndLcatVlpj4qNUkNO9rBjQLDMfXmFdZ9cr75AK8mzHltuF7qBdDF5b7FqtDHlzLLKPAiL+IusRwBuv80zqV+WDiHYw=="),
    groupUsernames: ["@BIO_RPP_30", "@lpmsemeukerpp"],
  },
  {
    name: "AKUN 3 6281995790986  (GANTI NAMA)", // AKUN 3 - SILAKAN ISI DATANYA
    apiId: 37190691, // <-- GANTI DENGAN API ID AKUN 3
    apiHash: "cb55f060decd81e5ccc56b83e87d2cb4", 
     session: new StringSession("1BQANOTEuMTA4LjU2LjE4MwG7sfO90qYSgDaH1p8Recd+v05zrkrf25YwT8rbIj4X6QM8BdK66gtANHnUx9sRp19AUeLa+Q2Rx1bg6q9chRLQVNpOPjnXyKjoCKVur2m1MCobYaZbW2+xDYAgOdXozc+ufzL0/FqnTIwgBnNWGefOpkZejpyTJj/yeH7Txki4YKse3qTzHNkBtFgjt/vKWWWzbHd21ix4pHTrpG2t1OgZK+W6bJJX0232oK85T1aqSr1QOmpufHwNORTiybZ6ZiVi8Fi40Y2/cTvNwB/dzCtSoxtW5/KSzHEGaOH6/CN2ODVIV3OUoH9arVwfq7VJsB8Csz+PJFtNdnQCtgCBhTcoGQ=="),
    groupUsernames: ["@LPM_SEME_UKE_RPW", "@BIO_RPP_30"], // <-- GANTI DENGAN TARGET GRUP AKUN 3
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

// Global target minutes
const targetMinutes = [3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36, 39, 43, 46, 49, 53, 56, 59];

// Logika pembagian giliran akun berdasarkan jam
function getAccountIndex(minuteIndex, currentHour) {
  // Rotasi dibagi dalam siklus 3 jam (0, 1, 2)
  const cycle = currentHour % 3;
  
  // Index 0 = Akun 1 | Index 1 = Akun 2 | Index 2 = Akun 3
  if (cycle === 0) { 
    // Jam Ke-1: Akun 1, Akun 2, Akun 3
    return minuteIndex % 3;
  } else if (cycle === 1) { 
    // Jam Ke-2: Akun 2, Akun 3, Akun 1
    return (minuteIndex + 1) % 3;
  } else { 
    // Jam Ke-3: Akun 3, Akun 2, Akun 1 (Sesuai spesifikasi request)
    const reversePattern = [2, 1, 0];
    return reversePattern[minuteIndex % 3];
  }
}

function startApp() {
  console.log("--- BOT AUTO SEND RUNNING DENGAN 3 AKUN (ROTASI PER JAM) ---");
  let lastProcessedMinute = -1;
  
  // Looping pengecekan setiap 10 detik
  setInterval(async () => {
    const now = new Date();
    const currentMinute = now.getMinutes();
    const currentHour = now.getHours();
    
    // Mencegah pesan dikirim berulang kali di menit yang sama
    if (currentMinute !== lastProcessedMinute) {
      lastProcessedMinute = currentMinute;
      
      const minuteIndex = targetMinutes.indexOf(currentMinute);
      
      // Mengeksekusi pesan jika menit saat ini terdaftar di targetMinutes
      if (minuteIndex !== -1) {
        // Menentukan akun mana yang jalan pada menit ini
        const accountIndex = getAccountIndex(minuteIndex, currentHour);
        const accountToRun = accounts[accountIndex];
        
        console.log(`\n[JADWAL TERPICU] Jam: ${currentHour}, Menit: ${currentMinute} | Giliran: ${accountToRun.name}`);
        sendMessage(accountToRun).catch(e => console.log("Internal error:", e));
      }
    }
  }, 10000);
}

startApp();
