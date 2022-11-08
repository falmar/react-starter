import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'

import App from './components/App'

export async function render ({ splitHTML, store, res, routeContext }) {
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
        if (didError) {
          return
        }

        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-type', 'text/html')

        const helmet = Helmet.renderStatic()

        const state = JSON.stringify(store.getState())
        const storeTemplate = `<script>window.__PRELOADED_STATE__ = ${state}</script>`

        splitHTML[0] = splitHTML[0].replace('<meta id=\'helmet-title\'>', helmet.title.toString())
          .replace('<meta id=\'helmet-meta\'>', helmet.meta.toString())
          .replace('<meta id=\'helmet-link\'>', helmet.link.toString())
          .replace('<meta id=\'helmet-script\'>', helmet.script.toString())
          .replace('<script id=\'redux-store\'></script>', storeTemplate)

        res.write(splitHTML[0])

        stream.pipe(res)
      },
      onError (err) {
        didError = true
        res.status(500)
        res.send('Something went wrong...')
        console.error(err)
      },
      onAllReady () {
        if (didError) {
          return
        }

        // If you don't want streaming, use this instead of onShellReady.
        // This will fire after the entire page content is ready.
        // You can use this for crawlers or static generation.

        // res.statusCode = didError ? 500 : 200
        // res.setHeader('Content-type', 'text/html')
        // stream.pipe(res)

        // close html
        res.write(splitHTML[1])
      }
    }
  )
}
