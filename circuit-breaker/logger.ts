import { Logger } from './type'

export class MonitoringLogger implements Logger {
  private static get timestamp(): string {
    return new Date().toISOString().split('.')[0]
  }

  public log(msg: string): void {
    console.log(`LOG-${MonitoringLogger.timestamp}:: ${msg}`)
  }
}
