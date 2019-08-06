import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from './redux/configureStore'

import App from '@components/App'

const preloadedState = window && (window.__PRELOADED_STATE__ || {})
const store = configureStore(preloadedState)

;(process.env.APP_SSR ? hydrate : render)(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , window.document.getElementById('root')
)
