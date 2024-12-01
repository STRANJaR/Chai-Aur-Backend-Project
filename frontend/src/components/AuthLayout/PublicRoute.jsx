import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
    // const token = localStorage.getItem('accessToken')
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    console.log('is auth public route: ', isAuthenticated)

    return isAuthenticated ? <Navigate to={'/dashboard'} /> : children
}

export default PublicRoute