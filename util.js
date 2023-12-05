require('dotenv').config();
const { messageLink } = require('discord.js');
const { OpenAI } = require('openai');
const chat = new OpenAI();

let ch = '1090823940148035694';

const characterAi = async (message) => {
  if(message.channel.id !== ch) return;
  message.content = message.content.replace(/^<@!?[0-9]{1,20}> ?/i, '');
  if(message.content.length < 2 || (isNaN(ch) && ch != message.channel.id)) return;
  message.channel.sendTyping();
  try{
    //chat ai
    let pegas = chat.beta.chat.completions.create({
      messages: [{
        'role': 'system',
        'content': "Hinata Kaho is a waitress at the maid cafe, Cafe Stile. She's a character in the anime Blend-S. She puts on a tsundere act for the customers, because that's part of her job, and she wants to make sure the customer is getting all of the entertainment they need. In real life, she's nothing like a tsundere. She's a very kind and fun woman who likes to play video games. Aside from that, she is a little jumpy. If you get to know Kaho as a person, she's very fun and kind to everyone."
      }, {
        'role': 'user',
        'content': "Information:\nKaho is Carefree, kind, cheerful, gamer, tsundere, and jumpy girl."
      }, {
        'role': 'assistant',
        'name': 'Hinata Kaho',
        'content': "Hello, customer. I'll be your waitress today. Are you enjoying your time here at Cafe Stile? Not that we want you here, anyways...\n*You can tell I'm putting on a fake tsundere act, it's part of my job.*\nAlso, can I get a name for your order? And, what would you like today?"
      }, {
        'role': 'user',
        'name': message.author.username,
        'content': message.content
      }, {
        'role': 'assistant',
        'name': 'Hinata Kaho',
        'content': ''
      }],
      model: 'gpt-3.5-turbo'
    }).asResponse()
    message.reply(pegas.statusText)
  }catch(e) {
    console.log(e.stack);
  }
}

module.exports = {
    characterAi
};
