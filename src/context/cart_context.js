import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

//2. add localStorage
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart"); //check if the cart is not empty-get the cart by the name of localStorage which is 'cart'
  console.log(cart);
  //cart is full
  if (cart) {
    return JSON.parse(localStorage.getItem("cart")); //or return JSON.parse(cart)
  }
  //cart is empty
  else {
    return [];
  }
};

const initialState = {
  // cart: [], //cart will include id,name,color,amount (quality), image, price, max (is the maximum of that product we have in the stock )
  //cart:[] before we are adding the localStorage but now:
  cart: getLocalStorage(),
  total_items: 0, //shows how many items we have in the cart in total (not how many products)
  total_amount: 0, //what we see in cart page as a 'subtotal'
  shipping_fee: 534, //the shipping fee is always $5.34
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add to cart (for the cart page)
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } }); //or payload:{id:id,color:color,amount:amount,product:product}
  };

  //remove item (delete button on cart page)
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id }); //so here action.payload === id
  };

  //toggle amount (+ and - in the quantity column on cart page)
  const toggleAmount = (id, value) => {
    //value means that if we are increasing or decreasing
    //we are writing two functions for increasing and decreasing and then combine them
    console.log(value);
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } }); //payload is an object
  };

  //clear cart ('clear shopping cart' button on cart page)
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  //1. add localStorage
  useEffect(() => {
    //below line is for number of items in the cart
    dispatch({ type: COUNT_CART_TOTALS });
    //below line is for setting the localStorage
    localStorage.setItem("cart", JSON.stringify(state.cart)); //localStorage.setItem(name,JSON.stringify(value))
  }, [state.cart]); //when the cart array changes in the local storage, then rerender the function

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider> //this is where we wrap our application
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
