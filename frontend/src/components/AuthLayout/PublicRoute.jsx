import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
    const {isAuthenticated} = useAuth0()

    const isAuthenticatedLocal = useSelector(state => state.auth.isAuthenticated)
    console.log('is auth public route: ', isAuthenticatedLocal)

    return (isAuthenticatedLocal && isAuthenticated) ? <Navigate to={'/dashboard'} /> : children
}

export default PublicRoute