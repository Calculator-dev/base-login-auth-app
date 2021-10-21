import { createSlice, configureStore } from "@reduxjs/toolkit"

const baseLoginSlice = createSlice({
    name: "baseLogin",
    initialState: { user: false, modal: { login: false, register: false } },
    reducers: {
        setModal(state, { payload }) {
            state.modal = payload;
        },
        setUser(state, { payload }) {
            state.user = payload;
            state.modal = { login: false, register: false }
        }
    },
})

export const store = configureStore({
    reducer: { baseLogin: baseLoginSlice.reducer },
})

export const baseLoginActions = baseLoginSlice.actions;