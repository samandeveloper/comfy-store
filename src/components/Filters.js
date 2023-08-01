import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers"; //getUniqueValue function for company,category, colors filters on Products page
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products, //all_products will use when we are getting those unique values
  } = useFilterContext();

  //write three functions for category, company, colors:
  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    name="category" //name must be added
                    onClick={updateFilters}
                    className={`${
                      category === c.toLowerCase() ? "active" : null //if the category (state) is equal to this specific category
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* companies */}
          <div className="form-control">
            // <h2>company</h2>
            company
            <select
              //name and value are the in the updateFilters
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                // if we choose 'all' not the colors
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      type="button"
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }
                //  if color is one of the colors except the 'all' in the color
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {/* <FaCheck /> is the check icon inside the color- if the color state is equal to that specific color (c) then add the check inside the color  */}
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <div className="price">{formatPrice(price)}</div>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price} //price is the state value
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping} //by default shipping:false and if shipping is false checkbox is empty but if it's true then checkbox is checked
            />
          </div>
          {/* end of shipping */}
        </form>
        {/* clear filters button */}
        <button type="button" className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
        {/* end of clear filters button */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
