import { combineReducers } from "redux"

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
  }
  return state
}

const inputValue = (state = "foo", action) => {
  switch (action.type) {
    case "UPDATE_VALUE":
      return action.value
  }
  return state
}

export const rootReducer = combineReducers({
  counter,
  someNested: combineReducers({
    inputValue
  })
})
