import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Cart } from '../types'
import { fetchCart } from '../api'

interface CartState {
    items: Cart | null
    isLoading: boolean
}

const initialState: CartState = {
    items: null,
    isLoading: false,
}

export const fetchCartAsync = createAsyncThunk(
    'cart/fetchCart',
    async () => {
        const response = await fetchCart()
        return response
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCartAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
            })
            .addCase(fetchCartAsync.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setCart } = cartSlice.actions
export default cartSlice.reducer
