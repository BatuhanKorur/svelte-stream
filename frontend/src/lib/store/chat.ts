import {writable} from 'svelte/store';

type ChatMessage = {
    response: string;
    done: boolean;
    info?: any;
}

export const selectedModel = writable<string | null>(null);
export const chatMessages = writable<ChatMessage[]>([]);
export const isChatting = writable(false);
let currentIndex = -1;

export const handleChatStream = (data: { type: string, message: string | {}, info: any }) => {
    switch (data.type) {
        case 'CHAT_START':
            isChatting.set(true);
            chatMessages.update((msgs) => {
                msgs.push({
                    response: '',
                    done: false
                })
                currentIndex = msgs.length - 1;
                return msgs;
            });
            break;
        case 'CHAT_STREAM':
            chatMessages.update((msgs) => {
                if (currentIndex >= 0) {
                    msgs[currentIndex].response += data.message;
                }
                console.log(msgs[currentIndex].response);
                return msgs;
            });
            break;
        case 'CHAT_METADATA':
            chatMessages.update((msgs) => {
                console.log('Received chat.ts CHAT_METADATA:', data.message);
                if (currentIndex >= 0) {
                    msgs[currentIndex].info = data.message;
                }
                return msgs;
            });
            break;
        case 'CHAT_END':
          isChatting.set(false);
            chatMessages.update((msgs) => {
                if (currentIndex >= 0) {
                    msgs[currentIndex].done = true;
                }
                return msgs;
            });
            break;
        default:
            console.log('Unknown chat message type:', data.type);
            break;
    }
}