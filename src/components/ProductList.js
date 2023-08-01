//this component related to all the products in the products page including grid view and products (right side of the products page)
import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  //get all the filtered products and assigned the products alias
  const { filtered_products: products, grid_view } = useFilterContext();
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  //if the grid_view is false then we have the list_view:
  if (grid_view === false) {
    return <ListView products={products} />;
  }
  //if the grid_view is true
  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
