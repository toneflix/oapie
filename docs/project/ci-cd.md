# CI/CD

## Test Workflow

The repository CI runs tests on pushes and pull requests. It installs dependencies with PNPM and runs the Vitest suite.

## Release Publish Workflow

When a GitHub release is published, the npm publish workflow:

- checks out the repository
- installs dependencies
- runs the build
- publishes the package to npm

This workflow requires an `NPM_TOKEN` repository secret.

## Docs Deployment Workflow

The docs workflow builds the VitePress site and deploys `docs/.vitepress/dist` to GitHub Pages.

It uses the repository Pages environment and GitHub's official Pages actions.
