

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {

    const settings = this.client.getSettings(member.guild.id);
  

    if (settings.welcomeEnabled !== "true") return;


    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

 
    member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
  }
};
