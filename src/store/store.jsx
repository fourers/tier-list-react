import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tiersReducer from "./tiersSlice";

const persistConfig = {
    key: "root",
    storage,
};

export const store = configureStore({
    reducer: {
        tiers: persistReducer(persistConfig, tiersReducer),
    },
});

export const persistor = persistStore(store);
