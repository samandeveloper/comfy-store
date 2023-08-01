import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload; //***that's why we have payload: { id, color, amount, product } in the cart_context.js
    const tempItem = state.cart.find((i) => i.id === id + color); //tempItem is the a product. combine id to the color.find the first id
    //1. if the product item is already in the cart, if yes, just increase the quantity of the item
    //to do this map over the card, check the id and if the id matches it means the product is already matches
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          //if the ids are the same
          //if the product item is already in the cart and the id is the same (means we have the same color of that product in the cart)
          //if the id matches, add the new amount to the previous amount
          let newAmount = cartItem.amount + amount; //increase the amount (quantity)
          //check if the value is bigger than the maximum amount of that product then the amount is equal to the maximum
          if (newAmount > cartItem.max) {
            //if we reaches the maximum amount of product we have in the stock, then the newAmount is the same as maximum amount
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          //if the id doesn't match, return the cartItem as it is
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    }
    //2. if the item is not in the cart, we add a new item
    //first we create the item and then add it in the cart
    else {
      const newItem = {
        //below are the items we have in the cart page. cart=[] at first then will fill with the below items
        id: id + color, //in the cart the id equals to id+color
        name: product.name,
        color,
        amount, //subtotal in the column
        image: product.images[0].url,
        price: product.price, //price
        max: product.stock, //quantity
      };
      return { ...state, cart: [...state.cart, newItem] }; //the cart contains previous items and the new item
    }
  }
  //remove cart function on cart page
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload); //action.payload === id due to cart_context.js
    return { ...state, cart: tempCart }; //if the product id's are not match then return them (the rest of the items will remove)
  }
  //'clear shipping cart' button on the cart page
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }; //cart will be empty array like default value
  }
  //+ and - in quantity column on the cart page. we write one function for both increase and decrease and then combine them
  //we also need to check the maximum and minimum amount of each product
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    //Note: this id is the id+color
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          //if the amount (+) user choose is more than the amount of product we have in stock
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          //if the amount (-) user choose is less than the amount of product we have in stock
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      // else {
      return item;
      // }
    });
    return { ...state, cart: tempCart };
  }

  //calculate cart amount and subtotal in the cart page
  if (action.type === COUNT_CART_TOTALS) {
    //total_items shows how many items we have in the cart and total_amount is subtotal
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        //total is accumulator and cartItem is the currentvalue
        const { amount, price } = cartItem; //amount is the subtotal of the column (for each product) = price * quantity(amount)
        total.total_items += amount; //sum of quantities
        total.total_amount += price * amount; //price of each item*quantity of each item
        return total;
      },
      { total_amount: 0, total_items: 0 } //the acc is an object:{ total_amount: 0, total_items: 0 }
    );
    return { ...state, total_amount, total_items };
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
