import { Command } from '../type'
import { State } from './state'

export class ClosedState extends State {
  public async handle(cmd: Command): Promise<void> {
    if (this.stateStore.isClosed()) {
      try {
        await cmd.execute()
      } catch (e) {
        this.stateStore.trip(e)

        this.logger.log(`error in 'Closed' state`)
        if (e instanceof Error) {
          this.logger.log(e.message)
        }
      }
    }
  }
}
