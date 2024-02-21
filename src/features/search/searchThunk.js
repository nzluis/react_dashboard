import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTermSearchThunk = createAsyncThunk('search/getTermSearch', async(searchInput) => {
    try{   
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_CLIENT_ID}&query=${searchInput}&per_page=30&orientation=landscape`)
        if (!response.ok) throw new Error(`Server return a ${response.status} status error`)
        const data = await response.json()
        return data.results
    } catch (error) {
        throw new Error(`Fetch abort due to ${error}`)
    }
})

export const getRandomSearchThunk = createAsyncThunk('search/getRandomSearch', async() => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${import.meta.env.VITE_CLIENT_ID}&count=30&orientation=landscape`)
        if (!response.ok) throw new Error(`Server return a ${response.status} status error`)
        const data = await response.json()
        console.log(data)
        return data
    } catch(error) {
        throw new Error(`Fetch abort due to ${error}`)
    }
})