import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'

import configureStore from './redux/configureStore'

const preloadedState = window.__PRELOADED_STATE__ || {}
const store = configureStore(preloadedState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
)
