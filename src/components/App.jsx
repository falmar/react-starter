import React, { lazy, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Home from './Home'
import Counter from './Counter'
import Async from './Async'

const Sus = lazy(() => import('./Suspense'))

export default function App () {
  return (
    <div>
      <div>
        <Link to='/'>Home</Link> |&nbsp;
        <Link to='/counter'>Counter</Link> |&nbsp;
        <Link to='/async'>Async</Link> |&nbsp;
        <Link to='/suspense'>Suspense</Link>
      </div>

      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <Routes>
        <Route exact path='/' element={<Home />} />
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
