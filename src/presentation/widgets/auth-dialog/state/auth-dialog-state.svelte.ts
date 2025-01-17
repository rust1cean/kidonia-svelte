export type AuthDialogState = 'idle' | 'awaiting';

export const createAuthDialogState = (defaultState: AuthDialogState) => {
  let state = $state<AuthDialogState>(defaultState);

  return {
    get currentState(): AuthDialogState {
      return state
    },

    get isIdle(): boolean {
      return state === 'idle'
    },

    get isAwaiting(): boolean {
      return state === 'awaiting'
    },

    changeToAwaiting() {
      state = "awaiting"
    },

    changeToIdle() {
      state = "idle"
    }
  }
}

export const authDialogState = createAuthDialogState('idle')
