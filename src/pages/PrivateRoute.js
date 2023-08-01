//this page is for protecting the checkout page so if user who is logged out (not login) tries to access localhost:3000/checkout they can not access it
//this file should be in pages since it will wrap the checkout page
import React from "react";
import { Navigate } from "react-router-dom"; //this is react-router-dom6
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();
  if (!user) {
    //if user doesn't exists go to the homepage
    return <Navigate to="/" />;
  }
  return children; //else return children
};
export default PrivateRoute;
