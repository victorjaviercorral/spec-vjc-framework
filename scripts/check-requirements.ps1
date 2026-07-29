<#
.SYNOPSIS
    Verifica mecanicamente un artefacto requirements.md producido por /expand.

.DESCRIPTION
    Primer control EJECUTABLE del Spec VJC Framework (constitution D.16).
    Hasta ahora todas las reglas del framework eran prosa que un agente podia
    seguir o derivar. Este script convierte seis de ellas en codigo con codigo
    de salida, de modo que el agente no juzga: ejecuta y lee el resultado.

    Comprobaciones:
      C1  Toda lente cerrada tiene razon escrita          (predicion P-7)
      C2  Todo requisito tiene origen valido               (P-5, constitution A.2)
      C3  IDs de requisito unicos y bien formados
      C4  Clasificacion valida (v1 / v2 / descartado)
      C5  Densidad por capacidad ANTES y DESPUES del corte (P-1, P-2, P-3)
      C6  Todo criterio de aceptacion cita un R-nn existente (P-6)

    C5 es la que motiva este script: la ejecucion 1 del piloto reporto tres
    recuentos de densidad mal calculados de siete, y el corte se llevo el unico
    requisito de estado de dos capacidades sin que nada lo detectara.

.PARAMETER Path
    Ruta a requirements.md. Por defecto docs/02-spec/requirements.md.

.PARAMETER MinPorCapacidad
    Minimo de requisitos por capacidad de complejidad media. Por defecto 8.

.EXAMPLE
    .\check-requirements.ps1
    .\check-requirements.ps1 -Path docs/02-spec/requirements.md

.OUTPUTS
    Codigo de salida 0 si no hay fallos, 1 si hay al menos uno.
#>
[CmdletBinding()]
param(
    [string]$Path = "docs/02-spec/requirements.md",
    [int]$MinPorCapacidad = 8
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $Path)) {
    Write-Host "FALLO  El artefacto no existe: $Path" -ForegroundColor Red
    Write-Host "       Ejecuta /expand antes, o pasa -Path con la ruta correcta."
    exit 1
}

$lines = Get-Content -Path $Path -Encoding UTF8
$fallos = New-Object System.Collections.Generic.List[string]
$avisos = New-Object System.Collections.Generic.List[string]

function Get-Celdas {
    param([string]$Linea)
    $t = $Linea.Trim()
    if (-not $t.StartsWith('|')) { return $null }
    $t = $t.Trim('|')
    $celdas = $t -split '\|'
    return ($celdas | ForEach-Object { $_.Trim() })
}

function Test-Vacia {
    param([string]$Valor)
    if ([string]::IsNullOrWhiteSpace($Valor)) { return $true }
    if ($Valor -match '^[-—–\s]*$') { return $true }
    if ($Valor -match '^<.*>$') { return $true }
    return $false
}

# ---------- C1: lentes cerradas con razon ----------
# Tabla de activacion: | L1 Ciclo de vida | Etapa MVP | activa/cerrada | razon |
# Tabla de cierres:    | Capacidad | Lente | Razon del cierre |

$lentesCerradasSinRazon = 0
foreach ($l in $lines) {
    $c = Get-Celdas $l
    if ($null -eq $c) { continue }

    if ($c.Count -ge 4 -and $c[0] -match '^\*{0,2}L[1-7]\*{0,2}\s') {
        if ($c[2] -match 'cerrada' -and (Test-Vacia $c[3])) {
            $fallos.Add("C1  Lente '$($c[0])' marcada cerrada por eje sin razon escrita.")
            $lentesCerradasSinRazon++
        }
    }

    if ($c.Count -eq 3 -and $c[1] -match '^L[1-7]$' -and $c[0] -notmatch '^Capacidad$') {
        if (Test-Vacia $c[2]) {
            $fallos.Add("C1  Cierre por disparador '$($c[0]) / $($c[1])' sin razon escrita.")
            $lentesCerradasSinRazon++
        }
    }
}

# ---------- C2-C5: tabla de requisitos ----------
# | ID | Pl. | Requisito | Capacidad | Origen | Lente | Clasif. |

$reqs = @{}
$ordenIds = New-Object System.Collections.Generic.List[string]

# Origenes validos (constitution A.2, ampliada en v1.2.1):
#   E-n evidencia · RC-XX critico · C-n capacidad · A-n asuncion de hipotesis
#   AS-nn asuncion de diseno · ADR-nnn · Xn obligacion de exposicion · checklist
$patronOrigen = '(E-?\d+|RC-?\d+|\bC-?\d+|\bA-?\d+|AS-?\d+|ADR-?\d+|\bX[0-3]\b|checklist|constitution)'

