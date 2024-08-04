import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
