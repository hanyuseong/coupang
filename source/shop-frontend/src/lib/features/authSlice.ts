import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Member } from '../types'

interface AuthState {
    user: Member | null
    accessToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Member | null>) => {
            state.user = action.payload
            state.isAuthenticated = !!action.payload
            state.isLoading = false
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
            state.isLoading = false
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        },
    },
})

export const { setUser, setAccessToken, logout } = authSlice.actions
export default authSlice.reducer
