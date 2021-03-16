import { combineReducers } from 'redux'

// import your reducers
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 6
    case 'DECREMENT':
      return state - 2
    default:
      return state
  }
}

export default combineReducers({
  // remove this dumb reducer after placing your reducers
  counter
})
