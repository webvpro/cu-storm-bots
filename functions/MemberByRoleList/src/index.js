import sdk from "node-appwrite";
import { 
    ActionRowBuilder,
    Client,
    Events,
    GatewayIntentBits,
    InteractionType,
    ModalBuilder,
    Routes,
    StringSelectMenuBuilder,
    TextInputBuilder,
    TextInputStyle,
  }
  from "discord.js";
import { REST } from '@discordjs/rest';

import RoleListMembersCommand from './commands/roleMemberList.js';


let client = null;
let rest = null;
// This is the entry point for our cloud function 
module.exports = async function (req, res) {
  if (client) {
    res.send("Already initialized");
    return
  }
  initClient(req);
  res.send("Initialized");
};

// This is run once to init the Discord.js client.
function initClient(req) {
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildPresences
    ]
  });
  rest = new REST({ version: '10' }).setToken(TOKEN);
  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    
    if (interaction.commandName === 'listmems') {
      await interaction.guild.members.fetch();
      const row = new ActionRowBuilder()
        .addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Select a role')
            .addOptions(
              interaction.guilds.cache
                .flatMap((guild) => guild.roles.cache)
                .map(role => ({ ['label']: role.name, ['value']: role.id }))
            ),
        );
  
      await interaction.reply({ content: 'List Members of ', components: [row] });
    }
  });

  client.login(req.env['DISCORD_TOKEN']);
}

