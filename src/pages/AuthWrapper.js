//this page is for when logged in user can access the 'checkout' page just using checkout in the menu
//but they cannot access it using localhost:3000/checkout. it is still directs to the homepage
//to remove the above mentioned issue we write this page. we are writing a component that we wrap all our files
import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; //Auth0 is for authentication
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
  //we use children because we want to wrap the whole app inside of this AuthWrapper
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }
  if (error) {
    return (
      <wrapper>
        {error.message}
      </wrapper>
    );
  }
  //if we are not loading the page or we are not receiving an error then we are looking for my children 
  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
