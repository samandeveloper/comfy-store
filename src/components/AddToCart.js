//this component is for the last section (Add to cart) in the single product page
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; //since when we click on the "Add to cart" button it should navigate to the cart page
import { FaCheck } from "react-icons/fa"; //since we have a icon when we choose the color
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons"; //this is a separate component for the number of products user choose and can increase/decrease it

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors } = product; //destructure what we want from the product (pages>SingleProductPage.js)
  //mainColor is the color user picks
  const [mainColor, setMainColor] = useState(colors[0]); //first color in the colors array is the default color
  const [amount, setAmount] = useState(1); //state for amount button (increase/decrease) and by default it's 1

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        //if the increase button become bigger than product in the stock
        tempAmount = stock;
      } //else
      return tempAmount;
    });
  };

  const decrease = (oldAmount) => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        {/* iterate through colors and when click on a one of the colors, that state will change to that color */}
        <span>colors : </span>
        <div>
          {colors.map((color, index) => {
            //each color has their own index
            return (
              <button
                key={index}
                type="button"
                style={{ background: color }}
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      {/* add the amount button and add to cart button in the below div */}
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        {/* in the cart_context.js we have id,color,amount,product in below line mainColor is the same as color */}
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  // all the colors has the same black background (background: #222;)
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
