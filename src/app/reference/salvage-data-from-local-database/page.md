---
title: Salvage Data from Local Database
nextjs:
  metadata:
    title: Salvage Data from Local Database
    description: How to recover your notes from the local database if you lose access to your account due to password loss
---

If you lost your password and cannot authenticate anymore, it means unfortunately that you have lost your account because [your data is encrypted in client](/security).
Please try [troubleshooting](/reference/troubleshooting#i-can-t-log-in-sync-not-working) once again in order to check if you certainly lost the account.

However, there is still a chance to salvage your data if you haven't uninstalled the desktop app yet.
It stores your data without encrypting in local database.
You can use our tool to extract data as [backup files](/reference/data-backup) from it.
Follow the below steps to try that.

## Install Speedetail local database extractor

The tool is published on npm as [speedetail-localdb-extract](https://www.npmjs.com/package/speedetail-localdb-extract).

### Requirements

- [NodeJS](https://nodejs.org/) >= 12

### How to install

```sh
npm install -g speedetail-localdb-extract
```

## How to salvage data

You got a command `speedetail-localdb-extract`:

```sh
speedetail-localdb-extract

Options:
  --version   Show version number                                      [boolean]
  -s, --src   The path to the source database directory
              (ex: "~/Library/Application Support/speedetail/db/56ab08396cec2c0f87492c9a0f005f86")   [required]
  -d, --dest  The path to the destination directory                   [required]
  --help      Show help                                                [boolean]
```

Your data directory can be found at the following path:

- on macOS: `~/Library/Application Support/speedetail/db/<USER_ID>`
- on Windows: `%APPDATA%\speedetail\db\<USER_ID>`
- on Linux: `~/.config/speedetail/db/<USER_ID>`

`USER_ID` looks something like `56ab08396cec2c0f87492c9a0f005f86`.

For example:

```sh
speedetail-localdb-extract --src /path/to/db --dest /path/to/store
```

Then, you should get [backup files](/reference/data-backup) in the specified destination directory.

## Migrate data to new account

If you successfully salvaged data, now you can [restore it to new account](/reference/data-backup).
If you would like to migrate the payment information of your old account, please [contact us](mailto:contact@speedetail.app).
We will migrate your payment information and delete the old account.

## See also

- [FAQ - I forgot my password. How to reset my password?](/faq#i-forgot-my-password-how-to-reset-my-password)
- [Troubleshooting - I can't login](/reference/troubleshooting#i-can-t-log-in-sync-not-working)
- [Recovering Your Password](/reference/recover-password)
