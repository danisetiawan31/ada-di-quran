Add-Type -AssemblyName System.Drawing

function Remove-DarkBackgroundClean {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [double]$ThresholdLow = 50.0,
        [double]$ThresholdHigh = 100.0
    )

    $srcBmp = [System.Drawing.Bitmap]::FromFile($InputPath)
    $width = $srcBmp.Width
    $height = $srcBmp.Height

    $destBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $srcData = $srcBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $destData = $destBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $bytesCount = [Math]::Abs($srcData.Stride) * $height
    $srcBytes = New-Object byte[] $bytesCount
    $destBytes = New-Object byte[] $bytesCount

    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBytes, 0, $bytesCount)

    for ($i = 0; $i -lt $bytesCount; $i += 4) {
        $b = [double]$srcBytes[$i]
        $g = [double]$srcBytes[$i + 1]
        $r = [double]$srcBytes[$i + 2]

        # Luminance
        $lum = 0.299 * $r + 0.587 * $g + 0.114 * $b

        # Emas murni memiliki R tinggi, G menengah-tinggi, B rendah
        $isGold = ($r - $b) -gt 25 -and ($g - $b) -gt 15

        if (-not $isGold -and $lum -lt 95) {
            # Hapus semua pixel gelap dan abu-abu/navy
            $destBytes[$i] = 0
            $destBytes[$i + 1] = 0
            $destBytes[$i + 2] = 0
            $destBytes[$i + 3] = 0
        }
        elseif ($lum -le $ThresholdLow) {
            $destBytes[$i] = 0
            $destBytes[$i + 1] = 0
            $destBytes[$i + 2] = 0
            $destBytes[$i + 3] = 0
        }
        elseif ($lum -ge $ThresholdHigh -or ($isGold -and $lum -gt 80)) {
            $destBytes[$i] = [byte]$b
            $destBytes[$i + 1] = [byte]$g
            $destBytes[$i + 2] = [byte]$r
            $destBytes[$i + 3] = 255
        }
        else {
            $alphaRatio = ($lum - $ThresholdLow) / ($ThresholdHigh - $ThresholdLow)
            $alphaByte = [byte][Math]::Min(255, [Math]::Max(0, [int]($alphaRatio * 255)))

            $destBytes[$i] = [byte][Math]::Min(255, [int]($b * ($r / [Math]::Max(1.0, $b + 10))))
            $destBytes[$i + 1] = [byte]$g
            $destBytes[$i + 2] = [byte]$r
            $destBytes[$i + 3] = $alphaByte
        }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($destBytes, 0, $destData.Scan0, $bytesCount)

    $srcBmp.UnlockBits($srcData)
    $destBmp.UnlockBits($destData)
    $srcBmp.Dispose()

    $destBmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()

    Write-Host "Berhasil membuat clean transparent PNG: $OutputPath"
}

Remove-DarkBackgroundClean -InputPath "d:\Dokumen\yt\public\assets\global\logo_option1_mushaf.jpg" -OutputPath "d:\Dokumen\yt\public\assets\global\logo_option1_mushaf.png" -ThresholdLow 45.0 -ThresholdHigh 95.0
Remove-DarkBackgroundClean -InputPath "d:\Dokumen\yt\public\assets\global\logo_option2_rubelhizb.jpg" -OutputPath "d:\Dokumen\yt\public\assets\global\logo_option2_rubelhizb.png" -ThresholdLow 45.0 -ThresholdHigh 95.0
