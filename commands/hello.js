const Command = require("../base/Command.js");

class Hello extends Command {
  constructor(client) {
    super(client, {
      name: "chooseme",
      description: "says hello to user",
      usage: "chooseme",
      aliases: ["chooseme"]
    });
  }

  async run(message, [action, key, ...value], level) { 
    try {
     
      const msg = await message.channel.send("Hello!");
      const friendly = this.client.config.permLevels.find(l => l.level === level).name;
      
      msg.edit(`http://localhost:8080/dashboard/${message.channel.id}/roles` , );
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = Hello;