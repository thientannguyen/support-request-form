import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConfirmationPage from "./pages/ConfirmationPage";
import RequestFormPage from "./pages/RequestFormPage";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="font-sans text-gray-900">
          <Routes>
            <Route path="/" element={<RequestFormPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
