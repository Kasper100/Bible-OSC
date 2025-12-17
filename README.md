# VRChat Bible Verse Client
This project is designed to spread the Gospel, without saying a word! This project is also designed to be cross-platform and lightweight.
### Disclaimer:
This process of this project has slowed down a lot.
Any Pull Requests will be nice.

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
#### Fedora / CentOS:
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
Make sure that OSC is enabled in VRChat.
Run the client with:

#### Windows:
```powershell
node "osc bible.js"
```
#### Linux:
```sh
node osc\ bible.js
```
## Compile
You could also compile the program to share with friends or non-tech savvy people

Make the package.json:
```json
{
  "name": "osc-bible",
  "version": "1.0.0",
  "main": "osc bible.js",
  "dependencies": {
    "figlet": "^1.5.2",
    "json5": "^2.2.3",
    "node-fetch": "^2.7.0",
    "node-osc": "^4.0.0"
  },
  "pkg": {
    "assets": [
      "files/**/*",
      "highscore/**/*"
    ]
  }
}
```

and compile it
```bash
pkg "osc bible.js" --targets node16-linux-x64,node16-win-x64 --output "osc-bible"
```
remove "node16-linux-x64" to not compile for linux, or "node16-win-x64" to not compile on windows.

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
