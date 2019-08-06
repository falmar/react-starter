import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { Link, Route } from 'react-router-dom'
import {Helmet} from 'react-helmet'

import Home from './Home'
import Counter from './Counter'
import Async from './Async'

const AppContent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home - React Starter</title>
      </Helmet>

      <div>
        <Link to='/'>Home</Link> | <Link to='/counter'>Counter</Link> | <Link to='/async'>Async</Link>
      </div>

      <br />

      <Route path='/' exact render={Home} />
      <Route path='/counter' component={Counter} />
      <Route path='/async' component={Async} />
    </Fragment>
  )
}

let App

if (process.env.APP_SSR) {
  App = AppContent
} else {
  App = hot(module)(AppContent)
}

export default App
