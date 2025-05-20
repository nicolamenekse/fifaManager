import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./authOperations";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: { name: null, email: null },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user,
                    state.token = action.payload.token,
                    state.isLoggedIn = true,
                    state.error = null,
                    state.loading = false
                console.log("kayıt edildi")
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            .addCase(login.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = action.payload.user,
                    state.token = action.payload.token,
                    state.isLoggedIn = true
            })

            .addCase(login.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })


            .addCase(logout.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = { name: null, email: null },
                    state.token = null,
                    state.isLoggedIn = false
            })

            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })

            .addCase(refresh.pending, (state) => {
                state.loading = true,
                    state.isRefreshing = true
            })

            
            .addCase(refresh.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = action.payload.user,
                    state.isLoggedIn = true,
                    state.isRefreshing = false
            })
            .addCase(refresh.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false,
                    state.isRefreshing = false
            })

    }

})

export default authSlice.reducer