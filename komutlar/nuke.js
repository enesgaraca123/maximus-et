const Discord = require('discord.js');

exports.run = (client, message, args) => {
message.channel.clone().then(MaximusBoyskanal => {
  let MaximusBoysposition = message.channel.position;
  MaximusBoyskanal.setPosition(MaximusBoysposition);
  message.channel.delete(); 
});

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
    name: 'nuke',


};