import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//import all the 4 contexts
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react"; //for Auth0

//below examples is the way we write the index.js in React 18 (instead of ReactDOM.render(<App />,document.getElementById('root')))
const root = ReactDOM.createRoot(document.getElementById("root"));
//we need to wrap the <App /> (the whole application) inside the <ProductsProvider> (find it in context folder)
//We need to wrap the FilterProvider inside the ProductsProvider. Because we want to get some info from the product into the filter
root.render(
  //for Auth0
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIEND_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage" //this line will cause to store the key and value every time user login and logout
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
