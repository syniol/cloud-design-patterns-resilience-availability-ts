import { NewHealthEndpoint } from './server'
import { Server } from 'https'

describe('Health Endpoint Monitoring', () => {
  const sut = NewHealthEndpoint
  const mockServerPort = 9982

  let server: Server

  beforeAll(async (done) => {
    server = await sut()
    server.listen(mockServerPort)
    done()
  })

  afterAll((done) => {
    server.close((e) => {
      done(e)
    })
  })

  describe('when server is instantiated', () => {
    it('should get response when query the `/health` endpoint', async (done: jest.DoneCallback) => {
      // todo: use https.request to send request to localhost:9981/health to expect a response
      const actual = '{}'

      expect(actual).toEqual({ status: 'pass' })

      done()
    })
  })
})
