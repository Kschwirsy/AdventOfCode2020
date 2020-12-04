$y = 0
$map=@{}

# Build Tree Map
foreach($line in Get-Content AdventOfCode2020\Day3\input.txt) {
    $map[$y] = $line.ToCharArray()
    $y++
}

# Get height of hill and width of the map for rollover
$xMax = $map[0].Count
$yMax = $map.Count-1

# Set up to ride
$hits = 0
$lat = 0

# Down we go
for ($long = 0; $long -le $yMax; $long++) {
    if($map[$long][$lat % $xMax] -eq '#') {
        $map[$long][$lat % $xMax] = 'X'
        $hits++
    } else {
        $map[$long][$lat % $xMax] = 'O'
    }

    # Shift 3 over for the next line
    $lat+=3
    Write-Host("{2} | {1} | {0}" -f ($long+1), ($map[$long]-join ""), $hits)
}

# Write-Host $hits