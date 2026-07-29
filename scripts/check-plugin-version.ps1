<#
.SYNOPSIS
    Verifica que la version del plugin esta sincronizada entre sus tres fuentes.

.DESCRIPTION
    Existen tres archivos que declaran la version de este framework como plugin:
    .claude-plugin/plugin.json, .claude-plugin/marketplace.json (campo version
    de la entrada del plugin) y la cabecera mas reciente de CHANGELOG.md.

    El campo version de plugin.json es lo que dispara que Claude Code regenere
    la cache instalada (~/.claude/plugins/cache/.../<version>/) cuando alguien
    ejecuta /plugin update. Si ese campo no se toca en un commit que si cambio
    comandos o constitution, el push llega a origin/main pero ninguna sesion
    que cargue el plugin via marketplace vera el cambio: seguira ejecutando la
    version vieja de la cache, en silencio, indefinidamente.

    Este script no arregla eso por si solo (la sincronizacion del clon de
    marketplace y el reinstalado de la cache siguen siendo pasos manuales,
    ver README.md "Instalacion"), pero convierte en imposible el error que lo
    origina: olvidar subir el numero de version. Penso para ejecutarse como
    git hook pre-push (ver scripts/git-hooks/pre-push) y a mano antes de un
    commit de version.

.OUTPUTS
    Codigo de salida 0 si las tres fuentes coinciden, 1 si hay al menos un
    desajuste o un archivo no se pudo leer/parsear.
#>
[CmdletBinding()]
param(
    [string]$RepoRoot = (Resolve-Path "$PSScriptRoot/..").Path
)

$fallos = New-Object System.Collections.Generic.List[string]

$pluginPath = Join-Path $RepoRoot ".claude-plugin/plugin.json"
$marketplacePath = Join-Path $RepoRoot ".claude-plugin/marketplace.json"
$changelogPath = Join-Path $RepoRoot "CHANGELOG.md"

function Get-JsonVersion {
    param([string]$Path, [string]$JsonPath)
    if (-not (Test-Path $Path)) {
        $fallos.Add("No existe: $Path")
        return $null
    }
    try {
        $json = Get-Content $Path -Raw | ConvertFrom-Json
    } catch {
        $fallos.Add("$Path no es JSON valido: $($_.Exception.Message)")
        return $null
    }
    if ($JsonPath -eq "plugin") {
        return $json.version
    } else {
        return $json.plugins[0].version
    }
}

$verPlugin = Get-JsonVersion -Path $pluginPath -JsonPath "plugin"
$verMarketplace = Get-JsonVersion -Path $marketplacePath -JsonPath "marketplace"

$verChangelog = $null
if (-not (Test-Path $changelogPath)) {
    $fallos.Add("No existe: $changelogPath")
} else {
    $primeraCabecera = Get-Content $changelogPath | Where-Object { $_ -match '^\s*##\s*\[(\d+\.\d+\.\d+)\]' } | Select-Object -First 1
    if (-not $primeraCabecera) {
        $fallos.Add("CHANGELOG.md no tiene ninguna cabecera '## [x.y.z]'")
    } else {
        $verChangelog = [regex]::Match($primeraCabecera, '\[(\d+\.\d+\.\d+)\]').Groups[1].Value
    }
}

if ($verPlugin -and $verMarketplace -and $verChangelog) {
    $unicas = @($verPlugin, $verMarketplace, $verChangelog) | Select-Object -Unique
    if ($unicas.Count -gt 1) {
        $fallos.Add("Version desincronizada: plugin.json=$verPlugin · marketplace.json=$verMarketplace · CHANGELOG.md=$verChangelog")
        $fallos.Add("El campo que dispara la cache de Claude Code es plugin.json. Si CHANGELOG.md ya subio de version y plugin.json no, cualquier sesion que cargue el plugin por marketplace seguira ejecutando la version vieja aunque origin/main este al dia.")
    }
}

if ($fallos.Count -gt 0) {
    Write-Host "check-plugin-version: FALLO" -ForegroundColor Red
    foreach ($f in $fallos) { Write-Host "  - $f" -ForegroundColor Red }
    exit 1
}

Write-Host "check-plugin-version: OK — plugin.json, marketplace.json y CHANGELOG.md coinciden en $verPlugin" -ForegroundColor Green
exit 0
