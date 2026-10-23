import fs from "fs";
import path from "path";

const SAMPLE_RATE = 44100;

function createWavBuffer(samples, sampleRate = SAMPLE_RATE) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = samples.length * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples as 16-bit signed integers (-32768 to 32767)
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 32768 : s * 32767;
    buffer.writeInt16LE(Math.round(val), 44 + i * 2);
  }

  return buffer;
}

// Ensure public/sfx directory exists
const sfxDir = path.resolve("public/sfx");
if (!fs.existsSync(sfxDir)) {
  fs.mkdirSync(sfxDir, { recursive: true });
}

// 1. POP: Cheerful cartoon bubble pop (70ms)
function generatePop() {
  const duration = 0.08;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    // Rapid pitch sweep downwards from 900Hz to 160Hz
    const freq = 900 * Math.exp(-progress * 4.5);
    // Envelope: quick attack (2ms), exponential decay
    const env = Math.sin(Math.min(1, t / 0.003) * Math.PI * 0.5) * Math.exp(-progress * 5.0);
    const sine = Math.sin(2 * Math.PI * freq * t);
    samples[i] = sine * env * 0.85;
  }
  return samples;
}

// 2. WHOOSH: Cinematic transition whoosh (280ms)
function generateWhoosh() {
  const duration = 0.32;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  // Filtered shaped noise
  let lastOut = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    // Bell curve amplitude envelope
    const env = Math.sin(progress * Math.PI) ** 2.2;
    // Pitch / cutoff sweep upwards then downwards
    const whiteNoise = Math.random() * 2 - 1;
    // Simple 1-pole lowpass / bandpass approximation
    const cutoff = 0.08 + 0.35 * Math.sin(progress * Math.PI);
    lastOut = lastOut + cutoff * (whiteNoise - lastOut);
    // Add tonal sub-element
    const toneFreq = 160 + 280 * Math.sin(progress * Math.PI);
    const tone = Math.sin(2 * Math.PI * toneFreq * t) * 0.3;

    samples[i] = (lastOut * 0.7 + tone) * env * 0.8;
  }
  return samples;
}

// 3. SLAM / THUD: Heavy impactful comic stamp (220ms)
function generateSlam() {
  const duration = 0.25;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    // Deep pitch drop 150Hz -> 38Hz
    const freq = 38 + 120 * Math.exp(-progress * 9);
    const sine = Math.sin(2 * Math.PI * freq * t);
    // Initial transient punch (first 10ms)
    const punch = (Math.random() * 2 - 1) * Math.exp(-progress * 28) * 0.5;
    // Heavy decay envelope
    const env = Math.exp(-progress * 7);
    samples[i] = (sine * 0.75 + punch) * env * 0.95;
  }
  return samples;
}

// 4. DING / CHIME: Bright crystalline discovery bell (650ms)
function generateDing() {
  const duration = 0.65;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  const f0 = 1174.66; // D6 note
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const env = Math.exp(-progress * 4.8);
    // Harmonics: fundamental + octave + major third
    const tone =
      Math.sin(2 * Math.PI * f0 * t) * 0.6 +
      Math.sin(2 * Math.PI * (f0 * 2) * t) * 0.28 +
      Math.sin(2 * Math.PI * (f0 * 2.75) * t) * 0.12;
    samples[i] = tone * env * 0.75;
  }
  return samples;
}

// 5. TICK: Crisp clock tick for stopwatch (45ms)
function generateTick() {
  const duration = 0.05;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const freq = 1600 * Math.exp(-progress * 8);
    const click = Math.sin(2 * Math.PI * freq * t);
    const noise = (Math.random() * 2 - 1) * 0.3;
    const env = Math.exp(-progress * 18);
    samples[i] = (click * 0.7 + noise) * env * 0.7;
  }
  return samples;
}

// 6. EXPLOSION / SPARKLE: Joyful sensory explosion burst (450ms)
function generateExplosion() {
  const duration = 0.48;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    // Rapid sparkling arpeggio notes
    const step = Math.floor(progress * 12);
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98, 2093.0];
    const currentNote = notes[step % notes.length];
    const sparkleTone = Math.sin(2 * Math.PI * currentNote * t) * 0.35;
    // Noise burst
    const noise = (Math.random() * 2 - 1) * Math.exp(-progress * 6) * 0.4;
    // Sub pop
    const sub = Math.sin(2 * Math.PI * (70 * Math.exp(-progress * 5)) * t) * 0.4;
    const env = Math.exp(-progress * 3.5);

    samples[i] = (sparkleTone + noise + sub) * env * 0.85;
  }
  return samples;
}

// 7. CLICK: Modern tactile button click (35ms)
function generateClick() {
  const duration = 0.04;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    const freq = 2200 * Math.exp(-progress * 12);
    const tone = Math.sin(2 * Math.PI * freq * t);
    const env = Math.exp(-progress * 22);
    samples[i] = tone * env * 0.8;
  }
  return samples;
}

// 8. FADER SWEEP: Downward sensory dampening sweep (600ms)
function generateFaderSweep() {
  const duration = 0.6;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const progress = i / numSamples;
    // Frequency smoothly swooshing down from 1200Hz to 120Hz
    const freq = 120 + 1080 * (1 - progress) ** 2;
    const tone = Math.sin(2 * Math.PI * freq * t) * 0.4;
    const noise = (Math.random() * 2 - 1) * (1 - progress) * 0.2;
    const env = Math.sin(progress * Math.PI) * 0.7;
    samples[i] = (tone + noise) * env * 0.75;
  }
  return samples;
}

// Generate and write all files
const sfxList = [
  { name: "pop.wav", gen: generatePop },
  { name: "whoosh.wav", gen: generateWhoosh },
  { name: "slam.wav", gen: generateSlam },
  { name: "ding.wav", gen: generateDing },
  { name: "tick.wav", gen: generateTick },
  { name: "explosion.wav", gen: generateExplosion },
  { name: "click.wav", gen: generateClick },
  { name: "fader.wav", gen: generateFaderSweep },
];

for (const { name, gen } of sfxList) {
  const samples = gen();
  const buffer = createWavBuffer(samples);
  const filePath = path.join(sfxDir, name);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

console.log("All sound effects successfully generated!");
