import React, { Component, useEffect, useState } from 'react'

import './Async.scss'

export default function AsyncComponent () {
  const [loading, setLoading] = useState(true)

  // componentDidMount
  useEffect(() => {
    load()
  }, [])

  // componentDidUpdate

  // methods
  const fakeResource = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: 'datum' }), 2000)
    })
  }

  const load = async () => {
    setLoading(true)

    await fakeResource()

    setLoading(false)
  }

  if (loading) {
    return null
  }

  return (
    <div className='async-css'>
      {loading ? 'Loading...' : 'Done...'}
    </div>
  )
}
