import { createServer, Server, ServerOptions } from 'https'
import { readFile } from 'fs'
import { promisify } from 'util'
import { IncomingMessage, ServerResponse } from 'http'
import { MonitoringResponse } from './type'

const readFileAsync = promisify(readFile)

export async function NewHealthEndpoint(): Promise<Server> {
  const opt: ServerOptions = {
    cert: await readFileAsync(`${__dirname}/cert/cert.pem`, 'utf8'),
    key: await readFileAsync(`${__dirname}/cert/key.pem`, 'utf8'),
  }

  return createServer(
    opt,
    (req: IncomingMessage, res: ServerResponse) => {
      if (req.method === 'GET' && req.url === '/health') {
        res.statusCode = 200
        res.end(
          {
            status: 'pass',
          } as MonitoringResponse,
          'utf8',
        )
        return
      }

      res.statusCode = 404
      res.end('not found', 'utf8')
    },
  )
}
