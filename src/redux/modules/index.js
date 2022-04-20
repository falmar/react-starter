import { combineReducers } from 'redux'

export const increment = () => ({ type: 'INCREMENT' })
export const decrement = () => ({ type: 'DECREMENT' })

// import your reducers
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export default combineReducers({
  // remove this dumb reducer after placing your reducers
  counter
})
