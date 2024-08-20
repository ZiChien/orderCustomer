import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
)
