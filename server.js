import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
//

import express from 'express'
import compression from 'compression'

import { createServer as createViteServer } from 'vite'

// import configureStore from './src/redux/index.js'

async function createServer () {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  // ------- EXPRESS
  const app = express()

  // ------- VITE
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

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

  // REDUX MIDDLEWARE
  // app.use((req, res, next) => {
  //   if (path.extname(req.path)) {
  //     res.status(404)
  //     res.end()
  //
  //     return
  //   }
  //
  //   // const store = configureStore({})
  //
  //   // Add
  //   req.locals = {
  //     // store: store,
  //     routeContext: {
  //       originalUrl: req.originalUrl,
  //       origin: req.protocol + '://' + req.headers.host
  //     }
  //   }
  //
  //   next()
  // })

  app.use('*', async (req, res, next) => {
    try {
      let clientHTML = fs.readFileSync(path.resolve(__dirname, 'index.html')).toString('utf8')

      clientHTML = await vite.transformIndexHtml(req.originalUrl, clientHTML)

      const splitHTML = clientHTML.split('<!--ssr-outlet-->')

      const { render } = await vite.ssrLoadModule('/src/server.jsx')

      const routeContext = {
        originalUrl: req.originalUrl,
        origin: req.protocol + '://' + req.headers.host
      }

      render({ splitHTML, routeContext, res })
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  const port = process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 3000)

  app.listen(port, function () {
    console.log('listening on port', port)
  })
}

createServer()
