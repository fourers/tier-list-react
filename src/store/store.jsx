import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import tiersReducer from "./tiersSlice";

const persistConfig = {
    key: "root",
    storage: storageSession,
};

export const store = configureStore({
    reducer: {
        tiers: persistReducer(persistConfig, tiersReducer),
    },
});

export const persistor = persistStore(store);
