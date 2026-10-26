Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class FastBgRemover {
    public static void RemoveOuterWhite(string inputPath, string outputPath, int threshold) {
        using (Bitmap src = new Bitmap(inputPath)) {
            int w = src.Width;
            int h = src.Height;
            using (Bitmap dest = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
                BitmapData srcData = src.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData destData = dest.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                int bytes = Math.Abs(srcData.Stride) * h;
                byte[] srcBuffer = new byte[bytes];
                byte[] destBuffer = new byte[bytes];

                System.Runtime.InteropServices.Marshal.Copy(srcData.Scan0, srcBuffer, 0, bytes);

                bool[] isOuterBg = new bool[w * h];
                bool[] visited = new bool[w * h];
                Queue<int> q = new Queue<int>();

                // Tambahkan semua titik di border luar
                for (int x = 0; x < w; x++) {
                    int top = x;
                    int btm = (h - 1) * w + x;
                    q.Enqueue(top); visited[top] = true;
                    q.Enqueue(btm); visited[btm] = true;
                }
                for (int y = 0; y < h; y++) {
                    int left = y * w;
                    int right = y * w + (w - 1);
                    if (!visited[left]) { q.Enqueue(left); visited[left] = true; }
                    if (!visited[right]) { q.Enqueue(right); visited[right] = true; }
                }

                int[] dx = { 1, -1, 0, 0 };
                int[] dy = { 0, 0, 1, -1 };

                // BFS Flood Fill dari tepi luar
                while (q.Count > 0) {
                    int curr = q.Dequeue();
                    int cx = curr % w;
                    int cy = curr / w;
                    int idx = curr * 4;

                    int b = srcBuffer[idx];
                    int g = srcBuffer[idx + 1];
                    int r = srcBuffer[idx + 2];

                    // Jika warna mendekati putih
                    if (r >= threshold && g >= threshold && b >= threshold) {
                        isOuterBg[curr] = true;

                        for (int i = 0; i < 4; i++) {
                            int nx = cx + dx[i];
                            int ny = cy + dy[i];
                            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                                int npos = ny * w + nx;
                                if (!visited[npos]) {
                                    visited[npos] = true;
                                    q.Enqueue(npos);
                                }
                            }
                        }
                    }
                }

                // Salin pixel ke dest: pixel luar jadi 100% transparan, dalam tetap utuh
                for (int pos = 0; pos < w * h; pos++) {
                    int idx = pos * 4;
                    if (isOuterBg[pos]) {
                        destBuffer[idx] = 0;
                        destBuffer[idx + 1] = 0;
                        destBuffer[idx + 2] = 0;
                        destBuffer[idx + 3] = 0;
                    } else {
                        destBuffer[idx] = srcBuffer[idx];
                        destBuffer[idx + 1] = srcBuffer[idx + 1];
                        destBuffer[idx + 2] = srcBuffer[idx + 2];
                        destBuffer[idx + 3] = 255;
                    }
                }

                System.Runtime.InteropServices.Marshal.Copy(destBuffer, 0, destData.Scan0, bytes);

                src.UnlockBits(srcData);
                dest.UnlockBits(destData);

                dest.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
"@

$inPath = "d:\Dokumen\yt\public\assets\global\logo_playful_pop_vector_v1.jpg"
$outPath = "d:\Dokumen\yt\public\assets\global\logo_playful_transparent.png"

[FastBgRemover]::RemoveOuterWhite($inPath, $outPath, 242)
Write-Host "Berhasil membuat transparent logo di: $outPath"
