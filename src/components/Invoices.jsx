import { useContext } from "react";
import { InvoiceDataContext } from "../contexts/InvoiceDataContext";
import EmptyBox from "./EmptyBox";
import InvoiceItem from "./InvoiceItem";

const Invoices = () => {
  const { userInvoices } = useContext(InvoiceDataContext);
  return (
    <div className="section-invoices">
      {userInvoices.length >= 1 ? (
        userInvoices.map((invoice) => (
          <InvoiceItem invoice={invoice} key={invoice.id} />
        ))
      ) : (
        <EmptyBox />
      )}
    </div>
  );
};

export default Invoices;
