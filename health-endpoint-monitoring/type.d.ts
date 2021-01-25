export declare type MonitoringStatus = 'fail' | 'warn' | 'pass'
export declare type SupportedServices = 'mongodb'
export declare type MonitoringDetails = {
  service: SupportedServices
  status: MonitoringStatus
}

export declare interface MonitoringResponse {
  status: MonitoringStatus
  details?: MonitoringDetails[]
}

export declare interface HealthChecker {
  isHealthy(): Promise<boolean>
}
