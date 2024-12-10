// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css"; // Varsayılan stiller
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
            }}
          >
            <App />
          </ConfigProvider>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
