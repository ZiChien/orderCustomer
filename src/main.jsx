import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";
if (import.meta.env.MODE === "production") {
  Sentry.init({
    dsn: "https://f64e41c47d728d3041f7a9a9adde10ff@o4509099648024576.ingest.us.sentry.io/4509099653070848",
    integrations: [Sentry.browserTracingIntegration()],
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </HelmetProvider>
  </React.StrictMode>
);
