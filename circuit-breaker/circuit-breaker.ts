import { ClosedState } from './state'
import { Command, Logger } from './type'
import { OpenState } from './state'
import { StateHandler } from './state/type'
import { StateStore } from './state'
import { HalfOpenState } from './state'

export default class CircuitBreaker {
  readonly #closedStateHandler: StateHandler
  readonly #openStateHandler: StateHandler
  readonly #halfOpenStateHandle: StateHandler

  public constructor(stateStore: StateStore, logger: Logger) {
    this.#closedStateHandler = new ClosedState(stateStore, logger)
    this.#openStateHandler = new OpenState(stateStore, logger)
    this.#halfOpenStateHandle = new HalfOpenState(stateStore, logger)
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
