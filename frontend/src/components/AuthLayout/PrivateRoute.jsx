import React from 'react'
import Login from '../Login'

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken')
    
    return token ? children : <Login />
}

export default PrivateRoute