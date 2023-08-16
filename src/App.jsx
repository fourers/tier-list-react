import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import TierList from "./components/TierList";
import { persistor, store } from "./store/store";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TierList />
            </PersistGate>
        </Provider>
    );
}
