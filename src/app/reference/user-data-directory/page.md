---
title: User data directory
nextjs:
  metadata:
    title: User data directory
    description: Where the note data is stored
---

Speedetail stores your data and config locally at the following path:

- on macOS: `~/Library/Application Support/speedetail/`
- on Windows: `%APPDATA%\speedetail\`
- on Linux:
  - deb/rpm: `~/.config/speedetail/`
  - Snap: `~/snap/speedetail/current/.config/speedetail/`

To open it in a file manager, go to **Preferences** > **General** and select **Open Config Folder**.

The config folder has the following files and folders:

- `config.json` — app config file in the [JSON format](https://www.json.org/json-en.html)
- `keymap.json` — keybindings config file in the [JSON format](https://www.json.org/json-en.html)
- `packages/` — installed plugins
- `db/` — local database
