const Discord = require("discord.js");

exports.run = (client, message, args) => {
  const maximus = new Discord.MessageEmbed()
    .setColor("#00ee00")
    .setAuthor(`Beta Bot`, client.user.avatarURL)
    .addField(
      `> Neden Biz ?`,
      `**Çünkü işimizi en iyi şekilde yaptığımızı düşünüyoruz.**`
    )
    .addField(
      `> Botumuzu Davet Etmek isterseniz`,
      `[Botu Davet Et!](https://discord.com/oauth2/authorize?client_id=782131517069328395&scope=bot&permissions=8)`
    )
    .addField(
      `> Destek Sunucusuna Katılmak İsterseniz`,
      `[Destek Sunusu](https://discord.gg/ACJCBETmH7)`
    )
    .addField(
      `> Kod Paylaşım Sunusuna Katılmak İsterseniz`,
      `[Kod Paylaşım Sunucumuz](https://discord.gg/maximusboys)`
    )
    .addField(
      `> Kod Sitemize Göz Atmak isterseniz`,
      `[Kod Sitemiz](https://maximuscode.tk)`
    )
.setImage('https://cdn.discordapp.com/attachments/785856261282725908/792347003157872640/standard_3.gif')
    .setThumbnail(
      "https://cdn.discordapp.com/emojis/670167074584395816.gif?v=1"
    );
  message.channel.send(maximus);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "",
  usage: ""
};