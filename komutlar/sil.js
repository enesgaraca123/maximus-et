const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json")
exports.run = async(client, maximus, args) => {

if(!maximus.member.permissions.has("MANAGE_MESSAGES")) return maximus.reply(" Yeterli yetkiye sahip değilsin!")
  
let msjsayısı = args[0]  
  
if(!msjsayısı) return maximus.channel.send("Lütfen doğru bir mesaj sayısı gir.Örnek: `!sil 8000`")  

if(isNaN(msjsayısı)) return maximus.channel.send("Lütfen doğru bir mesaj sayısı gir.Örnek: `!sil 8000`")  
 
if(msjsayısı >= 10000) return maximus.channel.send("**10.000** sayısından fazla silmen engellendi.!")  

if(msjsayısı < 2) return maximus.channel.send("**2** sayısından az silmen engellendi.!")  

if(msjsayısı < 99) {
maximus.channel.bulkDelete(msjsayısı)
  
maximus.channel.send("**"+msjsayısı+"** adet mesaj silindi!").then(s => s.delete(9000))  
return
} 
  
let sayı = msjsayısı.charAt(0)  

for (sayı = 0; sayı < 5; sayı++) {

maximus.channel.bulkDelete(99)  

} 
maximus.channel.send("**"+msjsayısı+"** adet mesaj silindi.")  
} 

// ANAN !
exports.conf = {
enabled: true, //Komutun Aktif Olup Olmamasını Ayarlarsınız! true: Aktif | false: Kapalı
guildOnly: false, //Komutun Sunucu Dışında Aktif Olup Olmamasını Ayarlarsınız! true: Aktif | false: Kapalı
aliases: [], //Ekstra Komut Anahtarları Gire Bilirsiniz! ["Anahtar-ismi"] Gibi
permLevel: 0 //Kullanım Seviyelerini Ayarlarsınız 0 Herkes Kullana Bilir Demektir!
};

exports.help = {
name: 'sil',
description: 'Komutun Açıklaması',
usage: 'sil'
}