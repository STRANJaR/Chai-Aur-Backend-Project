import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({ children }) => {
    const {isAuthenticated} = useAuth0();


    const isAuthenticatedTraditional = useSelector(state => state.auth.isAuthenticated)

    return (isAuthenticatedTraditional || isAuthenticated) ? children : <Navigate to={'/login'} />
}

export default PrivateRoute