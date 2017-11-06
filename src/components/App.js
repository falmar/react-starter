import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Home from './Home'
import Counter from './Counter'

const App = () => {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link> | <Link to='/counter'>Counter</Link>

        <Route path='/' exact render={Home} />
        <Route path='/counter' component={Counter} />
      </div>
    </Router>
  )
}

export default App
