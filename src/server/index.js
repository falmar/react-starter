import React from 'react'
import compression from 'compression'
import path from 'path'
import { Helmet } from 'react-helmet'
import fs from 'fs'
import { renderToPipeableStream } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from './../redux/configureStore'
import App from './../components/App'
import { StaticRouter } from 'react-router-dom/server'

// ------- EXPRESS
const express = require('express')
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

const clientHTML = fs.readFileSync(path.resolve(__dirname, 'index.html')).toString('utf8')

// REDUX MIDDLEWARE
app.use((req, res, next) => {
  if (path.extname(req.path)) {
    res.status(404)
    res.end()

    return
  }

  const store = configureStore({})

  // assume mobile
  req.locals = {
    store: store,
    routeContext: {
      originalUrl: req.originalUrl,
      origin: req.protocol + '://' + req.headers.host
    }
  }

  next()
})

app.get('/*', (req, res) => {
  const { store, routeContext } = req.locals
  const splitHTML = clientHTML.split('id=\'root\'>')

  let didError = false
  const stream = renderToPipeableStream(
    (
      <StaticRouter location={routeContext.originalUrl}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    ),
    {
      onShellReady () {
        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-type', 'text/html')

        const helmet = Helmet.renderStatic()

        splitHTML[0] = splitHTML[0].replace('<meta id=\'helmet-title\'>', helmet.title.toString())
          .replace('<meta id=\'helmet-meta\'>', helmet.meta.toString())
          .replace('<meta id=\'helmet-link\'>', helmet.link.toString())
          .replace('<meta id=\'helmet-script\'>', helmet.script.toString())

        res.write(splitHTML[0] + 'id="root">')

        stream.pipe(res)
      },
      onError (err) {
        didError = true
        console.error(err)
      },
      onAllReady () {
        // If you don't want streaming, use this instead of onShellReady.
        // This will fire after the entire page content is ready.
        // You can use this for crawlers or static generation.

        // res.statusCode = didError ? 500 : 200
        // res.setHeader('Content-type', 'text/html')
        // stream.pipe(res)

        res.write(splitHTML[1])
      }
    }
  )
})

const port = process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 3000)

app.listen(port, function () {
  console.log('listening on port', port)
})
