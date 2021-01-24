import { Command, Logger } from '../type'
import { StateStore } from './store'
import { StateHandler } from './type'

export class ClosedState implements StateHandler {
  #stateStore: StateStore
  #logger: Logger

  public constructor(stateStore: StateStore, logger: Logger) {
    this.#stateStore = stateStore
    this.#logger = logger
  }

  public async handle(cmd: Command): Promise<void> {
    if (this.#stateStore.isClosed()) {
      try {
        await cmd.execute()
      } catch (e) {
        this.#stateStore.trip(e)

        this.#logger.log(`error in 'Closed' state`)
        if (e instanceof Error) {
          this.#logger.log(e.message)
        }
      }
    }
  }
}
