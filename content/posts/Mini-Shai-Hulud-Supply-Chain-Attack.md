---
slug: mini-shai-hulud-supply-chain-attack
title: 'Mini Shai-Hulud Supply Chain Attack'
excerpt: "On May 11 this crazy worm appeared in the tanstack/router repo, publishing 84 malicious versions across 42 @tanstack/* packages. The attacker never stole an npm password. They chained three known vulnerabilities to publish under TanStack's trusted identity with valid SLSA Build Level 3 provenance."
date: '2026-05-13'
readingTime: 12
tags: ['Github-Actions', 'NPM', 'Supply-Chain', 'Tanstack']
category: 'Security'
coverImage: '/images/blog/mini-shai-hulud-supply-chain-attack/cover.webp'
---

## 1. What is Shai-Hulud?

**Shai-Hulud** are the giant sandworms from Frank Herbert's _Dune_ massive, nearly indestructible creatures that tunnel beneath the sand. The attackers (**TeamPCP**) named their malware after them because it's a **worm**: self-replicating software that spreads automatically from one infected package to the next through CI/CD pipelines.

The campaign is saturated with Dune references. Dead-drop branches use names like `atreides`, `fremen`, `sardaukar`, `melange`, `sandworm`, `tleilaxu`. Marker repositories say _"A Mini Shai-Hulud has Appeared."_

> [!info] Who is TeamPCP? The threat group behind Shai-Hulud. Attributed by Wiz with high confidence. Also tracked as **DeadCatx3, PCPcat, ShellForce, CipherForce**. Previously compromised Trivy (March 2026), Bitwarden CLI (April 2026), and SAP packages. The malware skips Russian-language systems and has a destructive `rm -rf /` routine with 1-in-6 probability on Israeli/Iranian systems.

---

## 2. Attack Overview

On **May 11, 2026**, 19:20–19:26 UTC, an attacker published **84 malicious versions** across **42 `@tanstack/*` packages**. `@tanstack/react-router` alone has 12M+ weekly downloads. The attacker **never stole an npm password**. They chained three known vulnerabilities to publish under TanStack's trusted identity with **valid SLSA Build Level 3 provenance**.

> [!note] What is SLSA? "Salsa" = Supply-chain Levels for Software Artifacts. Level 3 means the build ran on hardened infrastructure with signed provenance. The malicious packages had valid L3 because they _were_ built by the real pipeline **with poisoned inputs**. SLSA proves _who_ built it, not whether inputs were clean.

### Attack Flow

```
[STEP 1] Malicious PR           [STEP 2] Cache Poisoning        [STEP 3] OIDC Token Theft
pull_request_target runs   →    1.1 GB poisoned pnpm store   →  /proc/pid/mem dumped      →  💀 PUBLISH
fork code in base context       saved to base repo cache         OIDC JWT extracted           84 malicious versions
                                                                                              Valid SLSA L3 provenance
                                                                                              → worm propagates further
```

**What triggered the detonation:** A maintainer merges a legitimate PR → push to `main` → `release.yml` restores the **poisoned** cache from Step 2. The attacker's PR was already closed and deleted by this point.

---

## 3. The 3-Part Attack Chain

### Part 1 The `pull_request_target` Pwn Request

#### Where do GitHub Actions workflows execute?

On a **GitHub-hosted runner** a fresh Ubuntu VM in GitHub's cloud (Azure). Each run gets a clean VM destroyed afterward. It has a filesystem, network, environment variables with tokens, and a `Runner.Worker` process.

#### What is `pull_request_target` and why does it exist?

It exists for operations that need base-repo permissions on fork PRs like **adding labels** or **posting comments**. Regular `pull_request` can't do these because it runs in the fork's context.

**Safe usage examples:**

```yaml
# SAFE: auto-labeling based on changed file paths (no fork code checkout)
on: pull_request_target
jobs:
  label:
    steps:
      - uses: actions/labeler@v5  # reads file paths from GitHub API only

# SAFE: posting a sticky comment with benchmark results
jobs:
  comment:
    steps:
      - uses: marocchino/sticky-pull-request-comment@v2
        with:
          message: "Bundle size: 42kb (no regression)"
          # reads from a prior workflow artifact never checks out or runs fork code
```

**The danger:** combining `pull_request_target` with **checking out fork code and running it**. That's what TanStack's `bundle-size.yml` did:

