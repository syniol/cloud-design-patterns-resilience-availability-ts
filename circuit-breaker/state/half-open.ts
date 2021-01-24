import { Command, Logger } from '../type'
import { StateStore } from './store'
import { StateHandler } from './type'

export class HalfOpenState implements StateHandler {
  #stateStore: StateStore
  #logger: Logger

  public constructor(stateStore: StateStore, logger: Logger) {
    this.#stateStore = stateStore
    this.#logger = logger
  }

  public async handle(cmd: Command): Promise<void> {
    if (this.#stateStore.isHalfOpen()) {
      try {
        await cmd.execute()

        this.#stateStore.reset()
        this.#logger.log('state changed to `Closed`')
      } catch (e) {
        this.#stateStore.trip(e)

        this.#logger.log('state changed from `Half Open` to `Open`')
      }
    }
  }
}
