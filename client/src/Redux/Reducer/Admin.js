import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    token: ""
}

export const adminReducer = createReducer(initialState, {
    LoadAdminRequest: (state) => {
        state.loading = true
    },
    LoadAdminSuccess: (state, action) => {
        state.isAuthenticated = true
        state.loading = false
        state.admin = action.payload
    },
    loginSuccess: (state, action) => {
        state.isAuthenticated = true
        state.loading = false
        state.admin = action.payload.admin
        state.token = action.payload.token
    },
    LoadAdminFail: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    clearErrors: (state) => {
        state.error = null;
    },

})