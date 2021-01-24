import CircuitError from './error'
import { Command } from '../type'

export class CircuitBreakerOpenStateError extends CircuitError {
  readonly #cmd: Command

  public constructor(cmd: Command) {
    super('Failed due to open state')

    this.#cmd = cmd
  }

  get command(): Command {
    return this.#cmd
  }
}
