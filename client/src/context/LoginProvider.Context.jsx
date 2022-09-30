import { useContext, useState } from "react";
import { LoginContext } from "./Login.context";
import { createLoginRequest } from '../api/login.api';

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLoginContext deberia estar dentro del LoginContextProvider");
  };
  return context;
};

export const LoginContextProvider = ({ children }) => {

  const [login, setLogin] = useState([])

  const createLogin = async (user) => {
    try {
      const response = await createLoginRequest(user);
      console.log(response.data);
      setLogin([...users, response.data]);
    } catch (error) {
      console.log(error); 
    };
  };

  return (
    <LoginContext.Provider value = {{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};