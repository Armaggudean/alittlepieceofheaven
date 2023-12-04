require('dotenv').config();
const { messageLink } = require('discord.js');
const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();

let ch = '1090823940148035694';

const characterAi = async (message) => {
  if(message.channel.id !== ch) return;
  message.content = message.content.replace(/^<@!?[0-9]{1,20}> ?/i, '');
  if(message.content.length < 2 || (isNaN(ch) && ch != message.channel.id)) return;
  message.channel.sendTyping();
  try{
    await characterAI.authenticateWithToken(process.env.caiToken)
    const chat = await characterAI.createOrContinueChat(process.env.caiId);
    const response = await chat.sendAndAwaitResponse(message.content, true)
    console.log(`${message.author.id}: ${message.content}\nKaho: ${response}`)
    message.reply(response)
  }catch(e) {
    console.log(e.stack);
  }
}

module.exports = {
    characterAi
};
