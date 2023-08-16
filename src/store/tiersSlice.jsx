import { createSlice } from "@reduxjs/toolkit";
import { BOTTOM_ROW_ID } from "../components/constants";
import data from "../default_data.json";

const initialiseData = () => {
    const tierData = { [BOTTOM_ROW_ID]: data.itemOrder };
    data.rowOrder.forEach((row) => {
        tierData[row] = [];
    });
    return tierData;
};

const initialState = initialiseData();

export const tiersSlice = createSlice({
    initialState: {
        value: initialState,
    },
    name: "tiers",
    reducers: {
        update: (state, action) => {
            state.value = {
                ...state.value,
                ...action.payload,
            };
        },
    },
});

export const { update } = tiersSlice.actions;

export default tiersSlice.reducer;
