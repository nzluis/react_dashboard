import { configureStore } from "@reduxjs/toolkit";
import {favouritesSlice} from '../features/favouritesSlice'

export const store = configureStore({
    reducer: {
        favourites: favouritesSlice.reducer
    }
})