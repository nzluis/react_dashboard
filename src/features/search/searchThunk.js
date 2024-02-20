import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchThunk = createAsyncThunk('search/getSearchPhotos', async(searchInput) => {
    try{   
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE.CLIENT_ID}&query=${searchInput}&count=30&orientation=landscape`)
        if (!response.ok) throw new Error(`Server return a ${response.status} status error`)
        const data = await response.json()
        console.log(data)
        return data.data
    } catch (error) {
        throw new Error(`Fetch abort due to ${error}`)
    }
})