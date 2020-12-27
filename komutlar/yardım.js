const Discord = require("discord.js");
exports.run = (client, message) => {
  const motionEmbed = new Discord.MessageEmbed()

    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setColor("#140589")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/785856261282725908/792343583302221824/SPOILER_standard_2.gif" )
  .setImage('https://cdn.discordapp.com/attachments/785856261282725908/792347003157872640/standard_3.gif')
    .setDescription(
      `Toplamda Botta **${client.commands.size + 5}** Adet Komut Bulunuyor!` +
        "\n\n `b!istatistik` **Yazarak Botun İstatistiklerine Ulaşa Bilirsiniz.** \n `b!davet` **Yazarak Botun Davet Linkini Alırsınız.**"
    )
    .addField(
      `➤ Komutlar`,
      `
 
⛔ | **!moderasyon:** Moderasyon Komutlarını Gösterir.
👨‍💻 | **!istastik:** Botun İstastiklerini Gösterir.
✉️  | **!davet:** Kullanıcılar için Komutlarını Gösterir.` )

    .addField(
      "➤ Yardım & Hata & Bug  \n",
      " | **!bildir <mesaj>**:*Bug Bildirirsiniz Bot Destek Sunucusuna Ulaşır* "
    )

    .addField(
      `➤ Bilgilendirme`,
      `
⌛ | **Beta Bot Her Gün Güncelleniyor!**.
  **Botu Ekleyerek Bize Destek Çıkmış Olursunuz.** `
    )

    .addField(
      `**➤ Bağlantılar  **`,
      `>  » [Destek Sunucusu:](https://discord.gg/ACJCBETmH7) \n >  » [Kod Sitemiz](https://maximuscode.tk/) \n > » [Botun Davet Linki](https://discord.com/oauth2/authorize?client_id=782131517069328395&scope=bot&permissions=2147483647)`
    )
    .setFooter(
      `
${message.author.username} Tarafından İstendi.`,
      message.author.avatarURL
    );
  return message.channel.send(motionEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yardım"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: ".",
  usage: ""
};