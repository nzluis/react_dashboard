import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from '../features/favouritesSlice'

export const store = configureStore({
    reducer: {
        favourites: favouritesReducer
    }
})