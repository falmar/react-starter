import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { decrement, increment } from '../redux/counter'

import './Counter.scss'

export default function Counter () {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter)

  return (
    <>
      <h1
        className={classnames('counter', {
          'counter--blue': counter % 2 === 0
        })}
      >
        New Counter: {counter}
      </h1>
      <button onClick={() => dispatch(increment())}>( + )</button>
      &nbsp;
      <button onClick={() => dispatch(decrement())}>( - )</button>
    </>
  )
}

Counter.propTypes = {}
