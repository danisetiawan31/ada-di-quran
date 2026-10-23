import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// 1. Parse CLI Arguments (--ep=00, --surah=49, --ayah=9 atau --ep 00 --surah 49 --ayah 9)
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const eqIdx = arg.indexOf("=");
      if (eqIdx !== -1) {
        const key = arg.slice(2, eqIdx);
        const val = arg.slice(eqIdx + 1);
        parsed[key] = val;
      } else {
        const key = arg.slice(2);
        const nextVal = args[i + 1];
        if (nextVal && !nextVal.startsWith("--")) {
          parsed[key] = nextVal;
          i++;
        } else {
          parsed[key] = true;
        }
      }
    }
  }
  return parsed;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP Error ${res.status} (${res.statusText}) saat mengunduh: ${url}`);
  }

  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileStream = fs.createWriteStream(destPath);
  await pipeline(res.body, fileStream);

  const stats = fs.statSync(destPath);
  return stats.size;
}

async function main() {
  const args = parseArgs();

  const ep = args.ep ? String(args.ep).padStart(2, "0") : null;
  const surah = args.surah ? parseInt(args.surah, 10) : null;
  const ayah = args.ayah ? parseInt(args.ayah, 10) : null;

  if (!ep || !surah || !ayah) {
    console.error("❌ Argumen tidak lengkap!");
    console.error("👉 Penggunaan: node scripts/fetch-ayah.mjs --ep=01 --surah=49 --ayah=9");
    process.exit(1);
  }

  // Format parameter EveryAyah
  const surah3 = String(surah).padStart(3, "0");
  const ayah3 = String(ayah).padStart(3, "0");
  const audioFileName = `${surah3}${ayah3}.mp3`;
  const imageFileName = `${surah}_${ayah}.png`;

  const audioUrl = `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${audioFileName}`;
  const imageUrl = `https://everyayah.com/data/images_png/${imageFileName}`;

  const targetDir = path.join(projectRoot, "public", "assets", `ep${ep}`);
  const destAudio = path.join(targetDir, "ayah.mp3");
  const destImage = path.join(targetDir, "ayah.png");

  console.log(`\n======================================================`);
  console.log(`📥 MENGUNDUH ASET AYAT UNTUK EPISODE ${ep}`);
  console.log(`   Surah : ${surah} | Ayat : ${ayah}`);
  console.log(`   Target: public/assets/ep${ep}/`);
  console.log(`======================================================\n`);

  try {
    // 1. Download Audio Murattal (Abu Bakr Ash-Shaatree)
    console.log(`⏳ [1/2] Mengunduh Audio Murattal...`);
    console.log(`   URL : ${audioUrl}`);
    const audioSize = await downloadFile(audioUrl, destAudio);
    console.log(`   ✅ Audio tersimpan: ayah.mp3 (${(audioSize / 1024).toFixed(1)} KB)`);

    // 2. Download Gambar Kaligrafi Ayat
    console.log(`\n⏳ [2/2] Mengunduh Gambar Kaligrafi Ayat...`);
    console.log(`   URL : ${imageUrl}`);
    const imageSize = await downloadFile(imageUrl, destImage);
    console.log(`   ✅ Gambar tersimpan: ayah.png (${(imageSize / 1024).toFixed(1)} KB)`);

    console.log(`\n🎉 SUKSES! Seluruh aset ayat untuk Episode ${ep} siap digunakan di:`);
    console.log(`   📁 ${destAudio}`);
    console.log(`   📁 ${destImage}\n`);
  } catch (err) {
    console.error(`\n❌ Gagal mengunduh aset: ${err.message}\n`);
    process.exit(1);
  }
}

main();
