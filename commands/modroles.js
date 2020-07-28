const guildConfig = require('../util/guildConfig.js');
const util = require('../lib/util.js');

exports.command = async (message, args, database, bot) => {
    //Permission check
    if (!message.member.hasPermission('MANAGE_GUILD')) {
        message.channel.send('You need the "Manage Server" Permission to use this command.');
        return;
    }

    let guildId = message.guild.id;
    let config = await util.getGuildConfig(message);
    let role;
    switch (args.shift()) {
      case 'add':
        //Get role
        role = message.guild.roles.resolve(util.roleMentionToId(args.shift()));
        if (!role) {
          await message.channel.send("Please specify a role! (@mention or ID)");
          return;
        }
        config.addModRole(role.id);
        await util.saveGuildConfig(config);
        await message.channel.send(`Added \`${role.name}\` as a moderator role!`);
        break;

      case 'remove':
        //Get role
        role = message.guild.roles.resolve(util.roleMentionToId(args.shift()));
        if (!role) {
          await message.channel.send("Please specify a role! (@mention or ID)");
          return;
        }

        if (!config.isModRole(role.id)) {
          await message.channel.send("That role is not a moderator role");
          return;
        }

        config.removeModRole(role.id);
        await util.saveGuildConfig(config);
        await message.channel.send(`Removed \`${role.name}\` from moderator roles!`);
        break;

      case 'list':
        //LIST
        break;
      default:
        await message.channel.send("Valid subcommands: add, remove, list");
    }

}

exports.names = ['modrole','modroles'];
