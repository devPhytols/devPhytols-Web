import { Client, Partials } from 'discord.js';

const client = new Client({
    intents: 3276799,
    partials: [Partials.Channel]
});

client.on('ready', () => {
    console.log(`O sistema foi iniciado em ${client.user?.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
});

client.login('TOKEN');

export default client;
