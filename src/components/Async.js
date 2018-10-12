import React, { Component } from 'react'

class AsyncComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }

    this.load = this.load.bind(this)
  }

  componentDidMount () {
    this.load()
  }

  async load () {
    this.setState(old => ({ ...old, loading: true }))

    const { data } = await this.fakeResource()

    if (data === 'datum') {
      this.setState(old => ({ ...old, loading: false }))
    }
  }

  fakeResource () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: 'datum' }), 2000)
    })
  }

  render () {
    const { loading } = this.state

    return (
      <div>
        {loading ? 'Loading...' : 'Done...'}
      </div>
    )
  }
}

export default AsyncComponent
