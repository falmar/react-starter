import React, { Suspense, lazy } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Home from '@components/Home'
import Counter from '@components/Counter'
import Async from '@components/Async'

const Sus = lazy(() => import('@components/Suspense'))

const App = () => {
  return (
    <div>
      <div>
        <Link to='/'>Home</Link> |&nbsp;
        <Link to='/counter'>Counter</Link> |&nbsp;
        <Link to='/async'>Async</Link> |&nbsp;
        <Link to='/suspense'>Suspense</Link>
      </div>

      <Helmet>
        <title>React18 Starter!</title>
      </Helmet>

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/async' element={<Async />} />
        <Route
          path='/suspense'
          element={(
            <Suspense fallback='...loading'>
              <Sus />
            </Suspense>
          )}
        />
      </Routes>
    </div>
  )
}

export default App
