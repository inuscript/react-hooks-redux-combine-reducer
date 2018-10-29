import React, { Component, useReducer, useContext, createContext } from "react"
import { rootReducer } from "./reducer"

const ReducerContext = createContext(null)

const Counter = () => {
  return (
    <ReducerContext.Consumer>
      {({ state, dispatch }) => {
        return (
          <div>
            <h1>counter</h1>
            <div>count: {state.counter}</div>
            <button onClick={(e) => dispatch({ type: "INCREMENT" })}>+</button>
            <button onClick={(e) => dispatch({ type: "DECREMENT" })}>-</button>
          </div>
        )
      }}
    </ReducerContext.Consumer>
  )
}
const InputValue = () => {
  return (
    <ReducerContext.Consumer>
      {({ state, dispatch }) => {
        return (
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
        )
      }}
    </ReducerContext.Consumer>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, undefined, {})

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Counter />
        <InputValue />
      </div>
    </ReducerContext.Provider>
  )
}

export default App
