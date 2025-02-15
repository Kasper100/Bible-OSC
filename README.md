# VRChat Bible Verse Client

This project is a client designed to send Bible verses in VRChat using OSC (Open Sound Control). It fetches random verses from an online Bible API and sends them as chatbox messages in VRChat.

## Features
- Fetches random Bible verses from [Bible API](https://bible-api.com/)
- Sends messages to VRChat's chatbox via OSC
- Supports emoji customization
- Configurable settings via `config.json`
- Works on Windows and Linux/Unix systems

## Installation
### Windows (Winget)
```batch
winget install -e --id OpenJS.NodeJS
```
### Linux
#### Ubuntu/Debian:
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
Refer to your package manager's documentation.

### Install Required Packages
```sh
npm install node-osc node-fetch
```

## Usage
Run the client with:

#### Windows:
```sh
node "osc bible.js"
```
#### Linux:
```sh
node osc\ bible.js
```

Ensure that OSC is enabled in VRChat.

## Configuration
Modify `config.json` to adjust settings such as emoji usage, Bible translation, and display preferences.

## License
This project is licensed under the GNU General Public License 3.0 (GPL 3.0).

## Disclaimer
Use this client responsibly. The developer is not responsible for any bans or actions taken against users in VRChat.

