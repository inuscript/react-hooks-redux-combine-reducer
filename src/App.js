import React, {
  Component,
  useReducer,
  useContext,
  createContext,
  useMemo,
  useCallback,
  Suspence
} from "react"
import { rootReducer } from "./reducer"

const ReducerContext = createContext()

const useCounterContext = () => {
  const { state, dispatch } = useContext(ReducerContext)
  const counter = useMemo(() => state.counter, [state.counter])
  const increment = useCallback(
    (e) => setTimeout(() => dispatch({ type: "INCREMENT" }), 500),
    [dispatch]
  )
  const decrement = useCallback((e) => dispatch({ type: "DECREMENT" }), [
    dispatch
  ])

  return { counter, increment, decrement }
}

const Counter = () => {
  const { counter, increment, decrement } = useCounterContext()
  return (
    <div>
      <h1>counter</h1>
      <div>count: {counter}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

const useInputContainer = () => {
  const { state, dispatch } = useContext(ReducerContext)

  const updateValue = useCallback(
    (e) =>
      dispatch({
        type: "UPDATE_VALUE",
        value: e.target.value
      }),
    [dispatch]
  )
  const inputValue = useMemo(() => state.someNested.inputValue, [
    state.someNested.inputValue
  ])
  return {
    updateValue,
    inputValue
  }
}

const InputValue = () => {
  const { updateValue, inputValue } = useInputContainer()
  return (
    <div>
      <h1>Input foo</h1>
      <div>value: {inputValue}</div>
      <input value={inputValue} onChange={updateValue} />
    </div>
  )
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, undefined, {
    type: "DUMMY_INIT"
  })
  const value = { state, dispatch }
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
