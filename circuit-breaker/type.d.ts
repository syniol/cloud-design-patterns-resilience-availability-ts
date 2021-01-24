export declare type State = 'Open' | 'Closed' | 'Half-Open'

export declare interface Logger {
  log(arg: string): void
}

export declare interface Command {
  execute(): Promise<void>
}
