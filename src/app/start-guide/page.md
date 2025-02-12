---
title: Get started
coverImage: '/images/quick-start-guide_cover.png'
nextjs:
  metadata:
    title: Get started
    description: Quick start guide for Speedetail
    openGraph:
      images:
        [
          'https://speedetail-user-guide.vercel.app/images/quick-start-guide_cover.png',
        ]
---

Welcome to Speedetail!{% .lead %}

On this page, you'll find all the necessary information to start crafting notes with Speedetail.{% .lead %}

There're 3 steps to take:

1. Create an Speedetail account.
1. Download the app.
1. Install the app on your device.

Let's get started.

---

## Create Speedetail account

First, you need to create an Speedetail account. Your account serves many purposes and helps you to:

- Manage your personal information, including account credentials.
- Keep track of authenticated devices and IP addresses.
- Manage payments.
- Browse and publish plugins.

To create an account, go to the [sign-up](https://my.speedetail.app/signup) page.

## Download the app

Once you've created an account, Speedetail sends a verification link to the specified email. What you need to do:

{% callout type="warning" title="For Windows users" %}
There're 2 options for Windows users: installer and zip archive. Prefer the installer option as it automatically updates the app once the new versions are released.
{% /callout %}

1. Go to the link to verify the account.  
   You're redirected to the Speedetail website.
2. Select **Download the client app**.
3. Select an installer appropriate for your operating system.  
   The download will start.

Alternatively, you can sign in to your Speedetail account and select **Download app** as shown in the image below:

![Download](/images/quick-start-guide_download.png)

Then select an installer appropriate for your operating system.

![Download](/images/quick-start-guide_download2.png)

## Install Speedetail

### macOS

Once you downloaded the `Speedetail-x.y.z-Mac.zip` file:

1. Double-click the downloaded file to extract the application.
2. Drag extracted application into your **Applications** folder.

### Windows

Once you've downloaded the `Setup.exe` file, double-click it and follow the installation instruction.

### Linux

You can install Speedetail via Snap or package.

#### via Snap

{% callout title="" %}
If you don't have `snapd` yet, please [install it](https://snapcraft.io/docs/core/install) beforehand.
{% /callout %}

The app is available in [Snap Store](https://snapcraft.io/speedetail). To install Speedetail using snap, run the following command in the terminal:

```shell
sudo snap install speedetail
# Allow the app to access your keyring
sudo snap connect speedetail:password-manager-service
```

You can easily update the app by running the command below:

```shell
sudo snap refresh speedetail
```

#### via Package

To install Speedetail on Linux, you can download a Debian package, an RPM package, or a zip archive.

{% callout type="warning" %}
These packages don't support auto-updates! You'll need to repeat the installation process to update to the latest version. Visit the **[What's new page](https://forum.speedetail.app/c/announcements)** to keep up with the latest bug fixes and improvements.
{% /callout %}

##### Debian, Ubuntu, or related systems

```bash
wget https://api.speedetail.app/download/linux/deb -O /tmp/speedetail.deb && sudo dpkg -i /tmp/speedetail.deb && rm /tmp/speedetail.deb

# Install Speedetail's dependencies if they are missing
sudo apt-get -f install
```

##### RedHat, Fedora, or related systems

```bash
wget https://api.speedetail.app/download/linux/rpm -O /tmp/speedetail.rpm && sudo yum install /tmp/speedetail.rpm && rm /tmp/speedetail.rpm
```

#### Add custom Electron flags

If the app doesn't start properly, you can add custom flags for your operating system. Open `speedetail.desktop` with an editor, which is usually in `/usr/share/applications`:

```ini
[Desktop Entry]
Name=speedetail
Comment=The Note-taking App with Robust Markdown Editor
GenericName=speedetail
Exec=speedetail %U        # Edit this line
Icon=speedetail
Type=Application
StartupNotify=true
Categories=GNOME;GTK;Utility;
MimeType=x-scheme-handler/speedetail;
```

For Wayland users, add the following flags to the `Exec` field like so:

```ini
Exec=speedetail --enable-features=UseOzonePlatform --ozone-platform=wayland --enable-wayland-ime %U
```

## Sign in to your account

Once you've installed Speedetail, sign in to your account. To do that:

1. Open the app. You'll see a login screen.
2. Enter your credentials and select **LOG IN**.

![Login](/images/quick-start-guide_login.png)

---

Now, you are ready to start using Speedetail!
