import { createSlice } from "@reduxjs/toolkit";
import { addMatch, deleteMatch, fetchAllMatch } from "./matchOperations";

export const matchSlice = createSlice({
    name: "match",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMatch.fulfilled, (state, action) => {
            state.items = action.payload
        })

            .addCase(addMatch.fulfilled, (state, action) => {
                state.items = [...state.items,action.payload]
            })

            .addCase(deleteMatch.fulfilled, (state, action) => {
                state.items = state.items.filter((match) => match.id !== action.payload)
            })
    }
})

export default matchSlice.reducer