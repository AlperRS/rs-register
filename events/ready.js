module.exports = (client) => {
  setInterval(function () {}, 8000);
  client.user.setPresence({
    game: {
      name: `MA 🖤 RS`,
      type: "WATCHING",
    },
    status: "dnd",
  });
  console.log(`MARS ACTIVE`);
};
