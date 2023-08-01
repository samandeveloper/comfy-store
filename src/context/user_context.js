//this context file belongs to Auth0
import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  //we get our 'user' from Auth0
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0(); //these are the methods we have in the Auth0

  //define a state if the user is logged in or not
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
