Add-Type -AssemblyName System.Drawing

$srcPath = "d:\Dokumen\yt\public\assets\global\logo_option1_mushaf.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = $bmp.Height

$centerX = 512.0
$centerY = 355.0
$sphereRadius = 78.0

# 1. Bersihkan SELURUH sisa pixel abu-abu/kotor dari atas sampai bawah
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bytesCount = [Math]::Abs($data.Stride) * $height
$bytes = New-Object byte[] $bytesCount
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytesCount)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $idx = ($y * $width + $x) * 4
        $r = [int]$bytes[$idx + 2]
        $g = [int]$bytes[$idx + 1]
        $b = [int]$bytes[$idx]
        $a = [int]$bytes[$idx + 3]

        if ($a -eq 0) { continue }

        $dx = $x - $centerX
        $dy = $y - $centerY
        $dist = [Math]::Sqrt($dx * $dx + $dy * $dy)

        # Hapus seluruh area di atas buku dan di sekitar matahari (Y < 465)
        # kecuali jika pixel berada di dalam bola matahari
        if ($y -lt 470) {
            if ($dist -ge ($sphereRadius - 2)) {
                # Bersihkan total semua pixel di luar bola matahari di area atas
                $bytes[$idx] = 0
                $bytes[$idx + 1] = 0
                $bytes[$idx + 2] = 0
                $bytes[$idx + 3] = 0
                continue
            }
        }

        # Untuk sisa logo buku (Y >= 470): hapus pixel abu-abu / kotor
        # Garis emas asli memiliki R > 195, G > 140, dan selisih R - B > 50
        $isPureGold = ($r -gt 190) -and ($g -gt 135) -and (($r - $b) -gt 45)
        if (-not $isPureGold) {
            $bytes[$idx] = 0
            $bytes[$idx + 1] = 0
            $bytes[$idx + 2] = 0
            $bytes[$idx + 3] = 0
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytesCount)
$bmp.UnlockBits($data)

# 2. Gambar ulang Matahari & Sinar yang Sangat Mewah, Tajam & Bersih
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# A. SINAR-SINAR MATAHARI (SUN RAYS) MEWAH & SIMETRIS
$angles = @(
    -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80
)

foreach ($ang in $angles) {
    $rad = ($ang - 90) * [Math]::PI / 180.0
    $isMajor = ($ang % 20 -eq 0)
    
    $startR = $sphereRadius + 14.0
    $endR = if ($ang -eq 0) {
        $sphereRadius + 115.0 # Sinar vertikal tengah paling agung
    } elseif ($isMajor) {
        $sphereRadius + 95.0
    } else {
        $sphereRadius + 65.0
    }

    $x1 = $centerX + [Math]::Cos($rad) * $startR
    $y1 = $centerY + [Math]::Sin($rad) * $startR
    $x2 = $centerX + [Math]::Cos($rad) * $endR
    $y2 = $centerY + [Math]::Sin($rad) * $endR

    # Garis Sinar Utama
    $penColor = if ($isMajor) { [System.Drawing.Color]::FromArgb(255, 251, 191, 36) } else { [System.Drawing.Color]::FromArgb(235, 245, 158, 11) }
    $penWidth = if ($isMajor) { 4.5 } else { 2.8 }
    $pen = New-Object System.Drawing.Pen($penColor, $penWidth)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, [float]$x1, [float]$y1, [float]$x2, [float]$y2)
    $pen.Dispose()

    # Berlian Bintang Emas di Ujung Sinar Utama
    if ($isMajor) {
        $diamondCenterR = $endR + 15.0
        $dcX = $centerX + [Math]::Cos($rad) * $diamondCenterR
        $dcY = $centerY + [Math]::Sin($rad) * $diamondCenterR
        $dSize = if ($ang -eq 0) { 7.5 } else { 5.5 }

        $dPts = @(
            (New-Object System.Drawing.PointF([float]$dcX, [float]($dcY - $dSize * 1.4))),
            (New-Object System.Drawing.PointF([float]($dcX + $dSize), [float]$dcY)),
            (New-Object System.Drawing.PointF([float]$dcX, [float]($dcY + $dSize * 1.4))),
            (New-Object System.Drawing.PointF([float]($dcX - $dSize), [float]$dcY))
        )
        $dBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 254, 240, 138))
        $g.FillPolygon($dBrush, $dPts)
        $dBrush.Dispose()
    }
}

# B. BOLA MATAHARI BERKILAU (THE GOLDEN SUN SPHERE)
$sphereRect = New-Object System.Drawing.RectangleF([float]($centerX - $sphereRadius), [float]($centerY - $sphereRadius), [float]($sphereRadius * 2), [float]($sphereRadius * 2))

# Gradasi Warna Emas Mewah (PathGradientBrush)
$pth = New-Object System.Drawing.Drawing2D.GraphicsPath
$pth.AddEllipse($sphereRect)
$pbr = New-Object System.Drawing.Drawing2D.PathGradientBrush($pth)
$pbr.CenterPoint = New-Object System.Drawing.PointF([float]($centerX - 15), [float]($centerY - 22))
$pbr.CenterColor = [System.Drawing.Color]::FromArgb(255, 255, 253, 235) # Putih Fajar Berkilau
$pbr.SurroundColors = @([System.Drawing.Color]::FromArgb(255, 217, 119, 6)) # Emas Amber Kaya
$g.FillPath($pbr, $pth)
$pbr.Dispose()
$pth.Dispose()

# C. LINGKARAN BINGKAI EMAS PRESISI
$outerBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 251, 191, 36), 4.0)
$g.DrawEllipse($outerBorderPen, [float]($centerX - $sphereRadius), [float]($centerY - $sphereRadius), [float]($sphereRadius * 2), [float]($sphereRadius * 2))
$outerBorderPen.Dispose()

$innerBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 255, 255, 255), 1.5)
$g.DrawEllipse($innerBorderPen, [float]($centerX - $sphereRadius + 3), [float]($centerY - $sphereRadius + 3), [float](($sphereRadius - 3) * 2), [float](($sphereRadius - 3) * 2))
$innerBorderPen.Dispose()

# D. KILAU SPEKULAR CAHAYA ATAS (HIGHLIGHT CRESCENT)
$hlBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 255, 255, 255))
$g.FillEllipse($hlBrush, [float]($centerX - 30), [float]($centerY - $sphereRadius + 14), 60.0, 28.0)
$hlBrush.Dispose()

$g.Dispose()

# Simpan hasil akhir ke file utama
$tempPath = "d:\Dokumen\yt\out\temp_sun_perfect.png"
$bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Move-Item -Path $tempPath -Destination $srcPath -Force

Write-Host "Berhasil menyempurnakan matahari dan membersihkan logo di $srcPath"
