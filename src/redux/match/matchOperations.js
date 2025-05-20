import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://connections-api.goit.global/"

export const fetchAllMatch = createAsyncThunk("contacts/matchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/contacts")
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const addMatch = createAsyncThunk("contacts/addMatch", async (match, thunkAPI) => {
    try {
        const response = await axios.post("/contacts", match)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const deleteMatch = createAsyncThunk("contacts/deleteMatch", async (matchId, thunkAPI) => {
    try {
        await axios.delete(`/contacts/${matchId}`)
        return matchId
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})