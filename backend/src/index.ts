import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'
import { sendLog } from './broadcast'
import {OllamaService} from "./service/OllamaService";

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()
const app = new Hono()

app.use('*', cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
}))



const connections: Set<ServerWebSocket> = new Set()

function broadcast(message: Record<any, any>) {
  connections.forEach((ws) => ws.send(JSON.stringify(message) as string))
}

app.get('/', (c) => {
    const query = c.req.query();
    const url = new URL(c.req.url);
    console.log('Query parameters:', query);
    console.log('URL search:', url.search);
    console.log('URL searchParams:', Object.fromEntries(url.searchParams));
    broadcast(sendLog('Someone accessed the root path!'))
    return c.text('Hello Hono!')
})

app.get('/ollama/models', async (c) => {
    const models = await OllamaService.listLocalModels();
    return c.json(models);
})

app.get('/ollama/running', async (c) => {
    const models = await OllamaService.listRunningModels();
    return c.json(models);
})



app.get(
    '/ws',
    upgradeWebSocket((c) => {
      return {
        onOpen(event, ws) {
            connections.add(<ServerWebSocket<undefined>>ws.raw)
        },
        async onMessage(event, ws) {
            try {
                const { type, message } = JSON.parse(event.data as string);
                const handlers = {
                    AI: async (msg: string) => {
                        console.log('OK, processing your request...', type, message)
                        ws.send(JSON.stringify({ type: 'CHAT_START', message: 'Processing your request...' }));
                        for await (const chunk of OllamaService.streamChatResponse(msg)) {
                            if (chunk.response) {
                                ws.send(JSON.stringify({ type: 'CHAT_STREAM', message: chunk.response }));
                            }
                        }
                        ws.send(JSON.stringify({ type: 'CHAT_END', message: 'Response complete' }));
                    }
                }

                await (handlers[type])(message);
                console.log(type, message)
            } catch (error) {
                console.error('Error processing message:', error);
                ws.send(JSON.stringify({ type: 'ERROR', message: 'Error processing message' }));
            }
        },
      }
    })
)

export default {
  fetch: app.fetch,
  websocket,
}
