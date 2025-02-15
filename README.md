# VRChat Bible Verse Client

This project is a client designed to send Bible verses in VRChat using OSC (Open Sound Control). It fetches random verses from an online [Bible API](https://bible-api.com/) and sends them as chatbox messages in VRChat.

## Features
- Fetches random Bible verses from [Bible API](https://bible-api.com/).
- Sends messages to VRChat's chatbox via OSC.
- Configurable settings via `config.json`.
- Emoji customization.
- Works on Windows and Linux/MacOS/Unix systems.

## Installation
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
npm install node-osc node-fetch
npm install -g figlet
```

## Usage
Run the client with:

#### Windows:
```pwsh
node "osc bible.js"
```
#### Linux:
```sh
node osc\ bible.js
```

Make sure that OSC is enabled in VRChat.

## Configuration
Modify `config.json` to adjust settings such as emoji usage, Bible translation ([Bible API](https://bible-api.com/)), and display preferences.

## License
This project is licensed under the GNU General Public License 3.0 (GPL 3.0).

## Disclaimer
Some groups/people may not like that you have a Bible on your head.
It's not the dev's (me) fault if you get kicked/banned from some groups.
