import Bot from '../../bot/Bot.js';
import ErrorEventListener from './ErrorEventListener.js';
import BanRemoveEventListener from './BanRemoveEventListener.js';
import GuildDeleteEventListener from './GuildDeleteEventListener.js';
import LogJoinEventListener from './guildMemberAdd/LogJoinEventListener.js';
import RestoreMutedRoleEventListener from './guildMemberAdd/RestoreMutedRoleEventListener.js';
import GuildMemberRemoveEventListener from './GuildMemberRemoveEventListener.js';
import AutoModEventListener from './messageCreate/AutoModEventListener.js';
import AutoResponseEventListener from './messageCreate/AutoResponseEventListener.js';
import EventManager from '../EventManager.js';
import MessageDeleteEventListener from './MessageDeleteEventListener.js';
import MessageDeleteBulkEventListener from './MessageDeleteBulkEventListener.js';
import MessageUpdateEventListener from './MessageUpdateEventListener.js';
import WarnEventListener from './WarnEventListener.js';
import InteractionCreateEventListener from './interactionCreate/InteractionCreateEventListener.js';

export default class DiscordEventManager extends EventManager {

    subscribe() {
        const client = Bot.instance.client;
        for (const eventListener of this.getEventListeners()) {
            client.on(eventListener.name, this.notifyEventListener.bind(this, eventListener));
        }
    }

    getEventListeners() {
        return [
            new ErrorEventListener(),
            new BanRemoveEventListener(),
            new GuildDeleteEventListener(),
            new GuildMemberRemoveEventListener(),
            new WarnEventListener(),
            new InteractionCreateEventListener(),

            // members
            // join
            new LogJoinEventListener(),
            new RestoreMutedRoleEventListener(),

            // messages
            new AutoModEventListener(),
            new AutoResponseEventListener(),
            new MessageDeleteEventListener(),
            new MessageDeleteBulkEventListener(),
            new MessageUpdateEventListener(),
        ];
    }
}