import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Home from './Home'
import Counter from './Counter'
import Async from './Async'

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <Link to='/'>Home</Link> | <Link to='/counter'>Counter</Link> | <Link to='/async'>Async</Link>
        </div>

        <br />

        <Route path='/' exact render={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/async' component={Async} />
      </div>
    </Router>
  )
}

export default hot(module)(App)
