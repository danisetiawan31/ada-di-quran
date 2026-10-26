Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;

public class CircleLogoGenerator {
    // 1. MURNI CROP BULAT DENGAN BINGKAI EMAS (Tanpa Teks)
    public static void CreateCircleOnly(string srcPath, string outPath) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int size = 1024;
            using (Bitmap dest = new Bitmap(size, size, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(dest)) {
                    g.SmoothingMode = SmoothingMode.AntiAlias;
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;

                    float cx = 512f;
                    float cy = 525f; // Sedikit disesuaikan dengan titik tengah emblem
                    float r = 385f;

                    // Buat clipping path lingkaran
                    using (GraphicsPath path = new GraphicsPath()) {
                        path.AddEllipse(cx - r, cy - r, r * 2, r * 2);
                        g.SetClip(path);

                        // Gambar background putih dan gambar asli
                        g.Clear(Color.White);
                        g.DrawImage(src, 0, 0, size, size);
                        g.ResetClip();

                        // Gambar Bingkai Luar Emas Mewah (Outer Gold Ring)
                        using (Pen goldPen = new Pen(Color.FromArgb(255, 245, 158, 11), 16f)) {
                            g.DrawEllipse(goldPen, cx - r, cy - r, r * 2, r * 2);
                        }
                        // Cincin Aksen Toska Halus di dalam
                        using (Pen tealPen = new Pen(Color.FromArgb(255, 20, 184, 166), 5f)) {
                            g.DrawEllipse(tealPen, cx - r + 8f, cy - r + 8f, (r - 8f) * 2, (r - 8f) * 2);
                        }
                    }
                }
                dest.Save(outPath, ImageFormat.Png);
            }
        }
    }

    // 2. CROP BULAT DENGAN TEKS "ADA DI QURAN" MELENGKUNG DI ATAS (Arched Text)
    public static void CreateCircleWithCurvedText(string srcPath, string outPath) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int size = 1024;
            using (Bitmap dest = new Bitmap(size, size, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(dest)) {
                    g.SmoothingMode = SmoothingMode.AntiAlias;
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;

                    float cx = 512f;
                    float cy = 555f; // Geser sedikit ke bawah untuk memberi ruang teks di atas
                    float r = 345f;

                    // Gambar isi lingkaran
                    using (GraphicsPath path = new GraphicsPath()) {
                        path.AddEllipse(cx - r, cy - r, r * 2, r * 2);
                        g.SetClip(path);
                        g.Clear(Color.White);

                        // Gambar sumber di-scale pas di dalam lingkaran
                        float scale = 0.92f;
                        float sw = size * scale;
                        float sh = size * scale;
                        g.DrawImage(src, cx - sw / 2, (cy - sh / 2) + 10, sw, sh);
                        g.ResetClip();

                        // Bingkai Lingkaran Emas
                        using (Pen goldPen = new Pen(Color.FromArgb(255, 245, 158, 11), 14f)) {
                            g.DrawEllipse(goldPen, cx - r, cy - r, r * 2, r * 2);
                        }
                        using (Pen tealPen = new Pen(Color.FromArgb(255, 20, 184, 166), 4f)) {
                            g.DrawEllipse(tealPen, cx - r + 7f, cy - r + 7f, (r - 7f) * 2, (r - 7f) * 2);
                        }
                    }

                    // GAMBAR TEKS MELENGKUNG "ADA DI QURAN" DI ATAS
                    string text = "ADA DI QURAN";
                    float textRadius = r + 42f; // Tepat di atas bingkai
                    float totalArcDeg = 68f;     // Rentang sudut lengkungan
                    float startAngle = -totalArcDeg / 2f;
                    float step = totalArcDeg / (text.Length - 1);

                    using (Font font = new Font("Arial", 46f, FontStyle.Bold, GraphicsUnit.Pixel)) {
                        using (SolidBrush textBrush = new SolidBrush(Color.FromArgb(255, 10, 24, 60))) { // Deep Navy
                            for (int i = 0; i < text.Length; i++) {
                                float angle = startAngle + i * step;
                                float rad = angle * (float)Math.PI / 180f;

                                // Simpan state matriks
                                GraphicsState state = g.Save();

                                // Pindahkan origin ke titik pusat lingkaran lalu rotasi
                                g.TranslateTransform(cx, cy);
                                g.RotateTransform(angle);

                                // Hitung lebar karakter untuk centering
                                SizeF charSize = g.MeasureString(text[i].ToString(), font);

                                // Gambar karakter di posisi radius terbalik (atas)
                                g.DrawString(text[i].ToString(), font, textBrush, -charSize.Width / 2f, -textRadius - charSize.Height / 2f);

                                g.Restore(state);
                            }
                        }
                    }
                }
                dest.Save(outPath, ImageFormat.Png);
            }
        }
    }

    // 3. CROP BULAT DENGAN TEKS HORIZONTAL HEADER "ADA DI QURAN"
    public static void CreateCircleWithTopBanner(string srcPath, string outPath) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int size = 1024;
            using (Bitmap dest = new Bitmap(size, size, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(dest)) {
                    g.SmoothingMode = SmoothingMode.AntiAlias;
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;

                    float cx = 512f;
                    float cy = 575f;
                    float r = 350f;

                    // TEKS HEADER HORIZONTAL BOLD
                    using (Font font = new Font("Arial", 52f, FontStyle.Bold, GraphicsUnit.Pixel)) {
                        string title = "ADA DI QURAN";
                        SizeF titleSize = g.MeasureString(title, font);

                        // Pill background halus di belakang teks
                        float pillW = titleSize.Width + 50f;
                        float pillH = 72f;
                        float pillX = cx - pillW / 2f;
                        float pillY = 70f;

                        using (SolidBrush pillBrush = new SolidBrush(Color.FromArgb(255, 10, 24, 60))) { // Deep Navy Pill
                            using (GraphicsPath pillPath = new GraphicsPath()) {
                                pillPath.AddArc(pillX, pillY, pillH, pillH, 90, 180);
                                pillPath.AddArc(pillX + pillW - pillH, pillY, pillH, pillH, 270, 180);
                                pillPath.CloseFigure();
                                g.FillPath(pillBrush, pillPath);

                                using (Pen borderPen = new Pen(Color.FromArgb(255, 245, 158, 11), 3f)) {
                                    g.DrawPath(borderPen, pillPath);
                                }
                            }
                        }

                        // Teks Emas di dalam Pill
                        using (SolidBrush textBrush = new SolidBrush(Color.FromArgb(255, 251, 191, 36))) {
                            g.DrawString(title, font, textBrush, cx - titleSize.Width / 2f, pillY + (pillH - titleSize.Height) / 2f + 2f);
                        }
                    }

                    // Lingkaran Emblem
                    using (GraphicsPath path = new GraphicsPath()) {
                        path.AddEllipse(cx - r, cy - r, r * 2, r * 2);
                        g.SetClip(path);
                        g.Clear(Color.White);

                        float scale = 0.94f;
                        float sw = size * scale;
                        float sh = size * scale;
                        g.DrawImage(src, cx - sw / 2, (cy - sh / 2) + 8, sw, sh);
                        g.ResetClip();

                        using (Pen goldPen = new Pen(Color.FromArgb(255, 245, 158, 11), 14f)) {
                            g.DrawEllipse(goldPen, cx - r, cy - r, r * 2, r * 2);
                        }
                        using (Pen tealPen = new Pen(Color.FromArgb(255, 20, 184, 166), 4f)) {
                            g.DrawEllipse(tealPen, cx - r + 7f, cy - r + 7f, (r - 7f) * 2, (r - 7f) * 2);
                        }
                    }
                }
                dest.Save(outPath, ImageFormat.Png);
            }
        }
    }
}
"@

$src = "d:\Dokumen\yt\public\assets\global\logo_playful_3d_clay.jpg"
$out1 = "d:\Dokumen\yt\public\assets\global\logo_circle_curved_text.png"
$out2 = "d:\Dokumen\yt\public\assets\global\logo_circle_top_text.png"
$out3 = "d:\Dokumen\yt\public\assets\global\logo_circle_only.png"

[CircleLogoGenerator]::CreateCircleWithCurvedText($src, $out1)
[CircleLogoGenerator]::CreateCircleWithTopBanner($src, $out2)
[CircleLogoGenerator]::CreateCircleOnly($src, $out3)

Write-Host "Berhasil membuat 3 variasi logo bulat!"
