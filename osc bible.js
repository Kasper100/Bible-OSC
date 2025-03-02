/*
------------------------------------------------------------------------------------------|
INFORMATION:                                                                              |
    Hi! Most of the comments are in Danish. Please translate them to understand them.     |
    This program was made with Windows in mind but also supports Linux/Unix systems.      |
    If you are using VSCode to look through the code, then please have-                   |
    the extension "Better Comments" installed as it should be easier to read and sort.    |
------------------------------------------------------------------------------------------|
REMARKS:                                                                                  |
    Remember that this is made for a game called VRChat,                                  |
    which is available on Steam and the Oculus Store.                                     |
    If you get banned from some groups, it's not my fault.                                |
    it just means you were hanging out with the wrong people.                             |
    Just rememeber to enable OSC in VRChat.                                               |
------------------------------------------------------------------------------------------|
*/

const osc = require('node-osc'); // OSC (duh!)
const config = require('./files/json/config/config.json'); // config json fil
const figlet = require('figlet'); // stor ass tekst module
const fs = require('fs'); // får data from non-json filer

const version = fs.readFileSync("./files/VERSION.data", "utf8").trim();

/*
TODO: Spread the Gospel
TODO: Spread the Word of God in VRChat
*/

let messages = [];
let messagestring_beta = "";
let versID = 0;
let lastverse = "";

//! config; (as in /files/config.json)

//* graphics
const showid = Boolean(config.graphics.showid);
let maxhistory = parseInt(config.graphics.maxhistory);
if (maxhistory <= 0) {
    maxhistory = Number.MAX_SAFE_INTEGER; // 2 ^ 53 - 1 = 9007199254740991
}
const showemoji = Boolean(config.graphics.showemojis);
const showlogs = Boolean(config.graphics.showlogs);
const betatuilines = Boolean(config.beta.graphics.newguilines); //! BETA
if (!betatuilines) {
    var showlines = Boolean(config.graphics.guilines);
    if (!showlines) {
        var showmainlines = Boolean(config.graphics.showtopandbottom_if_guilinesIsFalse);
    } else {
        var showmainlines = Boolean(config.graphics.showtopandbottom_if_guilinesIsFalse);
    }
}

//* bible
const bibletranslation = config.bible.translation;

//* emoji
const randomemoji = Boolean(config.emoji.randomemoji);
const nonrandomchosenemoji = config.emoji.if_false_thenchoosethisemoji;
const showemojiinlogs = Boolean(config.emoji.show_emojisInLogs);

//* startup / shutdown
const custom_startup_bool = Boolean(config.startup.customstartupmessage); // true or false
if (custom_startup_bool) {
    var custom_startup_msg = String(config.startup.custom_startmessage);
} else {
    var custom_startup_msg = "Starting " + __filename.split(/[\\/]/).pop();
}

const custom_shutdown_bool = Boolean(config.startup.customshutdownmessage); // true or false
if (custom_shutdown_bool) {
    var custom_shutdown_msg = String(config.startup.custom_shutmessage);
} else {
    var custom_shutdown_msg = "Closing " + __filename.split(/[\\/]/).pop();
}

//* chatbox
const linesinchatbox = Boolean(config.chatbox.linesinchatbox);
const emojisinlines = Boolean(config.chatbox.showemojisinlines);
const randomemojiInChatboxLines = Boolean(config.chatbox.randomemojiInlines);
const nonrandomchosenemojiInChatboxLines = config.chatbox.if_randomemojiInLines_false_thenchoosethisemoji; // lang ass variable navn
const Show_BibleVerseText = Boolean(config.chatbox.showBibleVerse_text);

//! end of config

const client = new osc.Client('127.0.0.1', 9000); // lave klient til lokal IP til port 9000

function loadJsonToList(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        const list = JSON.parse(data);
        
        if (!Array.isArray(list)) {
            throw new Error("JSON is not an array!");
        }

        return list;
    } catch (err) {
        console.error("Error loading JSON:", err);
        console.warn("Using backup emojis")
        return ["☦️", "✝️", "👼", "❤️"];
    }
}
const emojis = loadJsonToList("./files/json/emojis.json");

// ZZZZZzzzzzzzzzzzZZZZZZZZZZZZZZZZzzzzzzzzzzzzzzzZZZZZZZZZZZZZZZzzzzzzzzzzzzzzzzzzzz
//* ↓ helper functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function rng(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function figlettext(text) {
    return new Promise((resolve, reject) => {
        figlet(text, function (err, data) {
            if (err) {
                reject('Something went wrong: ' + err);
            } else {
                resolve(data);
            }
        });
    });
}

function drawBox(text, idlines) {
    if (idlines) {
        var linesid = idlines
    } else {
        var linesid = 0;
    }
    const lines = text.split("\n");
    const maxLength = Math.max(...lines.map(line => line.length));

    const width = maxLength + 4;
    if (linesid === 1) {
        var horizontal = "─".repeat(width);
    } else if (linesid === 0) {
        var horizontal = "═".repeat(width);
    }
    if (linesid === 1) {
        console.log(`┌${horizontal}┐`);
    } else if (linesid === 0) {
        console.log(`╔${horizontal}╗`);
    }
    lines.forEach(line => {
        const padding = " ".repeat(maxLength - line.length);
        if (linesid === 1) {
            console.log(`│  ${line}${padding}  │`);
        } else if (linesid === 0) {
            console.log(`║  ${line}${padding}  ║`);
        }
    });
    if (linesid === 1) {
        console.log(`└${horizontal}┘`);
    } else if (linesid === 0) {
        console.log(`╚${horizontal}╝`);
    }
}

//* ↑ helper functions

