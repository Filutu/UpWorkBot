// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
const Command = require("../base/Command.js");

class SetCMD extends Command {
  constructor(client) {
    super(client, {
      name: "set",
      description: "View or change settings for your server.",
      category: "System",
      usage: "set <view/get/edit> <key> <value>",
      guildOnly: true,
      aliases: ["setting", "settings"],
      permLevel: "Administrator"
    });
  }

  async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars


    const settings = message.settings;
    const defaults = this.client.settings.get("default");
    const overrides = this.client.settings.get(message.guild.id);
    if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});
  
    
    if (action === "edit") {
   
      if (!key) return message.reply("Please specify a key to edit");
     
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      
      const joinedValue = value.join(" ");
      if (joinedValue.length < 1) return message.reply("Please specify a new value");
      
      if (joinedValue === settings[key]) return message.reply("This setting already has that value!");

      
      if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});

    
      this.client.settings.set(message.guild.id, joinedValue, key);
      message.reply(`${key} successfully edited to ${joinedValue}`);
    } else
  
   
    if (action === "del" || action === "reset") {
      if (!key) return message.reply("Please specify a key to delete (reset).");
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      if (!overrides[key]) return message.reply("This key does not have an override and is already using defaults.");

      const response = await this.client.awaitReply(message, `Are you sure you want to reset \`${key}\` to the default \`${defaults[key]}\`?`);

   
      if (["y", "yes"].includes(response)) {

       
        this.client.settings.delete(message.guild.id, key);
        message.reply(`${key} was successfully reset to default.`);
      } else

  
      if (["n","no","cancel"].includes(response)) {
        message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
      }
    } else
  
 
    if (action === "get") {
      if (!key) return message.reply("Please specify a key to view");
      if (!settings[key]) return message.reply("This key does not exist in the settings");
      message.reply(`The value of ${key} is currently ${settings[key]}`);
      
    } else {
    
      const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Current Guild Settings =\n${array.join("\n")}`, {code: "asciidoc"});
    }
  }
}

module.exports = SetCMD;