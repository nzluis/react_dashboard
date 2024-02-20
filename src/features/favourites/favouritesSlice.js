import { createSlice } from "@reduxjs/toolkit"

const initialState = localStorage.getItem('favouritePhotos') ? JSON.parse(localStorage.getItem('favouritePhotos')) : []

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addPhoto: (favourites, action) => {
           if (!favourites.find(photo => photo.id === action.payload.id)) favourites.push(action.payload)
        },
        removePhoto: (favourites, action) => {
            return  favourites.filter(photo => photo.id !== action.payload) 
        },
        editDescription: (favourites, action) => {
            const favouriteToEdit = favourites.find(photo => photo.id === action.payload.id)
            favouriteToEdit.description = action.payload.description
            return favourites
        }
    }
})

export const {addPhoto, removePhoto, editDescription} = favouritesSlice.actions