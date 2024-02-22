import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem('favouritePhotos') ? JSON.parse(localStorage.getItem('favouritePhotos')) : {photos: [], term: ''}

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addPhoto: (state, action) => {
           if (!state.photos.find(photo => photo.id === action.payload.id)) state.photos.push(action.payload)
        },
        removePhoto: (state, action) => {
            return  state.photos.filter(photo => photo.id !== action.payload) 
        },
        editDescription: (state, action) => {
            const favouriteToEdit = state.photos.find(photo => photo.id === action.payload.id)
            favouriteToEdit.description = action.payload.description
            return state
        },
        addMyPhotosTerm: (state, action) => {
            state.term = action.payload
            return state
        },
        clearMyPhotosTerm: (state) => {
            state.term = ''
            return state
        }
    }
})

export const {addPhoto, removePhoto, editDescription, addMyPhotosTerm, clearMyPhotosTerm} = favouritesSlice.actions