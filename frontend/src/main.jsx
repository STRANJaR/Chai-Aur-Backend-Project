import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Register from './components/Register.jsx'
import { ThemeProvider } from "@/components/theme-provider"
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import PrivateRoute from './components/AuthLayout/PrivateRoute.jsx'
import PublicRoute from './components/AuthLayout/PublicRoute.jsx'
import Profile from './components/User/Profile.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import UpdateAccountDetails from './components/User/UpdateAccountDetails.jsx'
import NotFound from './components/NotFoundPage/NotFound.jsx'
import WatchHistory from './components/User/WatchHistory.jsx'
import Layout from './components/Layout.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <App />
          </PrivateRoute>
        )
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        )
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: '/update-account',
        element: (
          <PrivateRoute>
            <UpdateAccountDetails />
          </PrivateRoute>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <PrivateRoute>
            <ForgotPassword />
          </PrivateRoute>
        )
      },
      {
        path: '/u',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: '/watch-history',
        element: (
          <PrivateRoute>
            <WatchHistory />
          </PrivateRoute>
        )
      },
      {
        path: '*',
        element: (
          <NotFound />
        )
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
    
          <RouterProvider router={router} />
 
        </ThemeProvider>
      </Provider>
  </React.StrictMode>
)
