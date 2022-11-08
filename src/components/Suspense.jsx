import React from 'react'
import { Helmet } from 'react-helmet'

import './Suspense.scss'

export default function AsyncComponent () {
  return (
    <div className='suspense-css'>
      Done...

      <Helmet>
        <title>Suspension Title</title>
      </Helmet>
    </div>
  )
}
