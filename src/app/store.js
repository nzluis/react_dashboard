import { configureStore } from "@reduxjs/toolkit";
import {favouritesSlice} from '../features/favourites/favouritesSlice'

export const store = configureStore({
    reducer: {
        favourites: favouritesSlice.reducer
    }
})