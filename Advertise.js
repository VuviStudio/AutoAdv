const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const respondedUsers = new Set();

async function login() {
    for (const tokenConfig of config) {
        const client = new Client({ checkUpdate: false, });

        client.on('ready', async () => { 
            console.log(`VuviAdvertiser Loaded On ${client.user.username}!`);

            const messageContent = fs.readFileSync('message.txt', 'utf8');

            setInterval(() => { 
                for (const channelID of tokenConfig.channelIDs) { 
                    const channel = client.channels.cache.get(channelID); 
                    if (channel) { 
                        channel.send(messageContent); 
                    } 
                } 
            }, tokenConfig.time); 
        });

        client.on('messageCreate', async (message) => { 
            if (message.content.toLowerCase() === 'info') { 
                await message.channel.send('Made by Vuvi - Join this server for updates: https://discord.gg/E8uq8Nbt'); 
            }
        });

        client.login(tokenConfig.token).catch(console.error);
    }
}

login();