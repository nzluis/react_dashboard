import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addPhoto: (favourites, action) => {
           if (!favourites.find(photo => photo.id === action.payload.id)) favourites.push(action.payload)
        },
        removePhoto: (favourites, action) => {
            return  favourites.filter(photo => photo.id !== action.payload) 
        }
    }
})

export const {addPhoto, removePhoto} = favouritesSlice.actions