const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
require("moment-duration-format");
moment.locale("tr");

require("./util/eventLoader.js")(client);

var prefix = config.prefix;

const log = (message) => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
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

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === config.owner) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", (e) => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", (e) => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(config.token);

client.on("guildMemberAdd", async (member) => {
  member.addRole("771075040649019442");
  member.setNickname(`İsim | Yaş`);
  let uye = member.user;
  let time = new Date().getTime() - uye.createdAt.getTime();
  let security = [];
  if (time < 604800) {
    security = `<a:nope:772667251350437919> Kullanıcı Güvensiz!`;
  } else {
    security = `<a:yep:772664219287289869> Kullanıcı Güvenli!`;
  }
  let time2 = new Date().getTime() - uye.createdAt.getTime();
  const security2 = moment
    .duration(time2)
    .format(`YY [Yıl,] DD [Gün,] HH [Saat,] MM [Dakika,] SS [Saniye]`);
  const registerChat = member.guild.channels.find(
    (channel) => channel.id === `771076883173212217`
  );
  if (!registerChat) return;
  registerChat.send(
    "Sunucuzuma Yeni Bir Üye Dahil Oldu İlgilenin! <@&771075016648556564>"
  );
  const embed = new Discord.RichEmbed()
    .setTitle("SUNUCUMUZA HOŞGELDİN")

    .setDescription(
      `<a:rosette2:763292075051319296> Sunucumuza Hoşgeldin! ${member}
       <a:discordgif:763292119381049355> Seninle Beraber ${member.guild.memberCount} Kişi Olduk!
       <a:loading:763292113214767115> Kayıt Olman İçin <@&771075016648556564> Yetkilileri İlgilenecektir.

      **Hesap** **${security2}** **Önce Oluşturuldu.**
      **${security}**`
    )
    .setİmage("")
    .setFooter("Developer By RS")
    .setTimestamp()
    .setColor("RANDOM");
  registerChat.send(embed);
});
