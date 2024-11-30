import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Register from './components/Register.jsx'
import { ThemeProvider } from "@/components/theme-provider"
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/dashboard',
        element: <App />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ThemeProvider>

      <RouterProvider router={router} />

    </ThemeProvider>
  </React.StrictMode>


)
