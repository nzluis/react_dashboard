import { createSlice } from "@reduxjs/toolkit";
import { getSearchThunk } from "./searchThunk";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        photos: {},
        status:'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchThunk.fulfilled,(state, action) => {
                state.photos = action.payload
                state.status ='fulfilled'
            })
            .addCase(getSearchThunk.rejected,(state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(getSearchThunk.pending,(state) => {
                state.status = 'pending'
            })
    }
})

export const searchPhotos = (state) =>  state.search.photos
export const searchPhotosStatus = (state) => state.search.status
export const searchPhotosError = (state) =>  state.search.error