foreach ($l in $lines) {
    $c = Get-Celdas $l
    if ($null -eq $c) { continue }
    if ($c.Count -lt 7) { continue }
    if ($c[0] -notmatch '^R-\d+$') { continue }

    $id = $c[0]
    $pl = $c[1]
    $cap = $c[3]
    $origen = $c[4]
    $clasif = $c[6]

    if ($reqs.ContainsKey($id)) {
        $fallos.Add("C3  ID duplicado: $id")
        continue
    }

    if ($pl -notmatch '^[1-6]$') {
        $fallos.Add("C3  $id  plantilla EARS invalida: '$pl' (debe ser 1-6).")
    }

    if (Test-Vacia $origen) {
        $fallos.Add("C2  $id  sin origen. Un requisito sin origen no se emite (constitution A.2).")
    }
    elseif ($origen -match '^\s*L[1-7](\s*,\s*L[1-7])*\s*$') {
        $fallos.Add("C2  $id  origen '$origen' es solo una lente. La lente es el generador, no la procedencia.")
    }
    elseif ($origen -notmatch $patronOrigen) {
        $fallos.Add("C2  $id  origen '$origen' no cita ninguna procedencia reconocible (E-n / RC-XX / C-n / A-n / AS-nn / ADR / Xn / checklist).")
    }

    $clasifNorm = ''
    if ($clasif -match '(?i)^v1$') { $clasifNorm = 'v1' }
    elseif ($clasif -match '(?i)^v2$') { $clasifNorm = 'v2' }
    elseif ($clasif -match '(?i)^desc') { $clasifNorm = 'descartado' }
    else {
        $fallos.Add("C4  $id  clasificacion invalida: '$clasif' (debe ser v1 / v2 / descartado).")
    }

    # Capacidades: "C1", "C1, C2", "C1-C7"
    $caps = New-Object System.Collections.Generic.List[string]
    if ($cap -match '^C(\d+)\s*[-–—]\s*C(\d+)$') {
        $desde = [int]$Matches[1]; $hasta = [int]$Matches[2]
        for ($i = $desde; $i -le $hasta; $i++) { $caps.Add("C$i") }
    }
    else {
        foreach ($p in ($cap -split ',')) {
            $p = $p.Trim()
            if ($p -match '^C\d+$') { $caps.Add($p) }
        }
    }
    if ($caps.Count -eq 0) {
        $avisos.Add("C5  $id  sin capacidad asignada ('$cap'): no cuenta para ninguna densidad.")
    }

    $reqs[$id] = [pscustomobject]@{
        Id = $id; Plantilla = $pl; Capacidades = $caps; Clasificacion = $clasifNorm
    }
    $ordenIds.Add($id)
}

if ($reqs.Count -eq 0) {
    $fallos.Add("C2  No se encontro ninguna fila de requisito con formato '| R-nn | Pl. | ... |'.")
}

# ---------- C5: densidad antes y despues del corte ----------

$capacidades = @{}
foreach ($r in $reqs.Values) {
    foreach ($cp in $r.Capacidades) {
        if (-not $capacidades.ContainsKey($cp)) {
            $capacidades[$cp] = [pscustomobject]@{
                Total = 0; T5 = 0; T36 = 0; V1 = 0; V1T5 = 0; V1T36 = 0
            }
        }
        $x = $capacidades[$cp]
        $x.Total++
        if ($r.Plantilla -eq '5') { $x.T5++ }
        if ($r.Plantilla -eq '3' -or $r.Plantilla -eq '6') { $x.T36++ }
        if ($r.Clasificacion -eq 'v1') {
            $x.V1++
            if ($r.Plantilla -eq '5') { $x.V1T5++ }
            if ($r.Plantilla -eq '3' -or $r.Plantilla -eq '6') { $x.V1T36++ }
        }
    }
}

