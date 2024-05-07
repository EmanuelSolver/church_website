import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavigatorContextProvider } from './context/navigationContext/Context.jsx'
import { UserContextProvider } from './context/userContext/Context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigatorContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NavigatorContextProvider>
  </React.StrictMode>,
)