import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './index.css'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'


import { ThemeProvider } from "@/components/theme-provider"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Login/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(

  <ThemeProvider>

  <React.StrictMode>
    <RouterProvider router={router}>

    <App />
    </RouterProvider>
  </React.StrictMode>,
  </ThemeProvider>

)
