import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

import configureStore from './redux'

const preloadedState = window.__PRELOADED_STATE__ || {}
const store = configureStore(preloadedState)

const C = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

if (!import.meta.env.SSR) {
  createRoot(document.getElementById('root')).render(C)
} else {
  hydrateRoot(document.getElementById('root'), C)
}
