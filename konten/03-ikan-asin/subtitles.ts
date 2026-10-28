export interface SubtitleSegment {
  startFrame: number;
  endFrame: number;
  text: string;
  highlightWords: string[];
}

export const EP03_SUBTITLE_SEGMENTS: SubtitleSegment[] = [
  // PARAGRAF 1 (Frame 0 - 240 | 0.0s - 8.0s)
  {
    startFrame: 0,
    endFrame: 81,
    text: "Ngeri banget! Ternyata masih ada oknum nakal",
    highlightWords: ["Ngeri banget!", "oknum nakal"],
  },
  {
    startFrame: 81,
    endFrame: 135,
    text: "yang sengaja nyemprot ikan asin",
    highlightWords: ["nyemprot ikan asin"],
  },
  {
    startFrame: 135,
    endFrame: 180,
    text: "pakai cairan obat nyamuk",
    highlightWords: ["obat nyamuk"],
  },
  {
    startFrame: 180,
    endFrame: 240,
    text: "biar kelihatan awet dan bersih!",
    highlightWords: ["awet dan bersih!"],
  },

  // PARAGRAF 2 (Frame 240 - 540 | 8.0s - 18.0s)
  {
    startFrame: 240,
    endFrame: 300,
    text: "Saat dijemur, bau amis ikan asin",
    highlightWords: ["Saat dijemur,", "bau amis"],
  },
  {
    startFrame: 300,
    endFrame: 384,
    text: "biasanya ngundang banyak lalat buat bertelur.",
    highlightWords: ["banyak lalat", "bertelur."],
  },
  {
    startFrame: 384,
    endFrame: 462,
    text: "Biar nggak rugi karena belatung, oknum curang",
    highlightWords: ["belatung,", "oknum curang"],
  },
  {
    startFrame: 462,
    endFrame: 540,
    text: "pakai jalan pintas nyemprotin racun serangga.",
    highlightWords: ["jalan pintas", "racun serangga."],
  },

  // PARAGRAF 3 (Frame 540 - 885 | 18.0s - 29.5s)
  {
    startFrame: 540,
    endFrame: 603,
    text: "Masalahnya, cairan obat nyamuk itu",
    highlightWords: ["cairan obat nyamuk"],
  },
  {
    startFrame: 603,
    endFrame: 663,
    text: "mengandung racun saraf berbahaya",
    highlightWords: ["racun saraf", "berbahaya"],
  },
  {
    startFrame: 663,
    endFrame: 741,
    text: "yang meresap masuk ke serat daging ikan.",
    highlightWords: ["meresap masuk", "serat daging"],
  },
  {
    startFrame: 741,
    endFrame: 804,
    text: "Racun ini nggak bakal hilang tuntas",
    highlightWords: ["nggak bakal", "hilang tuntas"],
  },
  {
    startFrame: 804,
    endFrame: 885,
    text: "cuma dengan dicuci air atau digoreng panas!",
    highlightWords: ["dicuci air", "digoreng panas!"],
  },

  // PARAGRAF 4 (Frame 885 - 1080 | 29.5s - 36.0s)
  {
    startFrame: 885,
    endFrame: 954,
    text: "Kalau sampai termakan, residu kimianya",
    highlightWords: ["termakan,", "residu kimianya"],
  },
  {
    startFrame: 954,
    endFrame: 1005,
    text: "bisa memicu mual, pusing,",
    highlightWords: ["mual, pusing,"],
  },
  {
    startFrame: 1005,
    endFrame: 1080,
    text: "hingga merusak organ hati dan ginjal.",
    highlightWords: ["merusak", "hati dan ginjal."],
  },

  // PARAGRAF 5 (Frame 1080 - 1320 | 36.0s - 44.0s)
  {
    startFrame: 1080,
    endFrame: 1140,
    text: "Mencari untung dengan cara curang",
    highlightWords: ["Mencari untung", "cara curang"],
  },
  {
    startFrame: 1140,
    endFrame: 1212,
    text: "yang merusak kesehatan orang lain seperti ini",
    highlightWords: ["merusak kesehatan"],
  },
  {
    startFrame: 1212,
    endFrame: 1272,
    text: "sudah dilarang keras di dalam Al-Qur'an,",
    highlightWords: ["dilarang keras", "Al-Qur'an,"],
  },
  {
    startFrame: 1272,
    endFrame: 1320,
    text: "Surah Asy-Syu'ara ayat 183.",
    highlightWords: ["Surah Asy-Syu'ara", "ayat 183."],
  },
];
