import React, { Component, useReducer, useCallback } from "react"
import { rootReducer } from "./reducer"

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, undefined, {
    type: "DUMMY_INIT"
  })
  const increment = useCallback((e) => dispatch({ type: "INCREMENT" }), [
    dispatch
  ])
  const decrement = useCallback((e) => dispatch({ type: "DECREMENT" }), [
    dispatch
  ])
  const updateValue = useCallback(
    (e) =>
      dispatch({
        type: "UPDATE_VALUE",
        value: e.target.value
      }),
    [dispatch]
  )
  return (
    <div className="App">
      <div>
        <h1>counter</h1>
        <div>count: {state.counter}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <div>
        <h1>Input foo</h1>
        <div>foo: {state.someNested.inputValue}</div>
        <input value={state.someNested.inputValue} onChange={updateValue} />
      </div>
    </div>
  )
}

export default App
