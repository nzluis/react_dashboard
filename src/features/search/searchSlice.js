import { createSlice } from "@reduxjs/toolkit";
import { getTermSearchThunk, getRandomSearchThunk } from "./searchThunk";

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
        returnToIdle: (search) => {
            search.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTermSearchThunk.fulfilled,(search, action) => {
                search.photos = action.payload
                search.status ='fulfilled'
            })
            .addCase(getTermSearchThunk.rejected,(search, action) => {
                search.status = 'rejected'
                search.error = action.error.message
            })
            .addCase(getTermSearchThunk.pending,(search) => {
                search.status = 'pending'
            })
             .addCase(getRandomSearchThunk.fulfilled,(search, action) => {
                search.photos = action.payload
                search.status ='fulfilled'
            })
            .addCase(getRandomSearchThunk.rejected,(search, action) => {
                search.status = 'rejected'
                search.error = action.error.message
            })
            .addCase(getRandomSearchThunk.pending,(search) => {
                search.status = 'pending'
            })
    }
})

export const searchPhotos = (state) =>  state.search.photos
export const searchStatus = (state) => state.search.status
export const searchError = (state) =>  state.search.error
export const searchTerm = (state) =>  state.search.term
export const {addTerm, clearTerm, returnToIdle} = searchSlice.actions
