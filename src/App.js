import React, { Component, useReducer, useContext, createContext } from "react"
import { rootReducer } from "./reducer"

const ReducerContext = createContext()

const Counter = () => {
  const { state, dispatch } = useContext(ReducerContext)
  return (
    <div>
      <h1>counter</h1>
      <div>count: {state.counter}</div>
      <button onClick={(e) => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={(e) => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  )
}
const InputValue = () => {
  const { state, dispatch } = useContext(ReducerContext)
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
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, undefined, {
    type: "DUMMY_INIT"
  })
  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  )
}

const App = () => {
  return (
    <Provider>
      <div className="App">
        <Counter />
        <InputValue />
      </div>
    </Provider>
  )
}

export default App
