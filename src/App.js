import React, { Component, useReducer } from "react"
import { rootReducer } from "./reducer"

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, undefined, {
    type: "DUMMY_INIT"
  })
  console.log(state)

  return (
    <div className="App">
      <div>
        <h1>counter</h1>
        <div>count: {state.counter}</div>
        <button onClick={(e) => dispatch({ type: "INCREMENT" })}>+</button>
        <button onClick={(e) => dispatch({ type: "DECREMENT" })}>-</button>
      </div>
      <div>
        <h1>Input foo</h1>
        <div>foo: {state.someNested.inputValue}</div>
        <input
          value={state.someNested.inputValue}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_VALUE",
              value: e.target.value
            })
          }
        />
      </div>
    </div>
  )
}

export default App
