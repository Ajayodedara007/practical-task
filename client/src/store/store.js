import { configureStore } from '@reduxjs/toolkit'
import mainSlice from '../slices/MainSlice'

export const store = configureStore({
    reducer: {
        main: mainSlice
    },
})