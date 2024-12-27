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
import Home from './components/Home.jsx'
import Watch from './components/Watch.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import UploadVideo from './components/UploadVideo.jsx'
import SearchResult from './components/SearchResult.jsx'





const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: '/dashboard',
      //   element: (
      //     <PrivateRoute>
      //       <App />
      //     </PrivateRoute>
      //   )
      // },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Home />
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
        path: '/watch/:id',
        element: (
          <PrivateRoute>
            <Watch />
          </PrivateRoute>
        )
      },
      {
        path: '/upload-video',
        element: (
          <PrivateRoute>
            <UploadVideo />
          </PrivateRoute>
        )
      },
      {
        path: '/search',
        element: (
          <PrivateRoute>
            <SearchResult />
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
    <Auth0Provider
      domain="dev-40d78xpq4u26l8lc.us.auth0.com"
      clientId="QHLwb5dqh9ccNOWAarulBwjBBnxIwv35"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >

      <Provider store={store}>
        <ThemeProvider>

          <RouterProvider router={router} />

        </ThemeProvider>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
)
