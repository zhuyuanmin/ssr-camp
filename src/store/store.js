import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const serverAxios = axios.create({
  baseURL: 'http://localhost:9090/',
  timeout: 5000
})

const clientAxios = axios.create({
  baseURL: '/',
  timeout: 5000
})

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

export const getServerStore = () => {
  return createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(serverAxios)))
  )
}

export const getClientStore = () => {
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducer, defaultState, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(clientAxios)))
  )
}
