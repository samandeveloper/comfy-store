//we are not going to connect the CheckoutPage directly to the stripe account (it's insecure)
// Instead we are going to communicate our function folder  and this functions folder is on the server so function folder is not going to be on the frontend.
//So the function is our middleman where it will pass the data to the function and function to the server (which is secure). From the function we communicate to the stripe account and stripe send back the data and then we send it back to our component (components>StripeCheckout.js)
import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext(); //cart will include id,name,color,amount (quality), image, price, max (is the maximum of that product we have in the stock )

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {/* in the checkout page if the cart is empty then display the 'fill it' button which directs to the products page and if not, go to StripeCheckout component*/}
        {cart.length < 1 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
