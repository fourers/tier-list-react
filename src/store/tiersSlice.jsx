import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialData";

export const tiersSlice = createSlice({
    initialState: {
        value: initialState,
    },
    name: "tiers",
    reducers: {
        reset: (state) => {
            state.value = initialState;
        },
        update: (state, action) => {
            state.value = action.payload(state.value);
        },
    },
});

export const { reset, update } = tiersSlice.actions;

export default tiersSlice.reducer;
