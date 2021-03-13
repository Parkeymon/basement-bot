const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
const prefix = config.BotPrefix;
client.commands = new Discord.Collection();

//Gets commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//handle le commands
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().trim().toLowerCase();

    try{
    const handler = client.commands.get(command)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (!command) return;
    if(handler) handler.execute(message, args, Discord, client, prefix);
    }
    catch(error){
        console.error(error);
        message.channel.send('An error occured.')
    }
});

//Welcome message.
client.on('guildMemberAdd', member => {
    let welcomeChannel = member.guild.channels.get('820111572608483368')

    welcomeChannel.send(`${member} has fallen down the stairs and in to Parkeymons basement! I'm sorry but there is no escaping now...`)
});

//Log bot ready set status
client.on('ready', () => {
    client.user.setActivity('YOU WILL NEVER BE FREE', { type: 'PLAYING'});
    console.log('Bot online.');
});


client.login(config.bottoken);