// send en OSC besked til /chatbox/input
async function sendMessage(message) {
    if (linesinchatbox) {
        var maxLength = 120;
    } else {
        var maxLength = 144;
    }
    const chunks = message.match(new RegExp(`.{1,${maxLength}}`, 'g'));
    if (linesinchatbox) {
        if (emojisinlines) {
            if (randomemojiInChatboxLines) {
                var bottom_emoji = emojis[rng(emojis.length - 1, 0)];
                var top_emoji = emojis[rng(emojis.length - 1, 0)];
            } else {
                var bottom_emoji = nonrandomchosenemojiInChatboxLines;
                var top_emoji = nonrandomchosenemojiInChatboxLines;
            }
        } else {
            var bottom_emoji = "═";
            var top_emoji = "═";
        }
    }
    for (const chunk of chunks) {
        if (linesinchatbox) {
            /* format:
            ╔═══☦️═══╗
            For God so loved the world, that he gave his only Son, so that everyone
            who believes in him may not be lost, but have eternal life.
            ╚═══✝️═══╝
            */
            var input = `╔═══${top_emoji}═══╗\n` + chunk + `\n╚═══${bottom_emoji}═══╝`
        } else {
            var input = chunk
        }
        client.send('/chatbox/input', input, true, (err) => {
            if (err) {
                console.error('Error sending OSC message:', err);
            }
        });
        // * min 5 sec. 100ms pr. bogstav
        await sleep(Math.max(5000, chunk.length * 100));
    }
};

figlettext(custom_startup_msg + "\nversion: " + version).then(data => drawBox(data, 1));
sendMessage(custom_startup_msg + ". version: " + version);

// får en vers fra bibelen
async function getBibleVerse() {
    let retries = 3;
    let trys = 0;
    while (trys < retries) {
        try {
            const response = await fetch(`https://bible-api.com/data/${bibletranslation}/random`); //! https://bible-api.com/data/oeb-cw/random
            const data = await response.json();
            if (data.random_verse && data.random_verse.book && data.random_verse.chapter && data.random_verse.verse && data.random_verse.text)
            {
            /* format:
               {BOOK} {CHAPTER}:{VERSE};
               {TEXT}
            */
                if (Show_BibleVerseText) {
                    return `${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse}\n${data.random_verse.text}`;
                } else {
                    return `${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse}`
                }
            } else {
                throw new Error("Invalid response structure from API");
            }
        } catch (error) {
            console.error("Error fetching Bible verse:", error);
            trys++;
            if (trys < retries) {
                console.log("Retrying to fetch bible verse from API")
                await sleep(1000)
            } else {
                return "Error: Unable to fetch a Bible verse. Please check ./files/config.json or the API";
            }
        }
    }
};


// * funktionet navn siger det hele
async function startSendingVerses() {
    while (true) {
        console.log("\x1Bc"); //* clear
        if (messages.length > maxhistory) {
            messages.splice(0, messages.length - maxhistory)
        }
        // ikke send samme vers
        do {
            var verse = await getBibleVerse();
        } while (verse === lastverse);
        
        lastverse = verse;
        
        if (showemoji) {
            if (randomemoji) {
                var chosenEmoji = emojis[rng(emojis.length - 1, 0)];
            } else {
                var chosenEmoji = nonrandomchosenemoji;
            }
        } else {
            var chosenEmoji = "";
        }
        
        versID += 1;
        
        sendMessage(chosenEmoji + verse);

        if (showid) {
            if (showemojiinlogs) {
                messages.push(chosenEmoji + verse + `(ID: ${versID})`);
            } else {
                messages.push(verse + `(ID: ${versID})`)
            }
        } else {
            if (showemojiinlogs) {
                messages.push(chosenEmoji + verse)
            } else {
                messages.push(verse)
            }
        }
        if (showlines || !showlines && showmainlines) {
            console.log(`╔══════════${emojis[rng(emojis.length - 1, 0)]}═════════╗`)
        }
        if (showlogs) {
            // gental historie
            if (!betatuilines) {
                for (let i = 0; i < messages.length; i++) {
                    if (showlines) {
                        console.log("══════════╗");
                        console.log(messages[i]);
                        console.log("══════════╝");
                    } else {
                        console.log(messages[i], "\n");
                    }
                }
            } else {
                messagestring_beta = "";
                for (let i = 0; i < messages.length; i++) {
                    if (showlines) {
                        messagestring_beta += "══════════╗\n" + messages[i] + "══════════╝\n";
                    } else {
                        messagestring_beta += messages[i] + "\n";
                    }
                }
                drawBox(messagestring_beta);
            }
        } else {
            if (showemojiinlogs) {
                console.log(chosenEmoji + verse + `(ID: ${versID})`);
            } else {
                console.log(verse + `(ID: ${versID})`);
            }
        }
        if (showlines || !showlines && showmainlines) {
            console.log(`╚══════════${emojis[rng(emojis.length - 1, 0)]}═════════╝\n`);
        }
        console.log("Press Ctrl+C to exit");
                                    // !  (verse.length * ms pr bogstav, min), max);
        const interval = Math.min(Math.max(verse.length * 750, 10000), 30000);
        await sleep(interval);
    }
};

// * start lortet
startSendingVerses();

// ! Ctrl + C (sikkert exit)
process.on('SIGINT', () => {
    console.log("\x1Bc");
    figlettext(custom_shutdown_msg);
    client.close();
    process.exit();
});

// ! anti-crash (hvis min kode er lort)
process.on('uncaughtException', (err) => {
    console.error("Unexpected error:", err);
    console.log("Restarting...");
    setTimeout(() => process.exit(1), 5000);
});