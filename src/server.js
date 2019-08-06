import React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import fs from 'fs'
import path from 'path'
import compression from 'compression'
import { Provider } from 'react-redux'

import configureStore from './redux/configureStore'

import App from '@components/App'

const express = require('express')

const templateFn = ({ content, replaces }) => {
  const state = JSON.stringify(replaces.state)
  const storeTemplate = `<script>window.__PRELOADED_STATE__ = ${state}</script>`

  return (content || '')
    .replace('<div id=\'root\'></div>', `<div id='root'>${replaces.content}</div>`)
    .replace('<meta id=\'helmet-title\' />', replaces.helmet.title.toString())
    .replace('<meta id=\'helmet-meta\' />', replaces.helmet.meta.toString())
    .replace('<meta id=\'helmet-link\' />', replaces.helmet.link.toString())
    .replace('<script id=\'redux-store\'></script>', storeTemplate)
}
const preRender = (store, routeContext) => {
  const content = renderToString(
    <Provider store={store}>
      <Router location={routeContext.originalUrl} context={routeContext}>
        <App />
      </Router>
    </Provider>
  )

  const state = store.getState()

  return { content, state }
}

const clientHTML = fs.readFileSync(path.resolve(__dirname, 'index.html')).toString('utf8')

const app = express()

// gzip
app.use(compression())

// health check
app.get('/healthz', function (req, res) {
  res.status(200)
  res.header('Content-Type', 'text/plain')
  res.send(null)
  res.end()
})

// static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets'), { maxAge: '30d' }))

app.disable('x-powered-by')
app.enable('trust proxy')

// REACT ROUTES
app.use((req, res, next) => {
  if (path.extname(req.path)) {
    res.status(404)
    res.end()

    return
  }

  res.locals = {
    store: configureStore({}),
    routeContext: {
      originalUrl: req.originalUrl,
      origin: req.protocol + '://' + req.headers.host
    }
  }

  next()
})

// catch all
app.get('/*', (req, res) => {
  const routeContext = res.locals.routeContext
  const { content } = preRender(res.locals.store, routeContext)
  const helmet = Helmet.renderStatic()

  const replaces = {
    content,
    helmet,
    state: res.locals.store.getState()
  }

  res.send(templateFn({
    content: clientHTML,
    replaces
  }))
})

const port = process.env.APP_SSR ? 80 : 3000

app.listen(port, function () {
  console.log('listening on port', port)
})
