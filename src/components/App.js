import React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import Counter from './Counter'

const App = () => {
  console.log('update app')
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        &nbsp;
        <Link to='/counter'>Counter</Link>

        <Route path='/' exact render={() => (
          <div>
            <h1>React Starter </h1>
          </div>
          )} />
        <Route path='/counter' component={Counter} />
      </div>
    </Router>
  )
}

export default App
