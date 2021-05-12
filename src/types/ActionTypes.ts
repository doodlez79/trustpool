export interface ActionMetaPromise<T = number> {
  resolve?: () => void;
  reject?: (code?: T) => void;
}

export enum ERROR_ACTIONS {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  REPEAT= 'REPEAT'
}
