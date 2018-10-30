import React, {
  Component,
  useReducer,
  useContext,
  createContext,
  useCallback
} from "react"
import { rootReducer } from "./reducer"

const ReducerContext = createContext()

const Counter = () => {
  const { state, increment, decrement } = useContext(ReducerContext)
  return (
    <div>
      <h1>counter</h1>
      <div>count: {state.counter}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
const InputValue = () => {
  const { state, updateValue } = useContext(ReducerContext)
  return (
    <div>
      <h1>Input foo</h1>
      <div>foo: {state.someNested.inputValue}</div>
      <input value={state.someNested.inputValue} onChange={updateValue} />
    </div>
  )
}

const Provider = ({ children }) => {
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
  const value = { state, increment, decrement, updateValue }
  return (
    <ReducerContext.Provider value={value}>{children}</ReducerContext.Provider>
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
