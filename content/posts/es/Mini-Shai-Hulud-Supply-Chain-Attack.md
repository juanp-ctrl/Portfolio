---
slug: mini-shai-hulud-supply-chain-attack
title: 'Mini Shai-Hulud: ataque a la cadena de suministro'
excerpt: "El 11 de mayo apareció este gusano en el repo tanstack/router, publicando 84 versiones maliciosas en 42 paquetes @tanstack/*. El atacante nunca robó una contraseña de npm. Encadenó tres vulnerabilidades conocidas para publicar bajo la tan confiable identidad de TanStack con procedencia válida SLSA Build Level 3."
date: '2026-05-13'
readingTime: 12
tags: ['Github-Actions', 'NPM', 'Supply-Chain', 'Tanstack']
category: 'Seguridad'
coverImage: '/images/blog/mini-shai-hulud-supply-chain-attack/cover.webp'
---

## 1. ¿Qué es Shai-Hulud?

**Shai-Hulud** son los gusanos de arena gigantes de _Dune_, de Frank Herbert: criaturas masivas, casi indestructibles, que cavan bajo la arena. Los atacantes (**TeamPCP**) nombraron su malware así porque es un **gusano**: software autorreplicante que se propaga automáticamente de un paquete infectado al siguiente a través de las tuberías de CI/CD.

La campaña está saturada de referencias a Dune. Las ramas _dead-drop_ usan nombres como `atreides`, `fremen`, `sardaukar`, `melange`, `sandworm`, `tleilaxu`. En los repositorios marcadores dice: _"A Mini Shai-Hulud has Appeared."_

> [!info] ¿Quién es TeamPCP? Es el grupo de amenazas detrás de Shai-Hulud. Atribuido por Wiz con alta confianza. También se le rastrea como **DeadCatx3, PCPcat, ShellForce, CipherForce**. Antes comprometió Trivy (marzo de 2026), Bitwarden CLI (abril de 2026) y paquetes de SAP. El malware omite sistemas en idioma ruso y tiene una rutina destructiva `rm -rf /` con probabilidad 1 entre 6 en sistemas israelíes/iraníes.

---

## 2. Panorama del ataque

El **11 de mayo de 2026**, entre 19:20 y 19:26 UTC, un atacante publicó **84 versiones maliciosas** en **42 paquetes `@tanstack/*`**. Solo `@tanstack/react-router` tiene más de 12 M de descargas semanales. El atacante **nunca robó una contraseña de npm**. Encadenó tres vulnerabilidades conocidas para publicar bajo la identidad de confianza de TanStack con **procedencia válida SLSA Build Level 3**.

> [!note] ¿Qué es SLSA? “Salsa” = Supply-chain Levels for Software Artifacts (niveles de la cadena de suministro para artefactos de software). El nivel 3 significa que el _build_ se ejecutó en infraestructura endurecida con procedencia firmada. Los paquetes maliciosos tenían L3 válido porque **sí** fueron construidos por la tubería real **con entradas envenenadas**. SLSA demuestra **quién** lo construyó, no si las entradas estaban limpias.

### Flujo del ataque

```
[PASO 1] PR malicioso           [PASO 2] Envenenamiento de caché  [PASO 3] Robo de token OIDC
pull_request_target ejecuta  →  1,1 GB de pnpm store envenenado →  volcado de /proc/pid/mem    →  💀 PUBLICACIÓN
código del fork en contexto base  guardado en caché del repo base  extracción del JWT OIDC           84 versiones maliciosas
                                                                                                     Procedencia SLSA L3 válida
                                                                                                     → el gusano se propaga más
```

**Qué detonó la explosión:** un mantenedor fusiona un PR legítimo → _push_ a `main` → `release.yml` restaura la caché **envenenada** del paso 2. El PR del atacante ya estaba cerrado y borrado en ese momento.

---

## 3. La cadena de ataque en 3 partes

### Parte 1 El `pull_request_target` como “pwn request”

#### ¿Dónde se ejecutan los flujos de GitHub Actions?

En un **runner alojado por GitHub** (una VM Ubuntu nueva en la nube de GitHub, en Azure). Cada ejecución obtiene una VM limpia que se destruye después. Tiene sistema de archivos, red, variables de entorno con tokens y un proceso `Runner.Worker`.

#### ¿Qué es `pull_request_target` y por qué existe?

