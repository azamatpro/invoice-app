import { createContext, useCallback, useState } from "react";
import { getDocument } from "../utils/firebase.utils";

export const InvoiceContext = createContext({
  invoice: null,
  getInvoice: (id) => null,
});

export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState(null)
  const getInvoice = useCallback(async (id) => {
    setInvoice(await getDocument(id));
  },[])
  const value = {invoice, getInvoice};
  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};
