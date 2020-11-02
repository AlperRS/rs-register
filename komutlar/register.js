const { RichEmbed } = require("discord.js");

exports.run = (client, message, args) => {
  const gender = args[1];
  const name = args[2];
  const age = args[3];
  const tag = "X";
  const Authorized = [
    "771075016648556564",
    "771635527031455785",
    "772851921487659028",
  ];
  const indifferent = "771075040649019442";
  const man = "771075005219995648";
  const girl = "771075011187965962";
  let member = message.mentions.users.first();
  let rs = message.guild.member(member);

  if (!rs) return message.reply("Kullanıcı Belirtin.");
  if (!gender) return message.reply("Cinsiyet Belirtin.");
  if (!name) return message.reply("İsim Belirtin.");
  if (!age) return message.reply("Yaş Belirtin.");
  if (!Authorized) return message.reply("Yetkiniz Yeterli Değil!");
  if (!indifferent) return message.reply("Kullanıcı Kayıt Edilmiş!");

  if (gender === "erkek") {
    rs.addRole(man);
  }
  rs.removeRole(indifferent);
  rs.setNickname(`${tag} ${name} ${age}`);

  if (gender === "kadın") {
    rs.addRole(girl);
  }
  rs.removeRole(indifferent);
  rs.setNickname(`${tag} ${name} ${age}`);

  const embed = new RichEmbed()
    .setTitle(`<a:yep:772664219287289869> Kullanıcı Başarı İle Kayıt Edildi`)
    .setDescription(
      `**❯Kayıt Olan Kullanıcı**\n ${rs}

    **❯Kullanıcı'nın İsmi**\n •${name} 

    **❯Kullanıcı'nın Yaşı**\n •${age}

    **❯Kullanıcı'nın Cinsiyeti**\n •${gender}

    **❯Kayıt Eden Yetkili**\n •${message.author}`
    )
    .setColor("RANDOM")
    .setFooter(`Developer By RS`)
    .setTimestamp();

  const logChannelID = "771076883173212217";
  const logChannel = client.channels.find(
    (channel) => channel.id === logChannelID
  );

  if (logChannel) logChannel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt"],
  permLevel: 0,
};

exports.help = {
  name: "Kayıt Sistemi",
  description: "Üyeleri Kayıt eder.",
  usage: "!kayıt @user erkek/kadın isim yaş",
};
