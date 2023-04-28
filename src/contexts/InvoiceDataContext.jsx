import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getInvoicesAndDocs } from "../utils/firebase.utils";
import { UserContext } from "./UserContext";

export const InvoiceDataContext = createContext({
  invoices: [],
  setInvoices: () => null,
  userInvoices: [],
  setUserInvoices: () => null,
  setFilterValue: () => null,
});

export const InvoiceDataProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [invoices, setInvoices] = useState(null);
  const [userInvoices, setUserInvoices] = useState([]);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    (async () => {
      const data = await getInvoicesAndDocs();
      setInvoices(data);
    })();
  }, []);

  useEffect(() => {
    if (currentUser?.uid && invoices) {
      const validUserInvoices = invoices[currentUser.uid]
        ? invoices[currentUser.uid]
        : [];
      setUserInvoices(
        validUserInvoices.filter((invoice) =>
          filterValue === "all" ? invoice : invoice.status === filterValue
        )
      );
    }
  }, [invoices, currentUser?.uid, filterValue]);

  const fetchInvoices = async () => {
    const data = await getInvoicesAndDocs();
    setInvoices(data);
  }

  const value = { userInvoices, setFilterValue, fetchInvoices };
  return (
    <InvoiceDataContext.Provider value={value}>
      {children}
    </InvoiceDataContext.Provider>
  );
};
