# Private/Public Deploy

## Goal
- Source code lives in private repo: `goryugocast/Astro`
- Public site stays on existing URL/repo: `goryugocast/goryugocom`
- Only generated files (`dist/`) are published

## How it works
- You work in private repo locally.
- When you want to publish, run GitHub Actions workflow `Deploy Public Site` in private repo.
- Workflow builds the site and pushes `dist/` to `goryugocast/goryugocom` `main` branch.

## One-time setup
1. In private repo `goryugocast/Astro`, add secret:
- Name: `PUBLIC_REPO_PAT`
- Value: GitHub Personal Access Token
- Required permission: write access to `goryugocast/goryugocom` contents

2. In public repo `goryugocast/goryugocom`, keep Pages setting:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

## Publish flow
1. Local confirmation
- `npm run build`
- `npm run dev` or `npm run preview`

2. Push private repo changes
- `git add -A`
- `git commit -m "..."`
- `git push origin main`

3. Run workflow manually
- GitHub > `goryugocast/Astro` > Actions > `Deploy Public Site` > `Run workflow`

4. Verify public site
- Check existing public URL

## Important note for this project
- Content generation depends on local `content-source` symlink.
- CI cannot read your local iCloud files.
- Therefore, commit generated data used by build (`src/data/archive.json`, `src/content/glossary/*`) from local machine when content changes.
