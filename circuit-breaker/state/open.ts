import { Command } from '../type'
import { CircuitBreakerOpenStateError } from '../error'
import { State } from './state'

export class OpenState extends State  {
  private static get RetryThreshold(): number {
    return process.env?.RETRY_THRESHOLD
      ? Number(process.env.RETRY_THRESHOLD)
      : 5
  }

  private static get MaximumWaitingTimeInMinutes(): number {
    return process.env?.MAX_WAITNG_TIME_IN_MINUTES
      ? Number(process.env.MAX_WAITNG_TIME_IN_MINUTES)
      : 20
  }

  public async handle(cmd: Command): Promise<void> {
    if (this.stateStore.isOpen()) {
      const errDate = new Date(OpenState.MaximumWaitingTimeInMinutes)
      const errCount = this.stateStore.numberOfErrorsFrom(errDate)

      if (errCount > OpenState.RetryThreshold) {
        this.stateStore.halfOpen()

        this.logger.log('state has changed to `Half Open`')
      }
    }

    throw new CircuitBreakerOpenStateError(cmd)
  }
}
