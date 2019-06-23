import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Counter.scss'

const Counter = ({ counter, increment, decrement }) => (
  <Fragment>
    <h1 className={(counter % 2 === 0 && 'blue') || undefined}>New Counter: {counter}</h1>
    <button onClick={increment}>+</button>
    &nbsp;
    <button onClick={decrement}>-</button>
  </Fragment>
)

Counter.propTypes = {
  counter: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func
}

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
