require('dotenv').config()
const cron = require('cron');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activities: [{ name: 'IG: @ubcoastronomy', type: 'WATCHING' }] });
});

const chart = 'https://www.cleardarksky.com/c/Kelownacsk.gif';
const channelId = '887543518854258710';
let scheduledMessage = new cron.CronJob('00 05 00 * * *', () => {
    //00 05 00 * * *
    // This runs every day at 00:05:00
    let channel = client.channels.cache.get(channelId);
    channel.send({
        content:`As of ${new Date().toString()}`,
        files: [{
            attachment: chart,
            name: 'chart.png'
        }]
    });
});

scheduledMessage.start()


client.on('messageCreate', msg => {
    if(msg.content === `<@!${client.user.id}>`) {
        msg.reply('Hi there')
        return;
    }
    if(msg.content.startsWith(process.env.PREFIX)) {
        const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        switch(command) {
            case "chart":
                msg.channel.send({
                    content:`As of ${new Date().toString()}`,
                    files: [{
                        attachment: chart,
                        name: 'chart.png'
                    }]
                });
                break;
        }
    }
});

client.login(process.env.TOKEN);
