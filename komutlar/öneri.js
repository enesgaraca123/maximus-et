const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  

let PinkAdam1 = args.slice(0).join(' ')

  
const PinkAdam31 = new Discord.MessageEmbed()
 .setTimestamp()

if (!PinkAdam1) return message.reply('**Lütfen Hata,Öneri ve Bugları Belirtiniz Lütfen Trol Amaçlı Kullanmayınız**')
  
  message.reply('**Hata,Öneri ve Bugu Geliştiricilerime Bildirdim! Hata,Öneri ve Bugu Bildirdiğin İçin Teşekkür Ederiz**')
  const pinkdayi = new Discord.MessageEmbed()
  .setTitle('Hata,Öneri ve Bug Var!')
  .setTimestamp()
  .setColor("RED")
  .setFooter('Beta Bot Hata,Öneri ve Bugu Sistemi')
  .addField('Hata,Öneri ve Bugu Bulan  Kişi', `<@${message.author.id}>`,true)
  .addField('Hata,Öneri ve Bug', PinkAdam1,true)
  client.channels.cache.get('792313472800784395').send(pinkdayi)
  
}
exports.conf = {
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "bildir"
}