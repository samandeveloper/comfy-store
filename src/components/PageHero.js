//this file is related to the banner on top of each page, except homepage and error page
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageHero = ({ title, product }) => {  //title and products are just two properties
    return(
    <Wrapper>
      <div className="section-center">
        <h3>
          {/* for the home, About and products pages we have the two below lines for the banner- the /{title} is at the end */}
          {/* <Link to="/">Home</Link>/{title} */}
          <Link to="/">Home</Link>
          {/* for the single product pages we have the below line for the banner-the /{title} is at the end */}
          {product && <Link to="/products">/Products</Link>}
          /{title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
