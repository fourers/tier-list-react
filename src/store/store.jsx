import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import tiersReducer from "./tiersSlice";

const persistConfig = {
    key: "root",
    storage: storageSession,
};

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(logger),
    reducer: {
        tiers: persistReducer(persistConfig, tiersReducer),
    },
});

export const persistor = persistStore(store);
