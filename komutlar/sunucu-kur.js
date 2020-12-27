const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(message.channel.type === "dm") return;
if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komut sunucu sahibine özeldir ')
    message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setTitle('Komut girişi').setDescription('Gerekli Kanallar Kurulsun mu?.').setFooter('Bu eylemi onaylıyorsan "evet" yazman yeterlidir.Bu eylem 30 saniye içinde sona erecek'))
.then(() => {
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 10000,
errors: ['time'],
})
.then((collected) => {
  message.guild.channels.map(c => c.delete())
  message.guild.roles.forEach(sil => {sil.delete()});    
  message.guild.channels.map(c => c.delete())
  message.guild.roles.forEach(sil => {sil.delete()});   
  message.guild.channels.map(c => c.delete())
  message.guild.roles.forEach(sil => {sil.delete()});   

  
  
  
  
  message.guild.createChannel('「BİLGİLENDİRME」', 'category', [{
       id: message.guild.id,
     }]);


  message.guild.createChannel(`📚│Kurallar`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「BİLGİLENDİRME」")))
  ////////////////////////////////
  message.guild.createChannel(`📣│Duyurular`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「BİLGİLENDİRME」")))
  ////////////////////////////////
  message.guild.createChannel(`🎉│Çekiliş`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「BİLGİLENDİRME」")))
////////////////////////////////////////
  
  
    message.guild.createChannel('「GENEL」', 'category', [{
       id: message.guild.id,
     }]);
  
  
  message.guild.createChannel(`💬│Sohbet`, 'text')
   
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「GENEL」")))


     //////////////////////////////////////////
  message.guild.createChannel(`🤖│Bot Komut`, 'text')
                              
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「GENEL」")))
  //////////////////////////////////////////
message.guild.createChannel(`📷│foto-sohbet`, 'text')
  
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "「GENEL」")))
  
  
  
  ///////////////////////////////////////////////////////////////
  message.guild.createChannel('「SUNUCU」', 'category', [{
       id: message.guild.id,
     }]);

  message.guild.createChannel(`🚪│gelen-giden`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「SUNUCU」")))
  ////////////////////////////////
   message.guild.createChannel(`💾│log-kanalı`, 'text')

    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「SUNUCU」")))
  ////////////////////////////////
   message.guild.createChannel(`📥│otorol`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「SUNUCU」")))
  ////////////////////////////////
   message.guild.createChannel(`📠│davet`, 'text')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「SUNUCU」")))
  ////////////////////////////////
       
  
  
  /////////////////////////////////////////////
  message.guild.createChannel('「SOHBET」', 'category', [{
       id: message.guild.id,
     }]);

message.guild.createChannel(`🔊 │ Genel Sohbet 1`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「SOHBET」")))
  ////////////////////////////////
    message.guild.createChannel(`🔊 │ Genel Sohbet 2`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「SOHBET」")))
  ////////////////////////////////
    message.guild.createChannel(`🔊 │ Genel Sohbet 3`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「SOHBET」")))
  ////////////////////////////////
  
  
  
  
   /////////////////////////////////////////////
  message.guild.createChannel('「MÜZİK」', 'category', [{
       id: message.guild.id,
     }]);

   message.guild.createChannel(`🎵 │ Müzik Odası 1`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「MÜZİK」")))
  ////////////////////////////////
    message.guild.createChannel(`🎵 │ Müzik Odası 2`, 'voice') //sa geldim ben aşkım :)
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「MÜZİK」")))
  ////////////////////////////////
    message.guild.createChannel(`🎵 │ Müzik Odası 3`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「MÜZİK」")))
  ////////////////////////////////


  
   /////////////////////////////////////////////
  message.guild.createChannel('「AFK」', 'category', [{
       id: message.guild.id,
     }]);

   message.guild.createChannel(`🌉 │ Afk`, 'voice')
     
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "「AFK」")))
  ////////////////////////////////
  message.guild.createRole({
        name: `「👑」Kurucu`,
        color: "#000001", 
        hoist: true,
        permissions: [
            "ADMINISTRATOR",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS",
        ]
    }).then(kurucurol => {
    message.guild.createRole({
        name: `「🌠」Admin`,
        color: "DARK",
        hoist: true,
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
        }).then(adminrol => {
    message.guild.createRole({
        name: `「🌠」Moderatör `,
        color: "GREEN" ,
        hoist: true,
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
        }).then(modrol => {
    message.guild.createRole({
        name: `「🚺」Bayan Üye`,
        color: '#00ffff',
        hoist: true
        }).then(destekrol => {
    message.guild.createRole({
        name: ` 「🚹」Üye`,
        color: "#000000" ,
        hoist: true
        }).then(özelrol => {
    message.guild.createRole({
        hoist: true,
        name: `「🤖」Bot `,
        color: "GREEN"



    })})})})})})
});
});
};

exports.conf = {  
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-kur"],
  permLevel: 3
};

exports.help = {
  name: 'sunucukur',
  description: 'Bot İçin gerekli kanlları kurar.',
  usage: 'sunucu-kur'
};