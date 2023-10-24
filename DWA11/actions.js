import { state } from './store.js'

export const increase = () => {
    return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + 1
        }
      }
}

export const decrease = () => {
    return {
      ...state,
      counter: {
        ...state.counter,
        value: state.counter.value - 1
      }
    }
  }

export const reset = () => {
    return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value = 0
        }
      }
}

export const getState = (state) => {
    return state
}