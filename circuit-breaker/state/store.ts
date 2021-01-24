import CircuitError from '../error/error'
import { State } from '../type'

export class StateStore {
  #state: State
  readonly #errors: Set<CircuitError>

  public constructor() {
    this.#state = 'Closed'
    this.#errors = new Set<CircuitError>()
  }

  public trip(err: Error | unknown) {
    this.#state = 'Open'
    this.#errors.add(new CircuitError(err as string))
  }

  public reset(): void {
    this.#errors.clear()
    this.#state = 'Closed'
  }

  public get size(): number {
    return this.#errors.size
  }

  public numberOfErrorsFrom(last: Date): number {
    const now = new Date()

    return Array.from(this.#errors.values()).filter(
      (err) => err.timestamp < now && err.timestamp > last,
    ).length
  }

  public get lastFailedTimestamp(): Date | undefined {
    if (this.#errors.size > 0) {
      return this.#errors.values().next().value.timestamp
    }

    return undefined
  }

  public isClosed(): boolean {
    return this.#state === 'Closed'
  }

  public isOpen(): boolean {
    return this.#state === 'Open'
  }

  public halfOpen(): void {
    this.#state = 'Half-Open'
  }

  public isHalfOpen(): boolean {
    return this.#state === 'Half-Open'
  }
}
