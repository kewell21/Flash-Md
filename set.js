const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0hpYVRZNTY2K1FrQlY3T0JaaHY1V0JheExtaXFhSlFYakQvL3lYNGVFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekEvcy9ZRjdrM21TMjdUVGx1ZzU5U0d3SHVYczZlKzBCazY3M1ZOZFZDdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLQ3REblNtVEpLTktjS1ZpTFBXUWdiVERMRXBpSWVjQktRYTBJS3JjREVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEK3M2c01DZHFiWVZhb01jdEhrNm5oaWtaTi9abkhNNTY2alpTM1c5ZERNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFEUjlVRVZaY0oxZCtmaENaQm9jUms5c1o4dTQ1azJXaDlaTk9MbUtXbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpBRzBYNncvVlZSTFhubVJMeVNFZWI0am9YcHJzbExSSkhJSkFudXB4UjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUJwbENYemNpTzRxSTgrZXF0R2lCOXdRaVRSS3ZEWVpFU0p4VkhZR01tdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNklqT0ZMY2tFc3U4ZmRTdWN2STd4d2RQRGw2WXM2SzZlWE9MTDdBMHRGWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImI0VmlBV2pUU0UvTXBubjQ1bEZFOTN6aFovM1U0ekFIdFVybWsra0xhVTRVZ0dIbUdiaGtWSDNhUFRBajhHOFVicktEcFJ0YXF5NnYwR3VMYzhsY2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjAsImFkdlNlY3JldEtleSI6ImxHaXpIV3ZpQ3kxb1pIZ1JveFFFVkZ5eUx2UklQMFB0NFFOYy82RjFRcG89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImdabWh3cFNVVEhTb0JFQmc0T3BuQUEiLCJwaG9uZUlkIjoiYzhiNGYyOTAtMzc3Yy00MjAxLWI1MDYtYTg5YjUzYTI2NGI1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii95ZGdLRlBXa1BzemJqTUpsODd6c21FSGpCYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3WWZMaVFPSTBBcTI1d1VGT2NxaHhPdkgvMGM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRFZIVjJTTEEiLCJtZSI6eyJpZCI6IjIyNTQ2NTI2MzI0OjZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0w2TTB0VUJFTFA1eExnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InNPbThqT1F1V255SWM1cFFkK1ZJT3EvaldHZDlnUXlXV1FFL3JxeGpSakk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJ1Ly8ya0Q1b0ZOaWdxSnJJc1Y4RlFkaDg3Nm02ZFNnSUlkQzFpV1plOG05SXF6aVVBR2ZLQkV0MlkzQUMxd0RKbi9SVmpiRCtkOWJmSWtSSTJvQ0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4aDNxdzloTTJ3VVZOKzVkeHY2ZXhFd1g3UGI2OFhSdmdGMlJIci9DNkJ5NmJ4V2xYTnBXVnJFc2pDa281Z2M4OTBOM3lBMlRySzBNemJqMUwxN0VpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTQ2NTI2MzI0OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYkRwdkl6a0xscDhpSE9hVUhmbFNEcXY0MWhuZllFTWxsa0JQNjZzWTBZeSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTE4MjkxMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDaDkifQ==',
    PREFIXES: (process.env.PREFIX || ',').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "KHALIL👑 King🪶",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2250546526324",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
