//this is a server side file based on nodejs land not react land
// access it on the UI URL: domain/.netlify/functions/create-payment-intent
//e.g. in local: http://localhost:8888/.netlify/functions/create-payment-intent

//we import (require) the dotenv package () and if .env file exists in the root then we invoke the config function
//if you don't use .config(), the environment variables will not be automatically loaded, and trying to access them via process.env will return undefined.
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
console.log(stripe);

exports.handler = async function (event, context) {
  //event or e
  //to remove the error bug we use the if and else-since we body is not always exists so we need to add the if and else condition
  if (event.body) {
    const { cart, total_amount, shipping_fee } = JSON.parse(event.body); //in components>StripeCheckout.js we have JSON.stringify these data so we need to reverse it using JSON.parse()
    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500, //server error
        body: JSON.stringify({ msg: error.message }),
      };
    }
  } else {
    //if the cart (body) doesn't exist
    return {
      //return for else
      statusCode: 200,
      body: "Create Payment Intent",
    };
  }
};
