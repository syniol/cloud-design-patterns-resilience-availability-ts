import { Command, Logger } from '../type'
import { StateStore } from './store'
import { StateHandler } from './type'

export abstract class State implements StateHandler {
  protected stateStore: StateStore
  protected logger: Logger

  public constructor(stateStore: StateStore, logger: Logger) {
    this.stateStore = stateStore
    this.logger = logger
  }

  abstract handle(cmd: Command): Promise<void>
}
