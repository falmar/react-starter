import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Home from './Home'
import Counter from './Counter'
import Async from './Async'

const App = () => {
  return (
    <div>
      <div>
        <Link to='/'>Home</Link> | <Link to='/counter'>Counter</Link> | <Link to='/async'>Async</Link>
      </div>

      <br />

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/async' element={<Async />} />
      </Routes>
    </div>
  )
}

export default App
