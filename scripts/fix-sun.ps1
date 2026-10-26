Add-Type -AssemblyName System.Drawing

$srcPath = "d:\Dokumen\yt\public\assets\global\logo_option1_mushaf.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = $bmp.Height

$centerX = 512.0
$centerY = 355.0
$sphereRadius = 72.0
$outerRadius = 230.0

$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bytesCount = [Math]::Abs($data.Stride) * $height
$bytes = New-Object byte[] $bytesCount
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytesCount)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $idx = ($y * $width + $x) * 4
        $b = $bytes[$idx]
        $g = $bytes[$idx + 1]
        $r = $bytes[$idx + 2]
        $a = $bytes[$idx + 3]

        if ($a -eq 0) { continue }

        $dx = $x - $centerX
        $dy = $y - $centerY
        $dist = [Math]::Sqrt($dx * $dx + $dy * $dy)

        # Jika berada di area halo matahari (di luar bola matahari sampai ke ujung sinar)
        if ($dist -ge ($sphereRadius - 2) -and $dist -le $outerRadius -and $y -lt 450) {
            # Cek apakah pixel ini adalah sinar emas terang
            # Sinar emas terang punya R tinggi (> 180), G menengah-tinggi (> 130), dan rasio R > B + 40
            $isBrightGold = ($r -gt 175) -and ($g -gt 130) -and (($r - $b) -gt 35)

            if (-not $isBrightGold) {
                # Ini adalah halo abu-abu/cokelat kotor -> Jadikan 100% transparan!
                $bytes[$idx] = 0
                $bytes[$idx + 1] = 0
                $bytes[$idx + 2] = 0
                $bytes[$idx + 3] = 0
            }
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytesCount)
$bmp.UnlockBits($data)

$outPath = "d:\Dokumen\yt\out\test-sun-cleaned.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Saved cleaned test to: $outPath"
