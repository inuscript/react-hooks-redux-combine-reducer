import React, { useReducer, createContext, useMemo } from "react"
import { rootReducer } from "./reducer"

const ReducerContext = createContext(null)

const Counter = () => {
  return (
    <ReducerContext.Consumer>
      {({ state, dispatch }) => (
        <div>
          <div>count: {state.counter}</div>
          <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
          <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        </div>
      )}
    </ReducerContext.Consumer>
  )
}

const InputValue = ({ state, dispatch }) => {
  const inputValue = useMemo(() => state.someNested.inputValue, [
    state.someNested.inputValue
  ])
  return (
    <div>
      <div>foo: {inputValue}</div>
      <input
        value={inputValue}
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
const InputValueContainer = () => {
  return (
    <ReducerContext.Consumer>
      {({ state, dispatch }) => (
        <InputValue state={state} dispatch={dispatch} />
      )}
    </ReducerContext.Consumer>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(rootReducer, undefined, {
    type: "DUMMY_INITIAL_ACTION"
  })
  console.log(state)

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Counter />
        <InputValueContainer />
      </div>
    </ReducerContext.Provider>
  )
}

export default App
