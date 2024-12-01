import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    user: JSON.parse(localStorage.getItem('user')) || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.token = accessToken;
            state.isAuthenticated = true;

            // Save token and user in localStorage 
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('user', JSON.stringify(user))
        },
        
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // remove token and user in localStorage 
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        },
        
    }
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer
