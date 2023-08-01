import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    //we need to set the maximum price and price (actual price)
    let maxPrice = action.payload.map((p) => {
      return p.price;
    });
    maxPrice = Math.max(...maxPrice); //find the maximum price in the products
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }, //both max_price and price are equal to maxPrice
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }; //grid_view is the initial with the default value true
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }; //grid_view is the initial with the default value true
  }

  if (action.type === UPDATE_SORT) {
    //by default the sort: "price_lowest" in the context>filter_context.js, but here we want to change the sort when user choose one of the options
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state; //from the context>filtered_context.js destructure the sort and filtered_products from state (initialState)
    let tempProducts = [...filtered_products]; //copy of the filtered_products
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    //else we have sth that is not in the above conditions
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    console.log(action.payload);
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } }; //name:[value] is object property with a dynamic or computed name. e.g. text:chair
  }

  //filter the products (right side of products page) based on the filters on the left side of products page
  if (action.type === FILTER_PRODUCTS) {
    //Note: in filtering we always need to start fresh, that's why we copy from all_filters instead of filtered_products otherwise it won't work
    const { all_products } = state; //bring all_products from initialStates (state) in filter_context.js
    const { text, category, company, color, price, shipping } = state.filters; //bring the items of filters from initialState from filter_context.js
    let tempProducts = [...all_products]; //make a copy of all_products

    //filtering:
    //text filter: if the product name start with text (what user types in the search box)
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text); //product.name is what user types in search
      });
    }
    //category filter: is an object-- if the category equals to all we don't want to run any functionality, if the category equal to all, I want to filter based on category
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category; //product.category is the category in the whole object, and category is the category user choose
      });
    }

    //company filter: is an object
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }

    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color); //color is the color user choose
      });
    }

    //price filter: while changing the price range, if the products price is less or equal to the price that is coming from my state then return those products
    tempProducts = tempProducts.filter((product) => product.price <= price);

    //shipping:
    if (shipping) {
      //if shipping is true (checkbox is full) then show the items that their shipping is true
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      });
    }

    return { ...state, filtered_products: tempProducts };
  }
  //clear filters button-- set everything to default but we want the min_price and max-price to stay as it was and the price to max_price
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state, //whatever we have in initialState
      filters: {
        ...state.filters, //instead of ...state we use ...state.filters so we have min_price and max_price that we already have
        text: "", //this is the search
        company: "all",
        category: "all",
        color: "all",
        // min_price: 0,
        // max_price: 0,
        // price: 0,
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
