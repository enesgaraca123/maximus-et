
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const ayarlar = require("./ayarlar.json");
require("./util/eventLoader")(client);
const db = require("quick.db");
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`...`);
  console.error("---");

  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

let prefix = ayarlar.prefix;





console.log("Ben Şuan Aktifim...");
console.log("-------------------");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek. Benim babam ömerdir.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return message.author.send("**Beni Sunucuda Deneyin**");
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};






////////////////////////
client.on('message', msg => {

if (!msg.content.startsWith(prefix)) {
    return;
  }

  });



client.on('ready', ()=> {
client.user.setPresence({ activity: { name: `${client.guilds.cache.size} Sunucu | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı! | ${ayarlar.prefix}yardım` }, status: 'dnd'})
console.log(`${client.user.tag}! Aktif!`)
});


client.on("roleDelete", async role => {
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == role.guild.owner.id) return;
  if(!entry.executor.hasPermission('ROLE_DELETE')) {
      role.guild.roles.create({
    name: role.name,
    color: role.hexColor,
    permissions: role.permissions
  });
   let emran = new Discord.MessageEmbed()
   .setColor('0x36393E')
   .setTitle(`Bir rol silindi !`)
   .setDescription(`Silinen rol adı ${role.name}, Rol koruma sistemi açık olduğu için rol geri oluşturuldu!`)
   client.channels.cache.get(kanal).send(emran)
  }
});





client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = ' Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = ' Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});



client.on("roleDelete", async (role) => {
  let guild = role.guild;
  if(!guild.me.hasPermission("MANAGE_ROLES")) return;
  let koruma = db.fetch(`korumaacik_${role.guild.id}`)
  if(koruma == null) return; 
  let e = await guild.fetchAuditLogs({type: 'ROLE_DELETE'});
  let member = guild.members.get(e.entries.first().executor.id);
  if(!member) return;
  if(member.hasPermission("ADMINISTRATOR")) return;
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  }).then(rol => {
    if(!db.has(`korumalog_${guild.id}`)) return;
    let logs = guild.channels.find(ch => ch.id === db.fetch(`korumalog_${guild.id}`));
    if(!logs) return db.delete(`korumalog_${guild.id}`); else {
      const embed = new Discord.RichEmbed()
      .setDescription(`Silinen Rol: <@&${rol.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`)
      .setColor('RED')
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      logs.send(embed);
    }
})
  
  
  
})
client.on("channelDelete", async channel => {
  if(!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  let guild = channel.guild;
  const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' })
  let member = guild.members.get(logs.entries.first().executor.id);
  if(!member) return;
  if(member.hasPermission("ADMINISTRATOR")) return;
  channel.clone(channel.name, true, true, "Kanal silme koruması sistemi").then(async klon => {
    if(!db.has(`korumalog_${guild.id}`)) return;
    let logs = guild.channels.find(ch => ch.id === db.fetch(`korumalog_${guild.id}`));
    if(!logs) return db.delete(`korumalog_${guild.id}`); else {
      const embed = new Discord.RichEmbed()
      .setDescription(`Silinen Kanal: <#${klon.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`)
      .setColor('RED')
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      logs.send(embed);
    }
    await klon.setParent(channel.parent);
    await klon.setPosition(channel.position);
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı :tada:! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('**Bu Sunucuda** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem İzin Vermem ? !**').then(msg => msg.delete(3000));
   
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });



client.on("messageUpdate", msg => {
 
 
 const i = db.fetch(`${msg.guild.id}.motion`)
    if (i) {
        const motion = ["oç", "amk", "ananı sikiyim","piç","orospu çocuğu","orospu","kahbe","kahpe","ebeni sikim","anneni sikeyim","göt","o.ç","annen"];
        if (motion.some(motion => msg.content.includes(motion))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                         
                      return msg.reply(`${msg.author.tag}, **Hey Dostdum Bu Sunucuda Küfür Söylemek Yasak!** `).then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});






client.on('guildCreate', guild => {

let rrrsembed = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle(" Bot Eklendi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get('792322474322034688').send(rrrsembed);

});




client.on("guildMemberAdd", member => {
  let rol = db.fetch(`autoRole_${member.guild.id}`);
if (!rol) return;
  let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`);
  if (!kanal) return;

  member.roles.add(member.guild.roles.cache.get(rol));
  let embed = new Discord.MessageEmbed()
    .setDescription(
      "> :moneyGF: **Sunucuya yeni katılan** **" +
        member.user.username +
        "** **Kullanıcısına** <@&" +
        rol +
"> **Rolü verildi** :thumbsup:"
    )
    .setColor("RANDOM"); //.setFooter(`<@member.id>`)
  member.guild.channels.cache.get(kanal).send(embed);
});





client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Hoşgeldin');      
      } 
      }
    });







client.on("guildMemberAdd", async (member, message, msg) => {
  const fakehesapp = db.fetch(`fake_${member.guild.id}`);

  if (fakehesapp == "açık") {
    var moment = require("moment");
    require("moment-duration-format");
    moment.locale("tr");
    var { Permissions } = require("discord.js");
    var x = moment(member.user.createdAt)
      .add(30, "days")
      .fromNow();
    var user = member.user;
    x = x.replace("birkaç saniye önce", " ");
    if (!x.includes("önce") || x.includes("sonra") || x == " ") {
      let rol = db.fetch(`fakerol_${member.guild.id}`);
      member.user.send(
        "Hesabınız 30 günden önce açıldığı için cezalıya atıldınız, yetkililere bildirerek açtırabilirsiniz."
      );

      
      let kanalcık = await db.fetch(`fakekanal_${member.guild.id}`);
      let kanal = member.guild.channels.cache.find(r => r.id === kanalcık);
      
      
      const embedd = new Discord.MessageEmbed()
      .setTitle("Fake hesap yakalandı!")
        .setTimestamp()
        .setDescription(
          `Bir fake hesap sisteme yakalandı ve rolü verildi. **${member}**`)
        .setTimestamp()
        .setColor("#E8C02A");
      kanal.send(embedd);
      member.roles.add(rol);
    } else {
    }
  }
});


client.login(ayarlar.token)