```yaml
# THE VULNERABLE bundle-size.yml (before the fix)
on:
  pull_request_target: # ← base repo privileges
    paths: ['packages/**', 'benchmarks/**']
jobs:
  benchmark-pr:
    steps:
      - uses: actions/checkout@v6.0.2
        with:
          ref: refs/pull/${{ github.event.pull_request.number }}/merge
          # ↑ CHECKS OUT FORK CODE
      - uses:
          TanStack/config/.github/setup@main
          # ↑ transitively calls actions/cache@v5
      - run:
          pnpm nx run @benchmarks/bundle-size:build
          # ↑ EXECUTES fork code with base-repo cache scope
```

| Trigger               | Context   | Base secrets? | Base cache write? |
| --------------------- | --------- | ------------- | ----------------- |
| `pull_request`        | Fork      | ✅ NO         | ✅ NO             |
| `pull_request_target` | Base repo | ❌ YES        | ❌ YES            |

#### The Attacker's Exact Actions (Full Detail)

**Account 1 `zblgg`** (id 127806521) The operator:

1. **May 10, 17:16 UTC**: Forked `TanStack/router` and renamed it to `zblgg/configuration` to evade fork-list searches.
2. **May 10, 23:29**: Pushed malicious commit `65bf499d` with a ~30,000-line payload (`vite_setup.mjs`, [deobfuscated here](https://gist.github.com/jonchurch/35e88271d58ebc631096bfc90bef53a9)) using a fabricated identity: `claude <claude@users.noreply.github.com>`. Commit message prefixed with `[skip ci]`.
3. **May 11, ~10:49**: Opened [PR #7378](https://github.com/TanStack/router/pull/7378) titled "WIP: simplify history build."
4. **11:01–11:11**: Multiple force-pushes, each triggering `pull_request_target` workflows. No approval needed the gate is bypassed.
5. **11:11**: Force-push lands the malicious commit. `bundle-size.yml` executes the payload. **Cache poisoned.**
6. **11:31**: Force-pushes PR back to match `main` HEAD (0 files changed). Closes PR, deletes branch. **This is why [PR #7378 appears empty](https://github.com/TanStack/router/pull/7378).**

**Account 2 `voicproducoes`** (id 269549300) The payload host:

Authored the orphan commit (`79ac49eedf`) referenced in the malicious packages' `optionalDependencies`. Contains two files: a `package.json` with `"prepare": "bun run tanstack_runner.js && exit 1"` and the `tanstack_runner.js` credential stealer. Public repos include _"A Mini Shai-Hulud has Appeared"_ likely a compromised Portuguese media account.

---

### Part 2 GitHub Actions Cache Poisoning

#### What is GitHub Actions cache?

Workflows save folders (like the pnpm store) with a key like `Linux-pnpm-store-<hash>`. Next run, the key restores cached files instantly. The flaw: **cache scope is per-repo, shared across `pull_request_target` runs and pushes to `main`**. Setting `permissions: contents: read` does NOT block cache writes `actions/cache@v5` uses its own internal token.

```
[bundle-size.yml]              [GitHub Cache]              [release.yml]
(pull_request_target)       Scope: TanStack/router        (push to main legitimate)
                            refs/heads/main
1. Checks out FORK code  →
2. Runs pnpm install        🔴 POISONED 1.1 GB  →      1. Restores cache ← POISON
3. Malware poisons             SAVE                        2. Malicious code runs
   pnpm store                                              3. Extracts OIDC → publishes
                                                              RESTORE
               ⏱ ~8 HOUR GAP
   PR closed at ~11:31 UTC · Release runs at ~19:15 UTC
   Cache poison persists silently across this entire window

KEY: Both workflows share the same cache scope because
pull_request_target runs in the BASE repo's context not the fork's
```

#### How `vite_setup.mjs` Poisoned the Cache The Exact Mechanism

> [!tip] Deep Dive This section explains the filesystem-level mechanics of the cache poisoning, beyond what the postmortem describes.

The key sentence from Tanner's postmortem: _"The malicious `vite_setup.mjs` was specifically designed to write data into the pnpm-store directory under a key the legit `release.yml` workflow would compute and look up: `Linux-pnpm-store-${hashFiles('**/pnpm-lock.yaml')}`."_

**What is the pnpm store?**

pnpm uses a content-addressable store a global directory (typically `~/.local/share/pnpm/store/v3/`) where every package version is stored once, identified by hash. When you run `pnpm install`, pnpm doesn't copy packages into `node_modules` it **hard-links** them from the store. In GitHub Actions, this store is cached between runs to avoid re-downloading everything.

**What `vite_setup.mjs` did**

The file was placed at `packages/history/vite_setup.mjs` a ~30,000-line bundled JS payload inside the attacker's fork. When `bundle-size.yml` ran `pnpm nx run @benchmarks/bundle-size:build`, it executed the fork's code, which included this file.

`vite_setup.mjs` didn't "install" a specific trojanized npm package in the traditional sense. It **wrote malicious binaries directly into the pnpm store directory** on the runner's filesystem. The pnpm store is just a folder full of files organized by content hash. The malware replaced or injected entries in that folder so that when the store was later restored by `actions/cache@v5`, those malicious files would be present on disk and get invoked during the build process.

The cache entry was saved as `Linux-pnpm-store-6f9233a50def742c09fde54f56553d6b449a535adf87d4083690539f49ae4da11` (1.1 GB) to the GitHub Actions cache for `TanStack/router`, scoped to `refs/heads/main` meaning it was **keyed to match exactly what `release.yml` would look for on the next push**.

**Why `actions/cache@v5` couldn't be blocked**

The TanStack postmortem explains that `actions/cache@v5`'s post-job save uses a **runner-internal token**, not the workflow's `GITHUB_TOKEN`, so setting `permissions: contents: read` does **not** block cache mutation. This is a critical GitHub Actions design gap the workflow author thought they had isolated permissions, but cache writes operate on a separate authentication plane.

**What happened when the cache was restored**

When `release.yml` ran on a push to `main`, its Setup Tools step restored the poisoned entry. At that point, the pnpm store on the runner contained attacker-controlled files. During the build step (`pnpm install` + build), those files were linked into `node_modules` and executed. The malicious code then used a Python script that **reads the memory of the `GitHub Actions Runner.Worker` process directly via `/proc/{pid}/mem`**, targeting JSON objects matching `{"value":"...","isSecret":true}` to extract every secret configured for the workflow.

**Runtime process tree (from StepSecurity analysis):**

```
npm install (PID 2332)
└─ node npm-cli.js install --force (PID 2343)
   ├─ sh -c "node install.js" (PID 2355)        # silently installs Bun runtime
   │  └─ node install.js (PID 2356)
   └─ sh -c "bun run opensearch_init.js" (PID 2364)  # executes the worm payload
      └─ bun.exe opensearch_init.js (PID 2365)
         ├─ gh auth token (PID 2378)             # steals GitHub token
         └─ sudo python3 | tr | grep | sort      # scrapes Runner.Worker memory
            └─ python3 reads /proc/2138/mem
```

**Were specific packages trojanized inside the store?**

This is the part that's not fully public. The postmortem says `vite_setup.mjs` "writes data into the pnpm-store directory," but doesn't enumerate which specific package entries were replaced. Two likely approaches:

- **Approach A Replace an existing package's entry:** Overwrite the cached content of a package that `release.yml` would definitely restore and `require()` during its build step (like `@tanstack/config`). Cleanest approach.
- **Approach B Add a new entry + modify the lockfile hash:** Inject a new malicious module into the store and ensure the cache key still matches. Since the cache key is `Linux-pnpm-store-${hashFiles('**/pnpm-lock.yaml')}`, the attacker only needed to ensure the **lockfile hash stayed the same** which is easy if you only modify the store contents and not the lockfile itself.

> [!info] Open question from the postmortem "Did the npm cache also get poisoned (the 6 duplicate `linux-npm-store-*` entries)? Were any actually used?" even the TanStack team hadn't fully audited every cache entry at time of publication.

**Second-stage payload URLs (IOCs):**

- `https://litter.catbox.moe/h8nc9u.js`
- `https://litter.catbox.moe/7rrc6l.mjs`

The poisoned store contained entries that fetched these additional payloads from anonymous file-sharing URLs during the build phase.

> [!abstract] The pharmacy analogy Think of it like this: someone broke into a pharmacy warehouse (the pnpm store), swapped some pills in the storage bins, then left. Hours later, the legitimate pharmacist (`release.yml`) came in, grabbed pills from the usual bins (cache restore), and distributed them to patients (`npm publish`) never knowing the bins had been tampered with.

---

### Part 3 OIDC Token Extraction from Runner Memory

**OIDC**: you tell npm _"trust publishes from `TanStack/router`, workflow `release.yml`, branch `main`."_ The runner mints a short-lived JWT; npm verifies and publishes. No stored password. But the token lives in the runner's process memory because `id-token: write` is set.

The malware read `/proc/<pid>/mem` of the `Runner.Worker` process, scanning for `{"value":"...","isSecret":true}` to extract the token, then POSTed directly to npm. The [workflow run shows "failure"](https://github.com/TanStack/router/actions/runs/25613093674/job/75429692202#step:26:2) because tests broke but the malware had already published.

---

## 4. What the Malware Does

The payload uses two infection vectors: a `router_init.js` (~2.3 MB obfuscated) in the tarball, and an `optionalDependencies` entry whose `prepare` hook runs `bun run tanstack_runner.js && exit 1`. Bun is used because it **lacks Node.js security hook interception**. The `exit 1` makes the optional dep "fail" silently no trace.

**Four capabilities:**

1. **Credential harvest** GitHub, AWS IMDSv2, K8s, Vault, SSH, npm, 100+ file paths.
2. **Exfiltrate** via Session P2P network (`filev2.getsession.org`), `git-tanstack.com` (attacker typosquat domain), and GitHub API dead-drops using Dune-themed branch names.
3. **Self-propagate** find victim's packages via npm API, republish all with payload.
4. **Persist** `.claude/settings.json`, `.vscode/tasks.json`, `gh-token-monitor` daemon via systemd/LaunchAgent. The daemon polls GitHub every 60s; **if a token is revoked, it runs `rm -rf ~/`**.

---

## 5. How Downstream Projects Got Infected

**Scenario A Loose version ranges**

Most projects: `"@tanstack/react-router": "^1.169.0"`. Running `npm install` resolves to the latest match which for ~6 minutes was the infected version. Even with a lockfile, running `npm install @tanstack/react-router` fetches the latest.

**Scenario B CI with `npm ci`**

If using `npm ci` (installs exactly from lockfile), NOT affected unless the lockfile already pointed to a malicious version. But many pipelines use `npm install` instead.

**Scenario C Worm self-propagation**

The malware queries `registry.npmjs.org/-/v1/search?text=maintainer:<user>` and republishes ALL of that user's packages with the payload. This spread it to `@uipath` (66 packages enterprise RPA), `@mistralai` (Mistral AI client), `@squawk` (PostgreSQL tools), `@tallyui`, and **170+ total**.

---

## 6. Detection Am I Affected?

### Timeline

| Time (UTC)      | Event                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| 19:20           | 84 malicious versions published                                                                         |
| ~19:26 (6 min)  | Socket.dev AI Scanner flags all 84 packages                                                             |
| ~19:40 (20 min) | StepSecurity Feed detects anomaly                                                                       |
| ~19:50 (30 min) | ashishkurmi opens [Issue #7383](https://github.com/TanStack/router/issues/7383#issuecomment-4426008454) |
| ~21:00          | All 84 versions deprecated. Public disclosure.                                                          |

### Run These Commands Now

```bash
# 1. Search for the injected payload file
find node_modules -name "router_init.js" -type f 2>/dev/null

# 2. Search for the malicious optionalDependency
grep -r "@tanstack/setup" node_modules/*/package.json 2>/dev/null

# 3. Check for the compromised commit hash
find node_modules/@tanstack -name "package.json" | \
  xargs grep -l "voicproducoes\|79ac49eedf"

# 4. Hash-check (malicious SHA256):
# ab4fcadaec49c03278063dd269ea5eef82d24f2124a8e15d7b90f2fa8601266c
find node_modules -name "router_init.js" -exec shasum -a 256 {} \;

# 5. Check for persistence on your machine
find ~ -path '*/.claude/setup.mjs' -o -path '*/.vscode/setup.mjs'
find ~ -name 'router_runtime.js'
find ~/.config -name '*gh-token-monitor*'
find /tmp -name 'tmp.ts018051808.lock'
ps aux | grep -E 'tanstack_runner|router_runtime|gh-token-monitor|bun'
```

> [!danger] If compromised: disable the dead man's switch FIRST The daemon runs `rm -rf ~/` if it detects a revoked token. **Disable it before revoking anything.**
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

Or use the automated checker tool:

```bash
git clone https://github.com/champjss/mini-shai-hulud-checker-20260512.git
cd mini-shai-hulud-checker-20260512
node dist/cli.js check-project /path/to/your-project
node dist/cli.js check-global
```

---

## 7. Tanner's Fix

Tanner Linsley merged two hardening commits immediately after the incident:

### Fix 1: `pull_request_target` → `pull_request`

```yaml
# Commit 5d92d5a by tannerlinsley
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

**What changes in the PR process:**

1. **Fork PRs now run in the fork's context** can't write to base cache, can't access base secrets.
2. **The comment job needs a two-workflow pattern.** Since `pull_request` can't write PR comments directly, the benchmark saves results as a workflow artifact. A separate `workflow_run`-triggered job reads the artifact and posts the comment. More complex, but eliminates the trust violation.
3. **First-time contributors now require approval** before any workflow runs the gate that `pull_request_target` was bypassing.

### Fix 2: Pin all actions to SHA

```yaml
# Commit bb5f3cc by renovate[bot] chore(deps): pin dependencies (#7388)
# Applied across ALL 7 workflow files:
-     uses: actions/checkout@v6.0.2
+     uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2
-     uses: TanStack/config/.github/setup@main
+     uses: TanStack/config/.github/setup@e4b48f16568324f76f467aa4c2aac2f05db632c3 # main
```

Tags can be moved; SHAs are immutable. Additionally: all cache entries were purged, and `repository_owner` guards were added.

---

## 8. Developer Protection Checklist

### A. Dependency Management

- [ ] **Pin exact versions no `^` or `~`** → Add `save-prefix=` to `.npmrc`
- [ ] **Use `npm ci` in CI, never `npm install`**
- [ ] **Prefer pnpm** content-addressable store, strict isolation, integrity checks. Use `pnpm install --frozen-lockfile` in CI.
- [ ] **7-day cooldown on new versions** Renovate: `"stabilityDays": 7`. Dependabot: weekly schedule.
- [ ] **Disable lifecycle scripts** `ignore-scripts=true` in `.npmrc`

### B. CI/CD Hardening

- [ ] **Never `pull_request_target` + fork code**
- [ ] **Pin all Actions to SHA**
- [ ] **Minimal `permissions:`** `id-token: none` everywhere except publish job
- [ ] **Isolate cache keys** prefix with `${{ github.event_name }}`
- [ ] **Require approval for first-time contributors**
- [ ] **Monitor publishes** [StepSecurity Feed](https://app.stepsecurity.io/oss-security-feed), Socket.dev, Snyk

### C. Quick `.npmrc` for Every Project

```ini
# .npmrc commit to git
save-prefix=
ignore-scripts=true
audit=true
fund=false
```

### D. Summary Cards

|                           |                                        |
| ------------------------- | -------------------------------------- |
| 📌 **Pin deps**           | Exact versions. `save-prefix=`         |
| 🔒 **Lockfile CI**        | `npm ci` / `--frozen-lockfile`         |
| 🚫 **No scripts**         | `ignore-scripts=true`                  |
| ⏳ **7-day wait**         | `stabilityDays: 7`                     |
| 🔗 **SHA-pin**            | All actions pinned to SHA              |
| 🛡️ **Min perms**          | Default `read`, escalate per-job       |
| 🧹 **No target+checkout** | Never run fork code in base context    |
| 📡 **Monitor**            | Alert on unexpected publishes          |
| 🗃️ **Cache isolation**    | Prefix with `event_name`               |
| 📋 **Audit**              | `npm audit`, scan for `router_init.js` |

---

## Sources

- [TanStack Postmortem](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)
- [StepSecurity Analysis](https://www.stepsecurity.io/blog/mini-shai-hulud-is-back-a-self-spreading-supply-chain-attack-hits-the-npm-ecosystem)
- [Socket.dev Report](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack)
- [Wiz Blog](https://www.wiz.io/blog/mini-shai-hulud-strikes-again-tanstack-more-npm-packages-compromised)
- [Snyk Blog](https://snyk.io/blog/tanstack-npm-packages-compromised/)
- [Mend.io Report](https://www.mend.io/blog/mini-shai-hulud-is-back-172-npm-and-pypi-packages-compromised-in-latest-wave/)
- [GHSA Advisory](https://github.com/TanStack/router/security/advisories/GHSA-g7cv-rxg3-hmpx)
- [Issue #7383](https://github.com/TanStack/router/issues/7383#issuecomment-4426008454)
- [Deobfuscated payload](https://gist.github.com/jonchurch/35e88271d58ebc631096bfc90bef53a9)

_Last updated: 2026-05-13_
