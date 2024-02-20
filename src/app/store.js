import { configureStore } from "@reduxjs/toolkit";
import {favouritesSlice} from '../features/favourites/favouritesSlice'
import { searchSlice } from "../features/search/searchSlice";

export const store = configureStore({
    reducer: {
        favourites: favouritesSlice.reducer,
        search: searchSlice.reducer
    }
})