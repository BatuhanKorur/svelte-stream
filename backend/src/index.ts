import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {createBunWebSocket} from 'hono/bun'
import type {ServerWebSocket} from 'bun'
import {sendLog} from './broadcast'
import {OllamaService} from './service/OllamaService'
import {nanoToSeconds} from './lib/utils'

const {upgradeWebSocket, websocket} = createBunWebSocket<ServerWebSocket>()
const app = new Hono()

app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
}))

const connections: Set<ServerWebSocket> = new Set()

function broadcast(message: Record<any, any>) {
  connections.forEach(ws => ws.send(JSON.stringify(message) as string))
}

app.get('/', (c) => {
  broadcast(sendLog('Someone accessed the root path!'))
  return c.text('Hello Hono!')
})

app.get('/ollama/models', async (c) => {
  const models = await OllamaService.listLocalModels()
  return c.json(models)
})

app.get('/ollama/running', async (c) => {
  const models = await OllamaService.listRunningModels()
  return c.json(models)
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
          const {type, message} = JSON.parse(event.data as string)
          const handlers = {
            AI: async (msg: string) => {
              ws.send(JSON.stringify({type: 'CHAT_START', message: 'Starting response'}))
              for await (const chunk of OllamaService.streamChatResponse(msg)) {
                if (chunk.done) {
                  ws.send(JSON.stringify({
                    type: 'CHAT_METADATA', message: {
                      created_at: chunk.created_at,
                      tokens_count: chunk.eval_count,
                      load_duration: nanoToSeconds(chunk.load_duration),
                      total_duration: nanoToSeconds(chunk.total_duration),
                    },
                  }))
                } else if (chunk.response) {
                  ws.send(JSON.stringify({type: 'CHAT_STREAM', message: chunk.response}))
                }
              }
              ws.send(JSON.stringify({type: 'CHAT_END', message: 'Response complete'}))
            },
          }

          // @ts-ignore
          await (handlers[type])(message)
          console.log(type, message)
        } catch (error) {
          console.error('Error processing message:', error)
          ws.send(JSON.stringify({type: 'ERROR', message: 'Error processing message'}))
        }
      },
    }
  }),
)

export default {
  fetch: app.fetch,
  websocket,
}
