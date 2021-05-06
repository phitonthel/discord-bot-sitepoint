const { prefix } = require('../config.json');

module.exports = {
  name: `${prefix}help`,
  description: 'List all of my commands or info about a specific command.',
  aliases: ['how', 'commands'],
  usage: '[command name]',
  execute(msg, args) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      data.push('Here\'s a list of all my commands:');
      data.push(commands.map(command => command.name).join(', '));
      data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

      return msg.channel.send(data);

      // return msg.author.send(data, { split: true })
      //   .then(() => {
      //     if (msg.channel.type === 'dm') return;
      //     msg.reply('I\'ve sent you a DM with all my commands!');
      //   })
      //   .catch(error => {
      //     console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
      //     msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
      //   });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply('that\'s not a valid command!');
    }

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    msg.channel.send(data, { split: true });


  }
};

// module.exports = {
//   name: '...help',
//   description: 'Readme!',
//   execute(msg, args) {

//     const monteMessage = `\`\`\`ts
// MONTE
//   <> monte nTry:number attempts:number prob:number
//     limit nTry: 10000
//     limit attempts: 500
//     limit prob: 1\`\`\``

//     const memesMessage = `\`\`\`ts
// MEMES
//   <> -m
//     arguments:
//     * ucthat
//     * stinks
//     * rngesus
//     * why\`\`\``

//     const messages = `List of All Available Commands: ${monteMessage} ${memesMessage}`
//     msg.channel.send(messages);
//   },
// };
