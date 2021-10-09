require('dotenv').config();
const Discord = require('discord.js');
const botCommands = require('./commands');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
// bot.aliases = new Discord.Collection()

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();

  // const commandAlias = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  // if (!commandAlias) return;
  
  console.info(`Called command: ${command}, with args: ${args}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});
