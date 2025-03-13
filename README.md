# VRChat Bible Verse Client
This project is a client designed to send Bible verses in VRChat using OSC (Open Sound Control). It fetches random verses from an online [Bible API](https://bible-api.com/) and sends them as chatbox messages in VRChat.

## Features
- Fetches random Bible verses from [Bible API](https://bible-api.com/).
- Sends messages to VRChat's chatbox via OSC.
- Configurable settings via `config.json5`.
- Emoji customization.
- Works on Windows and most Unix systems.

## Installation

### Git Clone (both platforms + Recommended)
```sh
git clone https://github.com/Kasper100/Bible-OSC.git
cd Bible-OSC
```

### Windows (Winget)
```pwsh
winget install -e --id OpenJS.NodeJS
```
### Linux
#### Ubuntu / Debian:
```sh
sudo apt install nodejs npm
```
#### Fedora:
```sh
sudo dnf install nodejs npm
```
#### Arch Linux / Manjaro:
```sh
sudo pacman -S nodejs npm
```
#### Alpine Linux:
```sh
sudo apk add nodejs npm
```
#### Other Distros:
Please search them in their offical package manager website
### Install Required Packages
```sh
npm i node-osc figlet json5
```
#### Optional
```sh
npm i say
```

## Usage
Run the client with:

#### Windows:
```powershell
node "osc bible.js"
```
#### Linux:
```sh
node osc\ bible.js
```

Make sure that OSC is enabled in VRChat.

## Configuration
Modify `config.json5` to adjust settings such as emoji usage, Bible translation ([Bible API](https://bible-api.com/)), and display preferences.

Also modify `emojis.json5` for custom emojis

## License
This software is subject to the terms of the [GNU](https://www.gnu.org/) General Public License 3.0 (GPL 3.0). By this, you are free to use, make changes and pass on the software. But such modification and enhancements have to also be licensed in GPL 3.0 as well.

## Disclaimer
Some groups/people may not like that you have a Bible on your head.
It's not the dev's (me) fault if you get kicked/banned from some groups.

# God bless you.
## Made with love from Denmark ❤️
