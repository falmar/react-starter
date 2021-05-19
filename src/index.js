import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

import configureStore from './redux/configureStore'

const preloadedState = window.__PRELOADED_STATE__ || {}
const store = configureStore(preloadedState)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
)
