import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './modules'

// Call this function with an middleware you would like to use in dev
const isDev = middleware => process.env.NODE_ENV !== 'production' ? middleware : null

const middlewares = applyMiddleware(
  ...[
    // Add or remove the middlewares as you like.
    // Use the helper function isDev to filter out
    // development middlewares that should be removed
    // on production mode
    isDev(logger),
    thunk
  ].filter(
    // remove falsy "null" middlewares
    middlware => middlware
  )
)

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, middlewares)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
