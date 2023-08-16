import "./App.css";
import { Provider } from "react-redux";
import TierList from "./components/TierList";
import store from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <TierList />
        </Provider>
    );
}

export default App;
