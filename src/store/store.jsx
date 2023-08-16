import { configureStore } from "@reduxjs/toolkit";
import tiersReducer from "./tiersSlice";

const store = configureStore({
    reducer: {
        tiers: tiersReducer,
    },
});

export default store;
