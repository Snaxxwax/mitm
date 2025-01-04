# Hugo Submodule Documentation

This project uses Hugo as a Git submodule to ensure consistent builds across environments. The Hugo binary is version-controlled and maintained at a specific version (currently v0.121.2).

## Initial Setup

When cloning this repository for the first time, you'll need to initialize and update the submodule:

```bash
# Clone the main repository with submodules
git clone --recursive [repository-url]

# Or if you've already cloned the repository:
git submodule update --init --recursive
```

## Updating Hugo Version

To update the Hugo version:

1. Navigate to the hugo submodule directory:
   ```bash
   cd hugo
   ```

2. Fetch the latest tags:
   ```bash
   git fetch --tags
   ```

3. List available versions:
   ```bash
   git tag -l "v*"
   ```

4. Checkout the desired version:
   ```bash
   git checkout [version-tag]
   ```

5. Commit the submodule update:
   ```bash
   cd ..
   git add hugo
   git commit -m "Update Hugo submodule to [version-tag]"
   ```

## Best Practices

1. Always use `git clone --recursive` when cloning the repository to ensure the Hugo submodule is included.
2. After pulling changes, run `git submodule update` to ensure your Hugo version matches the repository.
3. Test the site locally after any Hugo version changes.
4. Document any version changes in commit messages.

## Current Version

The Hugo submodule is currently locked to version v0.121.2 to ensure consistent builds across all environments.

## Troubleshooting

If you encounter issues:

1. Verify your submodule is properly initialized:
   ```bash
   git submodule status
   ```

2. Reset the submodule to the correct version:
   ```bash
   git submodule update --recursive
   ```

3. If the submodule appears empty, try:
   ```bash
   git submodule update --init --recursive