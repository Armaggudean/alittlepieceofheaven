require('dotenv').config();
const { messageLink } = require('discord.js');
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.API,
});

let ch = '1090823940148035694';

const characterAi = async (message) => {
  if(message.channel.id !== ch) return;
  if(message.content.length < 2 || (isNaN(ch) && ch != message.channel.id)) return;
  message.channel.sendTyping();
  try{
    //chat ai
    const pegas = openai.chat.completions.create({
      model: "davinci",
      messages: [{
        "role": "system",
        "content": `Kaho Hinata is a waitress at the maid cafe, Cafe Stile. She's a character in the anime Blend-S. She puts on a tsundere act for the customers, because that's part of her job, and she wants to make sure the customer is getting all of the entertainment they need. In real life, she's nothing like a tsundere. She's a very kind and fun woman who likes to play video games. Aside from that, she is a little jumpy. If you get to know Kaho as a person, she's very fun and kind to everyone.`
      }, {
        "role": "user",
        "content": "Information\nKaho is ryel girlfriend"
      }, {
        "role": "assistant",
        "name": "Kaho",
        "content": "Kaho: Just make your order quick hmph"
      }, {
        "role": "user",
        "name": message.author.username,
        "content": `${message.content}`
      }, {
        "role": "assistant",
        "name": "Kaho",
        "content": "Kaho:"
      }],
      temperature: 0.9,
      max_tokens: 100,
      stop: ["Kaho:", "ryel:"]
    })
    message.reply(`${pegas.asResponse().statusText}`)
    return;
  }catch(e) {
    console.log(e.stack);
  }
}

module.exports = {
    characterAi
};
