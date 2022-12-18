import Events from '../types'

export type IdleState = 'active' | 'idle' | 'locked'

export type IdleStateOnStateChangedFn = (newState: IdleState) => void

export type IdleStateOnStateChanged = Events<IdleStateOnStateChangedFn>

export interface IdleTypes {
  queryState(detectionIntervalInSeconds: number): Promise<IdleState>

  setDetectionInterval(intervalInSeconds: number): void

  onStateChanged: IdleStateOnStateChanged
}

export interface IdleAPI {
  queryState(
    detectionIntervalInSeconds: number,
    callback: (newState: string) => void,
  ): void
  setDetectionInterval(intervalInSeconds: number): void

  onStateChanged: IdleStateOnStateChanged
}

export interface ChromeIdleAPI {
  queryState(
    detectionIntervalInSeconds: number,
    callback: (newState: string) => void,
  ): void
  setDetectionInterval(intervalInSeconds: number): void

  onStateChanged: chrome.idle.IdleStateChangedEvent
}

export class Idle implements IdleTypes {
  private idle: ChromeIdleAPI
  public onStateChanged: IdleStateOnStateChanged

  constructor(idle: ChromeIdleAPI = chrome.idle) {
    this.idle = idle
    this.onStateChanged = {
      addListener(callback: IdleStateOnStateChangedFn): void {
        idle.onStateChanged.addListener((newState: string) => {
          callback(newState as IdleState)
        })
      },
      hasListener(callback: IdleStateOnStateChangedFn): boolean {
        return idle.onStateChanged.hasListener((newState: string) => {
          callback(newState as IdleState)
        })
      },
      removeListener(callback: IdleStateOnStateChangedFn): void {
        idle.onStateChanged.removeListener((newState: string) => {
          callback(newState as IdleState)
        })
      },
    }
  }

   
  queryState(detectionIntervalInSeconds: number): Promise<IdleState> {
    return new Promise(resolve => {
      this.idle.queryState(detectionIntervalInSeconds, newState => {
        resolve(newState as IdleState)
      })
    })
  }

  setDetectionInterval(intervalInSeconds: number): void {
    this.idle.setDetectionInterval(intervalInSeconds)
  }
}