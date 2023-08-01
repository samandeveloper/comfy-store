//this component is related to the stripe account (for checkout page) and the codes are from the stripe document: https://stripe.com/docs/payments/quickstart most of them from CheckoutForm.js and App.jsx
//first install stript js and react
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js"; //stripe import from javascript
import {
  //from the stripe account: https://stripe.com/docs/payments/quickstart
  CardElement, //in stripe document instead of CardElement they use LinkAuthenticationElement
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js"; //stripe import from react

import axios from "axios"; //since we have the stripe API
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const CheckoutForm = () => {
  //stripe form css
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();

  //on the 'checkout' page we can have 3 states: succeeded, processing and disabled (3 state we have in the stripe payment)
  const [succeeded, setSucceeded] = useState(false); //change it to 'true' when we want to test the pay button in UI
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  //every time user goes to 'checkout' page a clientSecret will generate -- connect to functions>create-payment-intent.js
  const [clientSecret, setClientSecret] = useState(""); //https://stripe.com/docs/payments/quickstart>App.jsx
  const stripe = useStripe(); //this line gives us access to the stripe
  const elements = useElements();

  //write the functions:
  // 1. from https://stripe.com/docs/payments/quickstart>App.jsx. send user's cart, total_amount and shipping_fee to the stripe
  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create-payment-intent", //first item in axios.post is the URL (functions URL) and second item is the data user sends to server
        JSON.stringify({ cart, total_amount, shipping_fee }) //convert JS object to JSON string when we send data from browser to server
      );
      setClientSecret(data.clientSecret);
    } catch (error) {}
  };

  useEffect(() => {
    createPaymentIntent(); //call the createPaymentIntent function
  }, []);

  //2. handleChange function- when users type in the inputs their cart info
  const handleChange = async (event) => {
    //event or e
    console.log(event);
    setDisabled(event.empty); //empty is a property in the event object
    setError(event.error ? event.error.message : ""); //if event.error (error is a property in the event) is true then show the error message, otherwise show nothing
  };

  //3. handleSubmit
  const handleSubmit = async (ev) => {
    //event or e or ev,...
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });
    // NOTE: here in stripe we have 2 options: payment is successful, or payment is not successful and we receive an error
    //1. if payment is unsuccessful and we receive an error
    if (payload.error) {
      setError(`payment failed ${payload.error.message}`);
      setProcessing(false);
    }
    //if payment is successful
    else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      //this is optional and not related to stripe. we set a time for the checkout page so after user paying and after 10s users direct to the homepage from the checkout page
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 10000);
    }
  };

  return (
    <div>
      {/* for the checkout page */}
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment is successful!</h4>
          <h4>Redirecting to homepage shortly</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
          <p>Test card number: 4242 4242 4242 4242</p>
        </article>
      )}
      {/*in the 'checkout' page, create the form for payment */}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement //CardElement is the same as LinkAuthenticationElement in stripedocument
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        {/*If the processing or the disabled or the succeed is true then the button is disabled */}
        <button
          type="submit"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {/* if we are in the processing mode then do nothing (spinner) otherwise show the 'pay' button  */}
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {/* show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* show a success message upon completion and user go to their stripe account dashboard to say their payment they did*/}
        <p className={succeeded ? "result-message" : "result-message-hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            Stripe dashboard.
          </a>
          Refresh the page to pay again
        </p>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  //in the function will have to wrap the CheckoutForm function and some other components
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

// below lines are from App.css from stripe document (except root and body): https://stripe.com/docs/payments/quickstart
const Wrapper = styled.section`
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default StripeCheckout;
