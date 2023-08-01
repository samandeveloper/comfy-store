//this file is the combination of useContext and useReducer and fetch products (axios)

import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants"; //products_url is the API url and we gave an alias "url" to it
import {
  //imported from action.js
  SIDEBAR_OPEN, //for sidebar
  SIDEBAR_CLOSE, //for sidebar
  GET_PRODUCTS_BEGIN, //for products-loading
  GET_PRODUCTS_SUCCESS, //for products-when we get products and there is no error
  GET_PRODUCTS_ERROR, //for products-to handle error
  GET_SINGLE_PRODUCT_BEGIN, //for single product setup loading
  GET_SINGLE_PRODUCT_SUCCESS, //for when single product successfully loaded
  GET_SINGLE_PRODUCT_ERROR, //for single product error
} from "../actions";

import CartButtons from "../components/CartButtons";
import Sidebar from "../components/Sidebar";

//for reducer
const initialState = {
  isSidebarOpen: true, //for the sidebar-by default the sidebar is close
  products_loading: false, //before all the products loads
  products_error: false, //by default we don't have error in products
  products: [], //initial state of all the products-if everything is ok we should receive all the products (products in products page)
  featured_products: [], //initial state of featured products on homepage
  single_product_loading: false, //for single product loading
  single_product_error: false, //for single product error
  single_product: {}, //for single product-default state is an empty object
};

//for context
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  //dispatch is the function to control our state (we can update the state if there is an action)
  const [state, dispatch] = useReducer(reducer, initialState); //reducer is the function that controls our state

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  //fetch all the products from utils>constants.js
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN }); //for loading products
    try {
      const response = await axios.get(url);
      const products = response.data; //all the products are in products object in data (in axios they are in data)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR }); //we are not passing any error to the payload
    }
  };

  //fetch single product-the invoke of this function is in useEffect in pages>SingleProductPage.js
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN }); //for loading single product before starting
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  //useEffect-for invoking all the products
  useEffect(() => {
    fetchProducts(url); //invoke the fetchProducts and we must pass the url to it
  }, []);

  //wrap the children inside the context provider
  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
