//this file and context>products_context.js make the reducer

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  //for sidebar (hamburger icon)
  if (action.type === SIDEBAR_OPEN) {
    //if the action type is SIDEBAR_OPEN then open the sidebar by set the initial state>isSidebarOpen: true,
    return { ...state, isSidebarOpen: true }; //isSidebarOpen is an initial state
  }
  //for sidebar (hamburger icon)
  if (action.type === SIDEBAR_CLOSE) {
    //for sidebar
    return { ...state, isSidebarOpen: false };
  }
  //for all the products-loading
  if (action.type === GET_PRODUCTS_BEGIN) {
    //for loading products
    return { ...state, products_loading: true }; //products_loading is an initial state
  }
  //for all the products-fetch all the products
  if (action.type === GET_PRODUCTS_SUCCESS) {
    //fetch all the products successfully
    //for the featured products
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    );
    return {
      ...state,
      products_loading: false,
      products: action.payload, //assign all the action.payload (all the products) products
      featured_products: featured_products, //featured products
    };
  }
  //for all the products-error
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }; //products_loading and products_error are initial states
  }

  //for single product-loading
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: false, //we add this line in case if we have some old errors left on the single product page, then by default we set the error to false
    };
  }
  //for single product-fetch one product
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }

  //for single product-error
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
