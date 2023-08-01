//we can see view the filtered products on products page 2 ways: Grid view and List View
//the Grid View style is look like the homepage>featured products
import React from "react";
import styled from "styled-components";
import Product from "./Product";

const GridView = ({ products }) => {
  //products are passed to the <GridView /> component in the components>ProductList.js
  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
