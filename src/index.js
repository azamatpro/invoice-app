import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { OpenContextProvider } from "./contexts/OpenContext";
import { UserProvider } from "./contexts/UserContext";
import { InvoiceDataProvider } from "./contexts/InvoiceDataContext";
import { InvoiceProvider } from "./contexts/InvoiceContext";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe.utils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <OpenContextProvider>
        <InvoiceProvider>
          <InvoiceDataProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </InvoiceDataProvider>
        </InvoiceProvider>
      </OpenContextProvider>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