Sirve para operaciones que necesitan permisos del repositorio base en PRs desde _forks_, como **añadir etiquetas** o **publicar comentarios**. El disparador normal `pull_request` no puede hacerlo porque corre en el contexto del fork.

**Ejemplos de uso seguro:**

```yaml
# SEGURO: etiquetado automático según rutas (sin checkout del código del fork)
on: pull_request_target
jobs:
  label:
    steps:
      - uses: actions/labeler@v5  # solo lee rutas desde la API de GitHub

# SEGURO: comentario fijo con resultados de benchmark
jobs:
  comment:
    steps:
      - uses: marocchino/sticky-pull-request-comment@v2
        with:
          message: "Bundle size: 42kb (no regression)"
          # lee de un artefacto previo; nunca hace checkout ni ejecuta código del fork
```

**El peligro:** combinar `pull_request_target` con **hacer checkout del fork y ejecutar su código**. Eso es lo que hacía `bundle-size.yml` de TanStack:

```yaml
# bundle-size.yml VULNERABLE (antes del arreglo)
on:
  pull_request_target: # ← privilegios del repo base
    paths: ['packages/**', 'benchmarks/**']
jobs:
  benchmark-pr:
    steps:
      - uses: actions/checkout@v6.0.2
        with:
          ref: refs/pull/${{ github.event.pull_request.number }}/merge
          # ↑ HACE CHECKOUT DEL CÓDIGO DEL FORK
      - uses:
          TanStack/config/.github/setup@main
          # ↑ llama transitivamente a actions/cache@v5
      - run:
          pnpm nx run @benchmarks/bundle-size:build
          # ↑ EJECUTA código del fork con alcance de caché del repo base
```

| Disparador              | Contexto   | ¿Secretos del base? | ¿Escritura en caché del base? |
| ----------------------- | ---------- | ------------------- | ------------------------------ |
| `pull_request`          | Fork       | NO                  | NO                             |
| `pull_request_target` | Repo base  | SÍ                  | SÍ                             |

#### Acciones exactas del atacante (detalle completo)

**Cuenta 1 `zblgg`** (id 127806521) — el operador:

