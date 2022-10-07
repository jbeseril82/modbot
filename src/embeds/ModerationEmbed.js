import {time, TimestampStyles} from 'discord.js';
import {resolveColor} from '../util/colors.js';
import {formatTime} from '../util/timeutils.js';
import KeyValueEmbed from './KeyValueEmbed.js';

export default class ModerationEmbed extends KeyValueEmbed {

    /**
     * @param {Moderation} moderation
     * @param {import('discord.js').User} user
     */
    constructor(moderation, user) {
        super();
        this.setTitle(`Moderation #${moderation.id} | ${moderation.action.toUpperCase()}`)
            .setColor(resolveColor(moderation.action))
            .setFooter({text: `${user.tag} - ${moderation.userid}`, iconURL: user.avatarURL()});

        this.addPair('Created at',  time(moderation.created, TimestampStyles.LongDate));
        if (moderation.action === 'strike') {
            this.addPair('Strikes', moderation.value);
        } else if (moderation.action === 'pardon') {
            this.addPair('Pardoned Strikes', -moderation.value);
        }

        if (moderation.expireTime) {
            this.addPair('Duration', formatTime(moderation.expireTime - moderation.created));
            this.addPair('Expires', time(moderation.expireTime, TimestampStyles.LongDate));
        }

        if (moderation.moderator) {
            this.addPair('Moderator', `<@!${moderation.moderator}>`);
        }

        this.addPair('Reason', moderation.reason);
    }
}
