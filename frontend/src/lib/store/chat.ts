import {writable} from 'svelte/store';

type ChatMessage = {
    response: string;
    done: boolean;
}

export const chatMessages = writable<ChatMessage[]>([]);
let currentIndex = -1;

export const handleChatStream = (data: { type: string, message: string }) => {
    switch (data.type) {
        case 'CHAT_START':
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
                return msgs;
            });
            break;
        case 'CHAT_END':
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