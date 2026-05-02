# Changesets

This directory holds [changeset](https://github.com/changesets/changesets) entries — one Markdown file per change that should appear in a published version of `@onersoft/ui`.

## Adding a changeset

```bash
pnpm changeset
```

Pick the affected package, choose `patch` / `minor` / `major`, and write a short user-facing summary. Commit the generated file alongside your change.

## What happens on merge to `main`

The release workflow runs the [`changesets/action`](https://github.com/changesets/action):

1. If pending changeset files exist, it opens (or updates) a **Version Packages** PR that bumps versions in `package.json` and writes `CHANGELOG.md`.
2. When that PR is merged, the same action runs `pnpm release` and publishes to npm.

So the order is: changeset PR → merge to main → bot opens Version Packages PR → merge that → published.

## Scope

Only `@onersoft/ui` is published. Apps and internal config packages are listed in `ignore` in `config.json` and won't appear in the version PR.
