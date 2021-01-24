export default class CircuitError extends Error {
  protected createdDateTime: Date

  public constructor(msg: string) {
    super(msg)

    this.name = 'Circuit Breaker Error'
    this.createdDateTime = new Date()
  }

  public get timestamp(): Date {
    return this.createdDateTime
  }
}