1. **10 may, 17:16 UTC**: Hizo fork de `TanStack/router` y lo renombró a `zblgg/configuration` para evitar búsquedas en la lista de forks.
2. **10 may, 23:29**: Empujó el commit malicioso `65bf499d` con una carga de unas ~30.000 líneas (`vite_setup.mjs`, [desofuscado aquí](https://gist.github.com/jonchurch/35e88271d58ebc631096bfc90bef53a9)) usando identidad fabricada: `claude <claude@users.noreply.github.com>`. Mensaje de commit con prefijo `[skip ci]`.
3. **11 may, ~10:49**: Abrió el [PR #7378](https://github.com/TanStack/router/pull/7378) titulado "WIP: simplify history build."
4. **11:01–11:11**: Varios _force-push_, cada uno disparando flujos `pull_request_target`. No hacía falta aprobación: la barrera se saltaba.
5. **11:11**: Un _force-push_ deja el commit malicioso. `bundle-size.yml` ejecuta la carga. **Caché envenenada.**
6. **11:31**: _Force-push_ del PR para alinearlo con `main` (0 archivos cambiados). Cierra el PR y borra la rama. **Por eso el [PR #7378 parece vacío](https://github.com/TanStack/router/pull/7378).**

**Cuenta 2 `voicproducoes`** (id 269549300) — aloja la carga:

Es autora del commit huérfano (`79ac49eedf`) referenciado en las `optionalDependencies` maliciosas. Contiene dos archivos: un `package.json` con `"prepare": "bun run tanstack_runner.js && exit 1"` y el ladrón de credenciales `tanstack_runner.js`. Los repos públicos incluyen _"A Mini Shai-Hulud has Appeared"_ — probablemente una cuenta de medios portuguesa comprometida.

---

### Parte 2 Envenenamiento de la caché de GitHub Actions

#### ¿Qué es la caché de GitHub Actions?

Los flujos guardan carpetas (como la tienda de pnpm) con una clave tipo `Linux-pnpm-store-<hash>`. En la siguiente ejecución, esa clave restaura los archivos en caché al instante. El fallo: **el alcance de la caché es por repositorio y se comparte entre ejecuciones `pull_request_target` y _pushes_ a `main`**. Poner `permissions: contents: read` **no** bloquea escrituras en caché: `actions/cache@v5` usa su propio token interno.

```
[bundle-size.yml]              [Caché GitHub]            [release.yml]
(pull_request_target)       Alcance: TanStack/router    (push legítimo a main)
                            refs/heads/main
1. Checkout del FORK   →
2. pnpm install             🔴 1,1 GB ENVENENADOS  →   1. Restaura caché ← ENVENENO
3. Malware envenena            SAVE                      2. Corre código malicioso
   la tienda pnpm                                           3. Extrae OIDC → publica
                                                            RESTORE
               ⏱ ~8 HORAS DE BRECHA
   PR cerrado ~11:31 UTC · Release ~19:15 UTC
   El veneno en caché persiste en silencio todo ese tiempo

CLAVE: ambos flujos comparten el mismo alcance porque
pull_request_target corre en el contexto del repo BASE, no del fork
```

#### Cómo `vite_setup.mjs` envenenó la caché — el mecanismo exacto

> [!tip] Profundización Esta sección explica la mecánica a nivel de sistema de archivos del envenenamiento de caché, más allá de lo que describe el postmortem.

La frase clave del postmortem de Tanner: _“El `vite_setup.mjs` malicioso estaba diseñado para escribir datos en el directorio pnpm-store bajo una clave que el flujo legítimo `release.yml` calcularía y buscaría: `Linux-pnpm-store-${hashFiles('**/pnpm-lock.yaml')}`.”_

**¿Qué es la tienda pnpm?**

pnpm usa una tienda direccionable por contenido: un directorio global (típicamente `~/.local/share/pnpm/store/v3/`) donde cada versión de paquete se guarda una sola vez, identificada por _hash_. Al ejecutar `pnpm install`, pnpm no copia paquetes a `node_modules`: **los hard-linkea** desde la tienda. En GitHub Actions, esa tienda se cachea entre ejecuciones para no volver a descargarlo todo.

**Qué hizo `vite_setup.mjs`**

El archivo estaba en `packages/history/vite_setup.mjs`: una carga JS empaquetada de unas ~30.000 líneas en el fork del atacante. Cuando `bundle-size.yml` ejecutó `pnpm nx run @benchmarks/bundle-size:build`, corrió el código del fork, que incluía este archivo.

`vite_setup.mjs` no “instaló” un paquete npm troyanizado al modo tradicional: **escribió binarios maliciosos directamente en el directorio de la tienda pnpm** del sistema de archivos del runner. La tienda pnpm es solo una carpeta llena de archivos organizados por _hash_ de contenido. El malware sustituyó o inyectó entradas en esa carpeta para que, al restaurar la tienda con `actions/cache@v5`, esos archivos maliciosos estuvieran en disco y se invocaran durante el _build_.

La entrada de caché se guardó como `Linux-pnpm-store-6f9233a50def742c09fde54f56553d6b449a535adf87d4083690539f49ae4da11` (1,1 GB) en la caché de Actions para `TanStack/router`, con alcance `refs/heads/main`, es decir **calculada para coincidir exactamente con lo que `release.yml` buscaría en el siguiente push**.

**Por qué no se podía bloquear `actions/cache@v5`**

El postmortem de TanStack explica que el guardado post-trabajo de `actions/cache@v5` usa un **token interno del runner**, no el `GITHUB_TOKEN` del flujo, así que `permissions: contents: read` **no** impide mutar la caché. Es un vacío de diseño crítico en GitHub Actions: el autor del flujo creía tener permisos aislados, pero las escrituras en caché operan en otro plano de autenticación.

**Qué pasó al restaurar la caché**

Cuando `release.yml` corrió tras un push a `main`, el paso de configuración restauró la entrada envenenada. Entonces la tienda pnpm del runner contenía archivos controlados por el atacante. Durante el paso de _build_ (`pnpm install` + _build_), esos archivos se enlazaron a `node_modules` y se ejecutaron. El código malicioso usó un script en Python que **lee la memoria del proceso `GitHub Actions Runner.Worker` vía `/proc/{pid}/mem`**, apuntando a objetos JSON que coinciden con `{"value":"...","isSecret":true}` para extraer todos los secretos del flujo.

**Árbol de procesos en tiempo de ejecución (análisis StepSecurity):**

```
npm install (PID 2332)
└─ node npm-cli.js install --force (PID 2343)
   ├─ sh -c "node install.js" (PID 2355)        # instala Bun en silencio
   │  └─ node install.js (PID 2356)
   └─ sh -c "bun run opensearch_init.js" (PID 2364)  # ejecuta la carga del gusano
      └─ bun.exe opensearch_init.js (PID 2365)
         ├─ gh auth token (PID 2378)             # roba el token de GitHub
         └─ sudo python3 | tr | grep | sort      # raspa la memoria del Runner.Worker
            └─ python3 lee /proc/2138/mem
```

**¿Se troyanizaron paquetes concretos dentro de la tienda?**

Esto no está del todo público. El postmortem dice que `vite_setup.mjs` “escribe datos en el directorio pnpm-store”, pero no enumera qué entradas de paquete se reemplazaron. Dos enfoques plausibles:

- **Enfoque A Reemplazar la entrada de un paquete existente:** Sobrescribir el contenido en caché de un paquete que `release.yml` seguramente restauraría y `require()` en su paso de _build_ (como `@tanstack/config`). Es el más limpio.
- **Enfoque B Añadir una entrada nueva y modificar el _hash_ del lockfile:** Inyectar un módulo nuevo en la tienda y mantener la misma clave de caché. Como la clave es `Linux-pnpm-store-${hashFiles('**/pnpm-lock.yaml')}`, el atacante solo necesitaba que **el hash del lockfile siguiera igual**, cosa fácil si solo se altera el contenido de la tienda y no el lockfile.

> [!info] Pregunta abierta del postmortem: “¿La caché npm también se envenenó (las 6 entradas duplicadas `linux-npm-store-*`)? ¿Alguna se usó de verdad?” Ni el equipo de TanStack había auditado cada entrada de caché al publicar.

**URLs de la segunda etapa (IOCs):**

- `https://litter.catbox.moe/h8nc9u.js`
- `https://litter.catbox.moe/7rrc6l.mjs`

La tienda envenenada contenía entradas que descargaban estas cargas adicionales desde URLs anónimas de intercambio de archivos durante la fase de _build_.

> [!abstract] La analogía de la farmacia Piénsalo así: alguien entra en el almacén de una farmacia (la tienda pnpm), cambia algunos frascos en los estantes y se va. Horas después, el farmacéutico legítimo (`release.yml`) entra, toma frascos de los mismos estantes (restauración de caché) y los reparte (`npm publish`) sin saber que fueron manipulados.

---

### Parte 3 Extracción del token OIDC desde la memoria del runner

**OIDC:** le dices a npm _“confía en publicaciones desde `TanStack/router`, flujo `release.yml`, rama `main`.”_ El runner emite un JWT de corta duración; npm verifica y publica. No hace falta guardar contraseña. Pero el token vive en la memoria del proceso del runner porque está `id-token: write`.

El malware leyó `/proc/<pid>/mem` del proceso `Runner.Worker`, buscando `{"value":"...","isSecret":true}` para extraer el token, y luego hizo POST directo a npm. La [ejecución del flujo muestra “failure”](https://github.com/TanStack/router/actions/runs/25613093674/job/75429692202#step:26:2) porque los tests fallaron, pero el malware ya había publicado.

---

## 4. Qué hace el malware

La carga usa dos vectores de infección: un `router_init.js` (~2,3 MB, ofuscado) dentro del tarball y una `optionalDependencies` cuyo _hook_ `prepare` ejecuta `bun run tanstack_runner.js && exit 1`. Bun se usa porque **no intercepta los ganchos de seguridad** como Node.js. El `exit 1` hace que la dependencia opcional “falle” en silencio, casi sin rastro.

**Cuatro capacidades:**

1. **Robo de credenciales** GitHub, AWS IMDSv2, K8s, Vault, SSH, npm, más de 100 rutas de archivo.
2. **Exfiltración** vía red P2P Session (`filev2.getsession.org`), `git-tanstack.com` (dominio _typosquatting_ del atacante) y _dead-drops_ de la API de GitHub con nombres de ramas al estilo Dune.
3. **Autopropagación** encuentra paquetes de la víctima vía API de npm y republica todos con la carga.
4. **Persistencia** `.claude/settings.json`, `.vscode/tasks.json`, demonio `gh-token-monitor` vía systemd/LaunchAgent. El demonio consulta GitHub cada 60 s; **si revocan un token, ejecuta `rm -rf ~/`**.

---

## 5. Cómo se infectaron proyectos aguas abajo

**Escenario A Rangos de versión flexibles**

En muchos proyectos: `"@tanstack/react-router": "^1.169.0"`. Al ejecutar `npm install` se resuelve al último compatible, que durante ~6 minutos fue la versión infectada. Incluso con lockfile, `npm install @tanstack/react-router` trae la última.

**Escenario B CI con `npm ci`**

Si usas `npm ci` (instala exactamente desde el lockfile), NO te afecta salvo que el lockfile ya apuntara a una versión maliciosa. Pero muchas tuberías usan `npm install`.

**Escenario C Autopropagación del gusano**

El malware consulta `registry.npmjs.org/-/v1/search?text=maintainer:<user>` y vuelve a publicar **todos** los paquetes de ese usuario con la carga. Así llegó a `@uipath` (66 paquetes, RPA empresarial), `@mistralai` (cliente Mistral AI), `@squawk` (herramientas PostgreSQL), `@tallyui` y **más de 170 en total**.

---

## 6. Detección: ¿me afectó?

### Línea de tiempo

| Hora (UTC)      | Evento                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| 19:20           | Publicadas 84 versiones maliciosas                                                                       |
| ~19:26 (6 min)  | Socket.dev AI Scanner marca las 84                                                                       |
| ~19:40 (20 min) | StepSecurity Feed detecta la anomalía                                                                      |
| ~19:50 (30 min) | ashishkurmi abre el [Issue #7383](https://github.com/TanStack/router/issues/7383#issuecomment-4426008454) |
| ~21:00          | Las 84 versiones quedan deprecadas. Divulgación pública.                                                 |

### Ejecuta estos comandos ya

```bash
# 1. Buscar el archivo de carga inyectado
find node_modules -name "router_init.js" -type f 2>/dev/null

# 2. Buscar la optionalDependency maliciosa
grep -r "@tanstack/setup" node_modules/*/package.json 2>/dev/null

# 3. Comprobar el hash del commit comprometido
find node_modules/@tanstack -name "package.json" | \
  xargs grep -l "voicproducoes\|79ac49eedf"

# 4. Comprobación por hash (SHA256 malicioso):
# ab4fcadaec49c03278063dd269ea5eef82d24f2124a8e15d7b90f2fa8601266c
find node_modules -name "router_init.js" -exec shasum -a 256 {} \;

# 5. Buscar persistencia en tu máquina
find ~ -path '*/.claude/setup.mjs' -o -path '*/.vscode/setup.mjs'
find ~ -name 'router_runtime.js'
find ~/.config -name '*gh-token-monitor*'
find /tmp -name 'tmp.ts018051808.lock'
ps aux | grep -E 'tanstack_runner|router_runtime|gh-token-monitor|bun'
```

> [!danger] Si estás comprometido: desactiva primero el “dead man's switch” El demonio ejecuta `rm -rf ~/` si detecta un token revocado. **Desactívalo antes de revocar nada.**
>
> ```bash
> # Linux
> systemctl --user stop gh-token-monitor.service 2>/dev/null
> systemctl --user disable gh-token-monitor.service 2>/dev/null
> rm -f ~/.config/systemd/user/gh-token-monitor.service
>
> # macOS
> launchctl unload ~/Library/LaunchAgents/com.user.gh-token-monitor.plist 2>/dev/null
> rm -f ~/Library/LaunchAgents/com.user.gh-token-monitor.plist
> ```

O usa la herramienta automática:

```bash
git clone https://github.com/champjss/mini-shai-hulud-checker-20260512.git
cd mini-shai-hulud-checker-20260512
node dist/cli.js check-project /path/to/your-project
node dist/cli.js check-global
```

---

## 7. El arreglo de Tanner

Tanner Linsley fusionó dos commits de endurecimiento al instante:

### Arreglo 1: `pull_request_target` → `pull_request`

```yaml
# Commit 5d92d5a por tannerlinsley
  name: Bundle Size
  on:
-   # We use `pull_request_target` to split trust boundaries across jobs:
+   # We use `pull_request` to split trust boundaries across jobs:
    pull_request:

  jobs:
    benchmark-pr:
-     if: github.event_name == 'pull_request_target'
+     if: github.event_name == 'pull_request'
```

**Qué cambia en el proceso del PR:**

1. **Los PR desde fork corren en el contexto del fork** — no pueden escribir en la caché del base ni acceder a secretos del base.
2. **El trabajo de comentario necesita dos flujos.** Como `pull_request` no puede escribir comentarios directamente en el PR, el benchmark guarda resultados como artefacto. Un trabajo disparado por `workflow_run` lee el artefacto y publica el comentario. Más complejo, pero elimina la violación de confianza.
3. **Los contribuidores nuevos requieren aprobación** antes de correr flujos: la barrera que `pull_request_target` saltaba.

### Arreglo 2: Fijar todas las acciones a SHA

```yaml
# Commit bb5f3cc por renovate[bot] chore(deps): pin dependencies (#7388)
# Aplicado en los 7 archivos de flujo:
-     uses: actions/checkout@v6.0.2
+     uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2
-     uses: TanStack/config/.github/setup@main
+     uses: TanStack/config/.github/setup@e4b48f16568324f76f467aa4c2aac2f05db632c3 # main
```

Las etiquetas se pueden mover; los SHA son inmutables. Además: purgaron todas las entradas de caché y añadieron comprobaciones `repository_owner`.

---

## 8. Lista de protección para desarrolladores

### A. Gestión de dependencias

- [ ] **Versiones exactas — sin `^` ni `~`** → Añade `save-prefix=` en `.npmrc`
- [ ] **Usar `npm ci` en CI, nunca `npm install`**
- [ ] **Preferir pnpm** — tienda direccionable por contenido, aislamiento estricto, comprobaciones de integridad. En CI usar `pnpm install --frozen-lockfile`.
- [ ] **7 días de espera para versiones nuevas** Renovate: `"stabilityDays": 7`. Dependabot: programación semanal.
- [ ] **Desactivar scripts de ciclo de vida** `ignore-scripts=true` en `.npmrc`

### B. Endurecimiento de CI/CD

- [ ] **Nunca `pull_request_target` + código de fork**
- [ ] **Fijar todas las Actions a SHA**
- [ ] **Permisos `permissions:` mínimos** `id-token: none` en todas partes salvo el trabajo de publicación
- [ ] **Aislar claves de caché** — prefijo con `${{ github.event_name }}`
- [ ] **Exigir aprobación a contribuidores por primera vez**
- [ ] **Supervisar publicaciones** [StepSecurity Feed](https://app.stepsecurity.io/oss-security-feed), Socket.dev, Snyk

### C. `.npmrc` rápido para cada proyecto

```ini
# .npmrc — súbelo a git
save-prefix=
ignore-scripts=true
audit=true
fund=false
```

### D. Resumen visual

|                           |                                        |
| ------------------------- | -------------------------------------- |
| 📌 **Fijar deps**          | Versiones exactas. `save-prefix=`       |
| 🔒 **Lockfile en CI**     | `npm ci` / `--frozen-lockfile`         |
| 🚫 **Sin scripts**         | `ignore-scripts=true`                  |
| ⏳ **Espera 7 días**       | `stabilityDays: 7`                     |
| 🔗 **SHA-pin**            | Todas las acciones fijadas por SHA     |
| 🛡️ **Permisos mínimos**   | `read` por defecto; subir por trabajo  |
| 🧹 **Sin target+checkout**| Nunca ejecutar código de fork en base  |
| 📡 **Monitorizar**        | Alertas en publicaciones inesperadas   |
| 🗃️ **Aislar caché**       | Prefijo con `event_name`               |
| 📋 **Auditar**            | `npm audit`, buscar `router_init.js`   |

---

## Fuentes

- [Postmortem de TanStack](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)
- [Análisis StepSecurity](https://www.stepsecurity.io/blog/mini-shai-hulud-is-back-a-self-spreading-supply-chain-attack-hits-the-npm-ecosystem)
- [Informe Socket.dev](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack)
- [Blog Wiz](https://www.wiz.io/blog/mini-shai-hulud-strikes-again-tanstack-more-npm-packages-compromised)
- [Blog Snyk](https://snyk.io/blog/tanstack-npm-packages-compromised/)
- [Informe Mend.io](https://www.mend.io/blog/mini-shai-hulud-is-back-172-npm-and-pypi-packages-compromised-in-latest-wave/)
- [Aviso GHSA](https://github.com/TanStack/router/security/advisories/GHSA-g7cv-rxg3-hmpx)
- [Issue #7383](https://github.com/TanStack/router/issues/7383#issuecomment-4426008454)
- [Carga desofuscada](https://gist.github.com/jonchurch/35e88271d58ebc631096bfc90bef53a9)

_Última actualización: 2026-05-13_
