Add-Type -AssemblyName System.Drawing

function Convert-WhiteToTransparent {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Threshold = 245
    )

    $srcBmp = [System.Drawing.Bitmap]::FromFile($InputPath)
    $w = $srcBmp.Width
    $h = $srcBmp.Height

    $destBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $srcData = $srcBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $destData = $destBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $bytesCount = [Math]::Abs($srcData.Stride) * $h
    $srcBytes = New-Object byte[] $bytesCount
    $destBytes = New-Object byte[] $bytesCount

    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBytes, 0, $bytesCount)

    # BFS Flood fill dari luar
    $visited = New-Object bool[] ($w * $h)
    $queue = New-Object System.Collections.Generic.Queue[int]

    # Tambahkan seluruh pixel di border 4 sisi (x=0, x=w-1, y=0, y=h-1)
    for ($x = 0; $x -lt $w; $x++) {
        $top = $x
        $bottom = ($h - 1) * $w + $x
        $queue.Enqueue($top); $visited[$top] = $true
        $queue.Enqueue($bottom); $visited[$bottom] = $true
    }
    for ($y = 0; $y -lt $h; $y++) {
        $left = $y * $w
        $right = $y * $w + ($w - 1)
        if (-not $visited[$left]) { $queue.Enqueue($left); $visited[$left] = $true }
        if (-not $visited[$right]) { $queue.Enqueue($right); $visited[$right] = $true }
    }

    $isOuterBg = New-Object bool[] ($w * $h)

    while ($queue.Count -gt 0) {
        $pos = $queue.Dequeue()
        $px = $pos % $w
        $py = [Math]::Floor($pos / $w)
        $idx = $pos * 4

        $b = [int]$srcBytes[$idx]
        $g = [int]$srcBytes[$idx + 1]
        $r = [int]$srcBytes[$idx + 2]

        # Jika pixel putih/terang luar
        if ($r -ge $Threshold -and $g -ge $Threshold -and $b -ge $Threshold) {
            $isOuterBg[$pos] = $true

            # Periksa 4 tetangga
            $tx = @($px + 1, $px - 1, $px, $px)
            $ty = @($py, $py, $py + 1, $py - 1)

            for ($k = 0; $k -lt 4; $k++) {
                $nx = $tx[$k]
                $ny = $ty[$k]
                if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                    $npos = $ny * $w + $nx
                    if (-not $visited[$npos]) {
                        $visited[$npos] = $true
                        $queue.Enqueue($npos)
                    }
                }
            }
        }
    }

    for ($pos = 0; $pos -lt ($w * $h); $pos++) {
        $idx = $pos * 4
        if ($isOuterBg[$pos]) {
            $destBytes[$idx] = 0
            $destBytes[$idx + 1] = 0
            $destBytes[$idx + 2] = 0
            $destBytes[$idx + 3] = 0
        } else {
            $destBytes[$idx] = $srcBytes[$idx]
            $destBytes[$idx + 1] = $srcBytes[$idx + 1]
            $destBytes[$idx + 2] = $srcBytes[$idx + 2]
            $destBytes[$idx + 3] = 255
        }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($destBytes, 0, $destData.Scan0, $bytesCount)

    $srcBmp.UnlockBits($srcData)
    $destBmp.UnlockBits($destData)
    $srcBmp.Dispose()

    $destBmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()

    Write-Host "Success: $OutputPath"
}

Convert-WhiteToTransparent -InputPath "d:\Dokumen\yt\public\assets\global\logo_playful_3d_clay.jpg" -OutputPath "d:\Dokumen\yt\public\assets\global\logo_playful_3d_clay_transparent.png"
Convert-WhiteToTransparent -InputPath "d:\Dokumen\yt\public\assets\global\logo_playful_pop_vector_v2.jpg" -OutputPath "d:\Dokumen\yt\public\assets\global\logo_playful_pop_vector_transparent.png"
