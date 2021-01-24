import { Command } from '../type'

export declare interface StateHandler {
  handle(cmd: Command): Promise<void>
}
