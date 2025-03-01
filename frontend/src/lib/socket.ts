import { writable } from 'svelte/store';

type Message = Record<string, unknown>;

export const WEBSOCKET_URL = 'ws://localhost:3000/ws';

export const isConnected = writable(false);
export const messages = writable<Message[]>([]);
export const responseString = writable('');

let ws: WebSocket | null = null;

const handleOpen = (): void => {
    console.log('WebSocket connection established');
    isConnected.set(true);
}

const handleClose = () => {
    isConnected.set(false);
    ws = null
    console.log('WebSocket connection closed');
}

const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log(data);
    switch (data.type) {
        case 'CHAT_START':
            responseString.set(''); // Clear the response at the start
            break;
        case 'CHAT_STREAM':
            responseString.update(value => value + data.message);
            break;
        case 'CHAT_END':
            break;
        default:
            console.log('Unknown message type:', data.type);
            break;
    }

    messages.update(items => {
        items.push(JSON.parse(event.data));
        return items;
    });
    console.log('Messages:', messages);
}

const sendMessage = (message: Message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not connected');
    }
};

export const socket = {
    sendMessage,
}

export const connect = () => {
    if (ws) return;
    ws = new WebSocket(WEBSOCKET_URL);
    ws.addEventListener('open', handleOpen);
    ws.addEventListener('close', handleClose);
    ws.addEventListener('message', handleMessage);
}

export const disconnect = () => {
    if (ws) ws.close();
};