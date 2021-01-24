import { Command } from '../type'
import { State } from './state'

export class HalfOpenState extends State {
  public async handle(cmd: Command): Promise<void> {
    if (this.stateStore.isHalfOpen()) {
      try {
        await cmd.execute()

        this.stateStore.reset()
        this.logger.log('state changed to `Closed`')
      } catch (e) {
        this.stateStore.trip(e)

        this.logger.log('state changed from `Half Open` to `Open`')
      }
    }
  }
}
