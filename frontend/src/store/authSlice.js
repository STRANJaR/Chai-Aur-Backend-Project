import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            console.log('user store:', action.payload)
            const { user, accessToken } = action.payload;
            
            state.user = user;
            state.token = accessToken
            console.log('user from store: ',user)
            console.log('accessToken from store: ',accessToken)
        },
        logout: (state) => {
            state.user = null,
            state.token = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer
