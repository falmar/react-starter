import * as rtk from '@reduxjs/toolkit'

const { createSlice } = rtk.default ?? rtk

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
})

// import your reducers
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
