import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {StripeProvider} from 'react-stripe-elements'
import Chatbot from './chatbot'
// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey={process.env.STRIPE_CLIENT_ID}>
      <Router history={history}>
        <div>
          <App />
          <Chatbot />
        </div>
      </Router>
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
)
