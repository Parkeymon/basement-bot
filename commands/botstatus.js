module.exports = {
    name: 'botstatus',
    description: 'Changes the bots status.',
    aliases: [
        'changestatus'
    ],
    usage: '<status>',
    export(message, args) {
        if(message.author.id == '97795609674670080') {
            client.user.setActivity(args)
            console.log(`Changed bot status to: ${args}`)
        } else {
            message.channel.send('You are not Parkeymon!');
        }
    }
}