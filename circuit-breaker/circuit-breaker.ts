import { ClosedState } from './state'
import { Command, Logger } from './type'
import { OpenState } from './state'
import { StateHandler } from './state/type'
import { StateStore } from './state'
import { HalfOpenState } from './state'

export default class CircuitBreaker {
  readonly #logger: Logger
  readonly #stateStore: StateStore
  readonly #closedStateHandler: StateHandler
  readonly #openStateHandler: StateHandler
  readonly #halfOpenStateHandle: StateHandler

  public constructor(stateStore: StateStore, loggerService: Logger) {
    this.#logger = loggerService
    this.#stateStore = stateStore

    this.#closedStateHandler = new ClosedState(stateStore, loggerService)
    this.#openStateHandler = new OpenState(stateStore, loggerService)
    this.#halfOpenStateHandle = new HalfOpenState(
      stateStore,
      loggerService,
    )
  }

  /**
   * @throws CircuitBreakerOpenStateError
   */
  public async execute(cmd: Command): Promise<void[]> {
    return Promise.all<void>([
      this.#closedStateHandler.handle(cmd),
      this.#openStateHandler.handle(cmd),
      this.#halfOpenStateHandle.handle(cmd),
    ])
  }
}
