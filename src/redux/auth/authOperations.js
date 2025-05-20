import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = "https://connections-api.goit.global/"
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ""
}

export const register = createAsyncThunk("users/signup", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("/users/signup", userData)
        if (response.data.token) {
            setAuthHeader(response.data.token)
        } else {
            return thunkAPI.rejectWithValue("token not found")
        }

        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const login = createAsyncThunk("users/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("/users/login", userData)
        setAuthHeader(response.data.token)
        console.log(response.data.token)
        console.log(userData)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
    try {
        await axios.post("/users/logout")
        clearAuthHeader()
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const refresh = createAsyncThunk("users/refresh", async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    
    const token = state.auth.token
    if (!token) return thunkAPI.rejectWithValue("Token undefined")
    setAuthHeader(token)
    try {
        const response = await axios.get("/users/current")
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

