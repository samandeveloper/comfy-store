import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers"; //converts cents to dollar for prices
import {
  //these are the components we should use in the single product page
  Loading, //the Loading component
  Error, //the Error component
  ProductImages, //all the images on the left side of the single product page which we display images property inside of it
  AddToCart,
  Stars,
  PageHero, //the banner component
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Product from "../components/Product";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    //loading, error and product are aliases for single_product_loading, single_product_error and fetchSingleProduct
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]); //the id can be added here (render when each product id change)

  //if we receive an error for a single product page, we want to redirect to the homepage in 3s
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku, //in the line below, id is the same id we received from useParams but here we give it the alias "sku"
    company,
    images,
  } = product;
  return (
    <Wrapper>
      {/* in the line below, title and product are two arguments we passed in the components>PageHero.js */}
      <PageHero title={name} product />
      {/* in one div we add every thing we have on the UI of the single product page*/}
      <div className="section section-center page">
        {/* "back to products" button--left side of the single product page */}
        <Link to="/products" className="btn">
          back to products
        </Link>

        {/* all the images--left side of the single product page */}
        <div className="product-center">
          <ProductImages images={images} />
          {/* right side of the single product page */}
          <section className="content">
            <h2>{name}</h2>
            {/* we need to pass reviews and stars (from the product) to the Stars component */}
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {/* in the line below we pass the whole product as a props instead of sending each product properties. we want id, colors, stock */}
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
