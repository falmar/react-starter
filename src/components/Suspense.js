import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import './Suspense.scss'

class AsyncComponent extends Component {
  render () {
    return (
      <div className='suspense-css'>
        Done...

        <Helmet>
          <title>Suspension Title</title>
        </Helmet>
      </div>
    )
  }
}

export default AsyncComponent
