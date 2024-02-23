import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem('favouritePhotos') !== null ? {photos: JSON.parse(localStorage.getItem('favouritePhotos')), term:''} : {photos: [], term: ''}

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addPhoto: (state, action) => {
           if (!state.photos.find(photo => photo.id === action.payload.id)) state.photos.push(action.payload)
        },
        removePhoto: (state, action) => {
            // return state.photos.filter(photo => photo.id !== action.payload) 
            state.photos.splice(state.photos.findIndex(photo => photo.id === action.payload), 1)
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
export const favouritePhotos = (state) => state.favourites.photos