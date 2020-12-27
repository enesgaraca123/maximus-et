const Discord = require('discord.js');

exports.run = async(client, message, args) => {
if (message.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new Discord.MessageEmbed()
                .setDescription(`Doğru kullanım: \`b!yavaş-mod [0/150]\``)
                .setColor('RANDOM')
                .setTimestamp()
            message.channel.send({embed})
            return
          }
if (limit > 100) {
    return message.channel.send(new Discord.MessageEmbed().setDescription("Süre limiti maksimum **100** saniye olabilir.").setColor('RANDOM'));
}
    message.channel.send(new Discord.MessageEmbed()
.setDescription(`Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`).
setColor('RANDOM'));
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yavaşmod" , "slowmode"],
  permLevel: 3,
};

exports.help = {
  name: 'yavaş-mod',
  description: 'Sohbete yazma sınır (süre) ekler.',
  }