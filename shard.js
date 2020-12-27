const { ShardingManager } = require(`discord.js`)
const ayarlar = require(`./ayarlar.json`)

const shards = new ShardingManager(`./JokerAbi.js`, { //Ana Dosyanızın İsmini Giriniz.
  token : ayarlar.token,
  totalShards : 1 }); 

shards.on(`launch`, shard => {
console.log(`[${new Date().toString().split(` `, 5).join(` `)}] Shard: #${shard.id}`) })
          
shards.on(`message`, (shard, msg) => {
console.log(`[${new Date().toString().split(` `, 5).join(` `)}] #${shard.id} | ${msg._eval} | ${msg._result}`) });

shards.spawn()