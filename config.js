const config = {

  "admins": [],

  "support": [],


  "token": "NzMyMjEyMzI4MTE5OTI2ODY0.XwxT-w.udCwfqk8YCJyNPUoYBonjLLQOH0",

  "dashboard" : {
    "oauthSecret": "s8F_7dtlL92jhGw7coYWRthqV6zLrLNN",
    "callbackURL": "http://localhost:8080/callback",
    "sessionSecret": "super-secret-session-thing",
    "domain": "localhost",
    "port": 8080
  },


  
  "defaultSettings" : {
    "prefix": "-",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "systemNotice": "true",
    "welcomeEnabled": "true",
    "welcomeChannel": "welcome",
    "welcomeMessage": "Say hello to {{user}} {{userID}}, everyone! We all need a warm welcome sometimes :D",
    "userId": "{{userID}}"
  },



  permLevels: [
   
    { level: 0,
      name: "User", 
     
      check: () => true
    },

   
    { level: 2,
     
      name: "Moderator",
   
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Server Owner", 
  
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },


    { level: 8,
      name: "Bot Support",
     
      check: (message) => config.support.includes(message.author.id)
    },

    
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner", 
     
      check: (message) => message.client.appInfo.owner.id === message.author.id
    }
  ]
};

module.exports = config;