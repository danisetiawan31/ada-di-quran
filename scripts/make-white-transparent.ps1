Add-Type -AssemblyName System.Drawing

function Remove-WhiteBackground {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Threshold = 248
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

    # Flood fill atau boundary check dari 4 sudut luar agar bagian putih di DALAM buku tidak hilang
    # Menggunakan BFS flood fill dari sudut luar (0,0)
    $visited = New-Object bool[] ($width * $height)
    $queue = New-Object System.Collections.Generic.Queue[int]

    # Enqueue 4 sudut
    $c0 = 0
    $c1 = $width - 1
    $c2 = ($height - 1) * $width
    $c3 = $height * $width - 1
    foreach ($c in @($c0, $c1, $c2, $c3)) {
        $queue.Enqueue([int]$c)
        $visited[[int]$c] = $true
    }

    while ($queue.Count -gt 0) {
        $curr = $queue.Dequeue()
        $cx = $curr % $width
        $cy = [int]($curr / $width)
        $cidx = $curr * 4

        $b = $srcBytes[$cidx]
        $g = $srcBytes[$cidx + 1]
        $r = $srcBytes[$cidx + 2]

        # Jika pixel latar belakang putih luar
        if ($r -ge $Threshold -and $g -ge $Threshold -and $b -ge $Threshold) {
            # Tandai sebagai transparan luar
            $srcBytes[$cidx + 3] = 0

            # Cek tetangga 4-arah
            $neighbors = @(
                @($cx + 1, $cy),
                @($cx - 1, $cy),
                @($cx, $cy + 1),
                @($cx, $cy - 1)
            )

            foreach ($n in $neighbors) {
                $nx = $n[0]
                $ny = $n[1]
                if ($nx -ge 0 -and $nx -lt $width -and $ny -ge 0 -and $ny -lt $height) {
                    $npos = $ny * $width + $nx
                    if (-not $visited[$npos]) {
                        $visited[$npos] = $true
                        $queue.Enqueue($npos)
                    }
                }
            }
        }
    }

    # Salin pixel: jika alpha ditandai 0, jadikan transparan
    for ($i = 0; $i -lt $bytesCount; $i += 4) {
        if ($srcBytes[$i + 3] -eq 0) {
            $destBytes[$i] = 0
            $destBytes[$i + 1] = 0
            $destBytes[$i + 2] = 0
            $destBytes[$i + 3] = 0
        } else {
            $destBytes[$i] = $srcBytes[$i]
            $destBytes[$i + 1] = $srcBytes[$i + 1]
            $destBytes[$i + 2] = $srcBytes[$i + 2]
            $destBytes[$i + 3] = 255
        }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($destBytes, 0, $destData.Scan0, $bytesCount)

    $srcBmp.UnlockBits($srcData)
    $destBmp.UnlockBits($destData)
    $srcBmp.Dispose()

    $destBmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()

    Write-Host "Berhasil membuat transparent PNG dengan flood fill: $OutputPath"
}

Remove-WhiteBackground -InputPath "d:\Dokumen\yt\public\assets\global\logo_playful_3d_clay.jpg" -OutputPath "d:\Dokumen\yt\public\assets\global\logo_playful_3d_clay_transparent.png"
Remove-WhiteBackground -InputPath "d:\Dokumen\yt\public\assets\global\logo_playful_pop_vector_v2.jpg" -OutputPath "d:\Dokumen\yt\public\assets\global\logo_playful_pop_vector_transparent.png"
