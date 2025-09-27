import { Provider } from "react-redux";
import RequestFormPage from "./pages/RequestFormPage";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="font-sans text-gray-900">
        <RequestFormPage />
      </div>
    </Provider>
  );
}

export default App;
