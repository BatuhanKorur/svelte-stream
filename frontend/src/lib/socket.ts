import {writable} from 'svelte/store';
import {handleChatStream} from "$lib/store/chat";

type Message = Record<string, unknown>;

export const WEBSOCKET_URL = 'ws://localhost:3000/ws';
export const isConnected = writable(false);
export const messages = writable<Message[]>([]);

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

export const isChatting = writable(false);
const handleMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);
  if (['CHAT_START', 'CHAT_STREAM', 'CHAT_END', 'CHAT_METADATA'].includes(data.type)) {
    handleChatStream(data);
  }
  if (['SET_MODEL'].includes(data.type)) {
    console.log('SET_MODEL', data);
  } else {
    console.log('Unknown message type:', data.type);
  }
  messages.update(items => {
    items.push(JSON.parse(event.data));
    return items;
  });
}

const sendMessage = (message: Message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not connected');
  }
};

export const socket = {
  send: sendMessage,
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