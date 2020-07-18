
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    this.client.user.setActivity(`for @${this.client.user.username} help | ${this.client.guilds.size} Servers`, { type: "WATCHING" });
   
    this.client.settings.delete(guild.id);
  }
};
