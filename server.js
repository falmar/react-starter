import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
//

import express from 'express'
import compression from 'compression'
import * as dotenv from 'dotenv'

import { createServer as createViteServer } from 'vite'

import configureStore from './src/redux/index.js'

// load .env
dotenv.config()

const isProd = process.env.NODE_ENV === 'production'

;(async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  // ------- EXPRESS
  const app = express()

  // ------- VITE
  let vite

  if (isProd) {
    // gzip
    app.use(compression())
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  // health check
  app.get('/healthz', function (req, res) {
    res.status(200)
    res.header('Content-Type', 'text/plain')
    res.send(null)
    res.end()
  })

  // static files
  const assetPath = isProd ? path.resolve(__dirname, 'dist', 'client', 'assets') : path.resolve(__dirname, 'src', 'assets')

  app.use('/assets', express.static(assetPath, { maxAge: '30d' }))

  const indexProd = isProd ? fs.readFileSync(path.resolve(__dirname, './dist/client/index.html'), 'utf-8') : ''

  app.disable('x-powered-by')
  app.enable('trust proxy')

  // REDUX MIDDLEWARE
  app.use((req, res, next) => {
    if (path.extname(req.path)) {
      res.status(404)
      res.end()

      return
    }

    const store = configureStore({})

    // Add
    req.locals = {
      store: store,
      routeContext: {
        originalUrl: req.originalUrl,
        origin: req.protocol + '://' + req.headers.host
      }
    }

    next()
  })

  app.use('*', async (req, res, next) => {
    try {
      let clientHTML = indexProd
      let render

      if (isProd) {
        render = (await import(path.resolve(__dirname, './dist/server/server.js'))).render
      } else {
        clientHTML = fs.readFileSync(path.resolve(__dirname, './index.html')).toString('utf8')
        clientHTML = await vite.transformIndexHtml(req.originalUrl, clientHTML)
        render = (await vite.ssrLoadModule(path.resolve(__dirname, './src/server.jsx'))).render
      }

      const splitHTML = clientHTML.split('<!--ssr-outlet-->')

      const { store, routeContext } = req.locals

      render({ splitHTML, store, routeContext, res })
    } catch (e) {
      if (!isProd) {
        vite.ssrFixStacktrace(e)
      }

      next(e)
    }
  })

  const port = process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 3000)

  app.listen(port, function () {
    console.log('listening on port', port)
  })
})()
