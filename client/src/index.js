import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'

const store = createStore(() => [], {},applyMiddleware()) // 1st arg is combined reducer, 2nd is initial state

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
)
