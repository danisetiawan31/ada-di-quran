export interface SubtitleInputSegment {
  text: string;
  highlightWords?: string[];
  /**
   * Toleransi pergeseran waktu manual (dalam frame) untuk menyesuaikan jeda dramatis atau tempo vokal narator.
   * Nilai positif menggeser ke depan, nilai negatif menggeser ke belakang.
   */
  manualOffsetFrames?: number;
}

export interface TimedSubtitle {
  text: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  highlightWords: string[];
}

/**
 * Menghitung startFrame dan endFrame setiap segmen kalimat secara proporsional
 * berdasarkan rasio panjang karakter teks terhadap total durasi frame audio vo_main.mp3.
 */
export function generateProportionalSubtitles(
  segments: SubtitleInputSegment[],
  totalDurationInFrames: number
): TimedSubtitle[] {
  if (!segments || segments.length === 0 || totalDurationInFrames <= 0) {
    return [];
  }

  // 1. Hitung total karakter semua segmen teks (mengabaikan spasi berlebih)
  const cleanedTexts = segments.map((s) => s.text.trim());
  const charCounts = cleanedTexts.map((t) => Math.max(t.length, 1));
  const totalChars = charCounts.reduce((acc, count) => acc + count, 0);

  // 2. Alokasikan frame proporsional berdasarkan rasio karakter
  let currentStart = 0;
  const result: TimedSubtitle[] = [];

  for (let i = 0; i < segments.length; i++) {
    const isLast = i === segments.length - 1;
    const ratio = charCounts[i] / totalChars;

    // Hitung durasi dasar
    let allocatedFrames = Math.round(ratio * totalDurationInFrames);

    // Untuk segmen terakhir, pastikan tepat menutup total frame
    if (isLast) {
      allocatedFrames = Math.max(1, totalDurationInFrames - currentStart);
    }

    let start = currentStart;
    let end = isLast ? totalDurationInFrames : currentStart + allocatedFrames;

    // Terapkan toleransi manual offset jika ditentukan
    const offset = segments[i].manualOffsetFrames || 0;
    if (offset !== 0 && !isLast) {
      end = Math.max(start + 5, end + offset);
    }

    result.push({
      text: cleanedTexts[i],
      startFrame: start,
      endFrame: end,
      durationInFrames: end - start,
      highlightWords: segments[i].highlightWords || [],
    });

    currentStart = end;
  }

  return result;
}
