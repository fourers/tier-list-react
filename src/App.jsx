import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import TierList from "./components/TierList";
import { persistor, store } from "./store/store";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: grey[500],
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <TierList />
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}
