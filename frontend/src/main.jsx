import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'



import { ThemeProvider } from "@/components/theme-provider"
import Container from './components/Container/Container.jsx'

const user = false;
const router = createBrowserRouter([
  {
    path: '/',
    element: (user? <App/> : <Register/>),
    children: [
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/register',
        element: <Register />
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
    </React.StrictMode>
  </ThemeProvider>

)
