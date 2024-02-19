import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addPhoto: (favourites, action) => {
            favourites.push(action.payload)
        }
    }
})

export const {addPhoto} = favouriteSlice.actions
export default favouriteSlice.reducer