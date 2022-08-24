import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import App from './components/App'
import 'materialize-css/dist/css/materialize.min.css'
import reduxThunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk)
  // other store enhancers if any
);
const store = createStore(reducers, enhancer); // 1st arg is combined reducer, 2nd is initial state

//const store = createStore(() => [], {},applyMiddleware()) 

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
)
