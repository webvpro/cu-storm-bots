import { SlashCommandBuilder } from '@discordjs/builders';

const rolesCommand = new SlashCommandBuilder()
  .setName('listRolemMembers')
  .setDescription('List Members of a role')
  .addRoleOption((option) =>
    option
      .setName('Role')
      .setDescription('Create Members User Name List')
      .setRequired(true)
  );

export default rolesCommand.toJSON();