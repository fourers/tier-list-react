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
            state.value =
                action.payload instanceof Function
                    ? action.payload(state.value)
                    : action.payload;
        },
    },
});

export const { reset, update } = tiersSlice.actions;

export default tiersSlice.reducer;
