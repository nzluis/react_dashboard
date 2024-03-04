import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchThunk = createAsyncThunk('search/getSearch', async(searchInput) => {
    try{   
        const response = await fetch( searchInput ? (
            `https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_CLIENT_ID}&query=${searchInput}&per_page=30&orientation=landscape`
        ) : (
            `https://api.unsplash.com/photos/random/?client_id=${import.meta.env.VITE_CLIENT_ID}&count=30&orientation=landscape`
        ))
        if (!response.ok) throw new Error(`Server return a ${response.status} status error`)
        const data = await response.json()
        return searchInput ? data.results : data
    } catch (error) {
        throw new Error(`Fetch abort due to ${error}`)
    }
})