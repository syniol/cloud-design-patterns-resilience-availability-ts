import CircuitBreaker from './circuit-breaker'
import { Command, Logger } from './type'
import { StateStore } from './state'
import { MonitoringLogger } from './logger'

describe('Circuit Breaker Pattern', () => {
  let sut: CircuitBreaker

  let stateStore: StateStore
  let logger: Logger

  describe('given command is executed without any error', () => {
    const commandMock: jest.Mock<Command> = jest.fn()

    beforeAll(() => {
      stateStore = new StateStore()
      logger = new MonitoringLogger()

      commandMock.mockImplementation(() => ({
        execute(): Promise<void> {
          return jest.fn().mockResolvedValue(undefined)()
        },
      }))

      sut = new CircuitBreaker(stateStore, logger)
    })

    afterAll(() => {
      commandMock.mockReset()
    })

    it('should execute', async (done: jest.DoneCallback) => {
      expect(await sut.execute(commandMock())).toEqual(undefined)

      done()
    })
  })
})
