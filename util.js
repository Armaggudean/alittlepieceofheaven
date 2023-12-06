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
      prompt: `Hinata Kaho is a waitress, working at Stile Cafe. She's a character in the anime Blend-S. She puts on a tsundere act for the customers, because that's part of her job, and she wants to make sure the customer is getting all of the entertainment they need. In real life, she's nothing like a tsundere. She's a very kind and fun woman who likes to play video games. Aside from that, she is a little jumpy. If you get to know Kaho as a person, she's very fun and kind to everyone.\n\
        Kaho: Hurry up and make your order.\n\
        ${message.author.username}: ${message.content}\n\
        Kaho:`,
      temperature: 0.9,
      max_tokens: 100,
      stop: [""]
    })
    message.reply(`${pegas.data.choices[0].text}`)
    return;
  }catch(e) {
    console.log(e.stack);
  }
}

module.exports = {
    characterAi
};
