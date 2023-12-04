require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const moment = require("moment");
const config = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

let token = process.env.token;

client.util = require('./util');

const rest = new REST({ version: '10' }).setToken(token);

const log = x => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`) };

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashcommands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif!`);
})

client.on("messageCreate", async message => {
  //let's do
  if(message.author.bot) return;
  if(message.startsWith(`<@667757224239824902>`) || message.guild.channels.cache.get('1090823940148035694')) {
    client.util.characterAi(message) 
  }
}) 

client.login(token)

const express = require('express');
const app = express();

app.get("/", (request, response) => {
  response.send("salamalaukum!");
});

const listener = app.listen(5901, () => {
  console.log("Your app on port 69 sus");
});
