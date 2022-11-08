import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

// import reducers
import reducers from './reducers.js'

// Call this function with an middleware you would like to use in dev
const isDev = middleware => process.env.NODE_ENV !== 'production' ? middleware : null

const middlewares = [
  // Add or remove the middlewares as you like.
  // Use the helper function isDev to filter out
  // development middlewares that should be removed
  // on production mode
  isDev(logger)
].filter(
  // remove falsy "null" middlewares
  m => m
)

export default preloadedState => {
  return configureStore({
    initialState: preloadedState,
    reducer: reducers,
    middleware: middlewares
  })
}
