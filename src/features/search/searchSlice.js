import { createSlice } from "@reduxjs/toolkit";
import { getSearchThunk } from "./searchThunk";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        photos: [],
        term: '',
        status:'idle',
        error: null
    },
    reducers: {
        addTerm: (search, action) => {
            search.term = action.payload
        },
        clearTerm: (search) => {
            search.term = ''
        },
        getReadyNewRequest: (search) => {
            search.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchThunk.fulfilled,(search, action) => {
                search.photos = action.payload
                search.status ='fulfilled'
            })
            .addCase(getSearchThunk.rejected,(search, action) => {
                search.status = 'rejected'
                search.error = action.error.message
            })
            .addCase(getSearchThunk.pending,(search) => {
                search.status = 'pending'
            })
    }
})

export const searchPhotos = (state) =>  state.search.photos
export const searchStatus = (state) => state.search.status
export const searchError = (state) =>  state.search.error
export const searchTerm = (state) =>  state.search.term
export const {addTerm, clearTerm, getReadyNewRequest} = searchSlice.actions
