/*
------------------------------------------------------------------------------------------|
INFORMATION:                                                                              |
    Hi! Most of the comments are in Danish. Please translate them to understand them.     |
    This program was made with Windows in mind but also supports Linux/Unix systems.      |
------------------------------------------------------------------------------------------|
REMARKS:                                                                                  |
    Remember that this is made for a game for the social platform VRChat,                 |
    which is available on Steam and the Oculus Store.                                     |
    If you get banned from some groups, it's not my fault.                                |
    it just means you were hanging out with the wrong people.                             |
    Just rememeber to enable OSC in VRChat.                                               |
------------------------------------------------------------------------------------------|
*/

const osc = require('node-osc');
const fetch = require("node-fetch"); // -18v support
const config = require("./files/config.json")

/*
TODO: Spread the gospel
TODO: Spread the Word of God in VRChat
*/

let messages = ["Press CTRL+C once to exit"];
let versID = 0;
let lastverse = "";

//! config; (as in /files/config.json)

//* graphics
const showid = Boolean(config.graphics.showid);
let maxhistory = parseInt(config.graphics.maxhistory) + 1;
if (maxhistory === 0) {
    maxhistory = Number.MAX_SAFE_INTEGER; // 2 ^ 53 - 1
}
const showemoji = Boolean(config.graphics.showemojis);
const showlogs = Boolean(config.graphics.showlogs);

//* bible
const bibletranslation = config.bible.translation;

//* emoji
const randomemoji = Boolean(config.emoji.randomemoji);
const nonrandomchosenemoji = config.emoji.if_false_thenchoosethisemoji;
const showemojiinlogs = Boolean(config.emoji.show_emojisInLogs);

//* startup / shutdown
const custom_startup_bool = Boolean(config.startup.customstartupmessage); // true or false
let custom_startup_msg;
if (custom_startup_bool) {
    custom_startup_msg = String(config.startup.custom_startmessage);
} else {
    custom_startup_msg = "Starting " + __filename.split(/[\\/]/).pop();
}

const custom_shutdown_bool = Boolean(config.startup.customshutdownmessage); // true or false
let custom_shutdown_msg;
if (custom_shutdown_bool) {
    custom_shutdown_msg = String(config.startup.custom_shutmessage);
} else {
    custom_shutdown_msg = "Closing " + __filename.split(/[\\/]/).pop();
}
//! end of config

const client = new osc.Client('127.0.0.1', 9000); // lave klient til lokal IP til port 9000
const emojis = [
    "🙏",
    "🌤️", 
    "🌅",
    "📖", // * bog, som skal være biblen
    "✝️", // * latinsk kors
    "☦️", // * orthodokst kors
    "🕊️", // * helligånden
    "⛪", // * kirke
    "⁜", // * kors af Jerusalem
    "🆊", // * khi ro (Jesus Kristus)
    "😇", // * engel 1
    "👼", // * engel 2
    "🐟", // * jesus kristus fisk (Ichthys)
    "🛐", // * beder (til jesus kristus)
    "🌟", // * den stor stjerne over jesus kristus i bethlehem
    "🍷", // * lord's supper (jeg ved ikke, hvad det hedder på dansk)
    "❤️", // * luthersk hjerte
    "🍎", // * videns æble
    "👑" // * king of kings
]; // * 1 string lang please. hvis det er °, så er den unsigned af VRC's unicode version (gammel lort 👴👴👴👴👴👴)
//! ༒ er ikke en kors men er en tibetansk udtale mark


// ZZZZZzzzzzzzzzzzZZZZZZZZZZZZZZZZzzzzzzzzzzzzzzzZZZZZZZZZZZZZZZzzzzzzzzzzzzzzzzzzzz
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
};

function rng(max, min)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// send en OSC besked til /chatbox/input
async function sendMessage(message)
{
    const maxLength = 144;
    const chunks = message.match(new RegExp(`.{1,${maxLength}}`, 'g'));

    for (const chunk of chunks)
    {
        client.send('/chatbox/input', chunk, true, (err) => {
            if (err) {
                console.error('Error sending OSC message:', err);
            }
        });

        // * min 5 sec. 100ms pr. bogstav
        await sleep(Math.max(5000, chunk.length * 100));
    }
};
console.log(custom_startup_msg);
sendMessage(custom_startup_msg);
// får en vers fra biblen
async function getBibleVerse()
{
    try
    {
        const response = await fetch(`https://bible-api.com/data/${bibletranslation}/random`);
        const data = await response.json();
        if (data.random_verse && data.random_verse.book && data.random_verse.chapter && data.random_verse.verse && data.random_verse.text)
        {
            /* format:
               {BOOK} {CHAPTER}:{VERSE};
               {TEXT}
            */
            return `${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse};\n${data.random_verse.text}`;
        } else
        {
            throw new Error("Invalid response structure from API");
        }
    } catch (error)
    {
        console.error("Error fetching Bible verse:", error);
        return "Error: Unable to fetch a Bible verse.\nPlease check config.json or the API";
    }
};

// * funktion navn siger det hele
async function startSendingVerses()
{
    while (true)
    {
        console.log("\x1Bc"); //* clear
        if (messages.length > maxhistory) {
            messages.splice(1, messages.length - maxhistory)
        }
        let verse;
        // ikke send samme vers
        do {
            verse = await getBibleVerse();
        } while (verse == lastverse);
        
        lastverse = verse;
        
        let chosenEmoji;
        
        if (showemoji) {
            if (randomemoji) {
                chosenEmoji = emojis[rng(emojis.length - 1, 0)];
            } else {
                chosenEmoji = nonrandomchosenemoji;
            }
        } else {
            chosenEmoji = "";
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

        console.log(`╔══════════${emojis[rng(emojis.length - 1, 0)]}═════════╗`)
        if (showlogs)
        {
            // gental historie
            for (let i = 1; i < messages.length; i++)
            {
                console.log(messages[i], `\n`);
            }
        } else 
        {
            if (showemojiinlogs)
            {
                console.log(chosenEmoji + verse + `(ID: ${versID})`);
            } else
            {
                console.log(verse + `(ID: ${versID})`);
            }
        }
        console.log(`╚══════════${emojis[rng(emojis.length - 1, 0)]}═════════╝\n`, messages[0]);
        // ! Math.min(verse.length, ms pr bogstav), min) max);
        const interval = Math.min(Math.max(verse.length * 750, 10000), 30000);
        await sleep(interval);
    }
};

// * start lortet
startSendingVerses();

// ! GET OUT!!!!
process.on('SIGINT', () => {
    console.log("\x1Bc");
    console.log(custom_shutdown_msg);
    client.close();
    process.exit();
});