module.exports = {
    name: 'help',
    description: 'You IDIOT, why are you asking for help with the help command?',
    aliases: [
        'commands'
    ],
    execute(message, args, Discord, client, prefix){
        const data = [];
        const { commands } = message.client;
        
        if (!args.length){
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help <command name>\` to get info on a specific command!`);

            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('List of all Commands:')
            .setDescription(data, { split: true })

            return message.author.send(helpEmbed)
	            .then(() => {
		            if (message.channel.type === 'dm') return;
		            message.reply('I\'ve sent you a DM with all my commands!');
	            })
	            .catch(error => {
		            console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
		            message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
	});
}
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
	    return message.reply('that\'s not a valid command!');
}    
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    const helpcmdEmbed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`${command.name}`)
    .setDescription(data, { split: true});

    message.channel.send(helpcmdEmbed)
    //message.channel.send(data, { split: true });
    }
}