$tabla = New-Object System.Collections.Generic.List[object]
foreach ($k in ($capacidades.Keys | Sort-Object { [int]($_ -replace '\D', '') })) {
    $x = $capacidades[$k]
    $tabla.Add([pscustomobject]@{
        Capacidad = $k
        Total = $x.Total; 'Pl5' = $x.T5; 'Pl3/6' = $x.T36
        'v1' = $x.V1; 'v1-Pl5' = $x.V1T5; 'v1-Pl3/6' = $x.V1T36
    })

    # El juicio de "complejidad media" es humano; el script solo avisa.
    if ($x.Total -lt $MinPorCapacidad) {
        $avisos.Add("C5  $k  $($x.Total) requisitos (< $MinPorCapacidad). Correcto si la capacidad esta por debajo del umbral de complejidad; declaralo por escrito si lo esta.")
    }
    else {
        if ($x.T5 -lt 2) {
            $fallos.Add("C5  $k  con $($x.Total) requisitos solo tiene $($x.T5) de plantilla 5 (minimo 2).")
        }
        if ($x.T36 -lt 1) {
            $fallos.Add("C5  $k  con $($x.Total) requisitos no tiene ninguno de plantilla 3 o 6 (minimo 1).")
        }
        # El hallazgo 8.2 del piloto: la composicion se cumplia antes del corte
        # y el corte se llevaba el unico requisito de estado.
        if ($x.T36 -ge 1 -and $x.V1T36 -lt 1) {
            $fallos.Add("C5  $k  cumple la composicion en bruto pero el corte deja v1 SIN ningun requisito de estado (plantilla 3 o 6). Reconsidera el corte o declaralo por escrito.")
        }
        if ($x.T5 -ge 2 -and $x.V1T5 -lt 2) {
            $fallos.Add("C5  $k  cumple plantilla 5 en bruto pero v1 solo conserva $($x.V1T5) (minimo 2).")
        }
    }
}

# ---------- C6: criterios de aceptacion ----------
# | AC-01.1 | Dado ... | R-nn |

$acTotal = 0
foreach ($l in $lines) {
    $c = Get-Celdas $l
    if ($null -eq $c) { continue }
    if ($c.Count -lt 3) { continue }
    if ($c[0] -notmatch '^AC-[\d.]+$') { continue }

    $acTotal++
    $citas = $c[$c.Count - 1]

    if (Test-Vacia $citas) {
        $fallos.Add("C6  $($c[0])  sin requisito detras. Un AC sin R-nn es un defecto.")
        continue
    }

    $encontrados = [regex]::Matches($citas, 'R-\d+')
    if ($encontrados.Count -eq 0) {
        $fallos.Add("C6  $($c[0])  su columna de requisitos no cita ningun R-nn: '$citas'.")
        continue
    }
    foreach ($m in $encontrados) {
        if (-not $reqs.ContainsKey($m.Value)) {
            $fallos.Add("C6  $($c[0])  cita $($m.Value), que no existe en la tabla de requisitos.")
        }
    }
}
if ($acTotal -eq 0) {
    $avisos.Add("C6  No se encontro ningun criterio de aceptacion 'AC-nn.n'. Correcto solo si no hay historias todavia.")
}

# ---------- Informe ----------

Write-Host ""
Write-Host "check-requirements  ·  $Path" -ForegroundColor Cyan
Write-Host ("-" * 72)
$nV1 = 0; $nV2 = 0; $nDesc = 0
foreach ($r in $reqs.Values) {
    if ($r.Clasificacion -eq 'v1') { $nV1++ }
    elseif ($r.Clasificacion -eq 'v2') { $nV2++ }
    elseif ($r.Clasificacion -eq 'descartado') { $nDesc++ }
}
$nTotal = $reqs.Count
$nCaps = $capacidades.Count
Write-Host "Requisitos: $nTotal   ·   v1: $nV1   ·   v2: $nV2   ·   descartados: $nDesc"
Write-Host "Criterios de aceptacion: $acTotal   ·   Capacidades cubiertas: $nCaps"
Write-Host ""
Write-Host "Densidad por capacidad (bruto y despues del corte):" -ForegroundColor Cyan
$tabla | Format-Table -AutoSize | Out-String | Write-Host

if ($avisos.Count -gt 0) {
    Write-Host "AVISOS ($($avisos.Count)) — requieren juicio humano, no bloquean:" -ForegroundColor Yellow
    foreach ($a in $avisos) { Write-Host "  $a" -ForegroundColor Yellow }
    Write-Host ""
}

if ($fallos.Count -gt 0) {
    Write-Host "FALLOS ($($fallos.Count)):" -ForegroundColor Red
    foreach ($f in $fallos) { Write-Host "  $f" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Resultado: FALLO" -ForegroundColor Red
    exit 1
}

Write-Host "Resultado: OK — las seis comprobaciones pasan." -ForegroundColor Green
exit 0
