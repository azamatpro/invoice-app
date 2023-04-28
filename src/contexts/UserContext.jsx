import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  invoiceDatas: [],
  pushInvoiceData: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }

      setCurrentUser(user);
    });
    return unsubcribe;
  }, []);

  const invoiceDatas = [];
  const pushInvoiceData = (data) => {
    invoiceDatas.push(data);
    console.log(invoiceDatas);
  };
  const value = { currentUser, invoiceDatas, pushInvoiceData };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
