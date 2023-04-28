import { useContext } from "react";
import { InvoiceDataContext } from "../contexts/InvoiceDataContext";
import HeaderButtons from "./HeaderButtons";

const Header = () => {
  const { userInvoices } = useContext(InvoiceDataContext);
  return (
    <div className="header">
      <div className="header-content">
        <h2 className="header-content__title">Invoices</h2>
        <p className="header-content__text">There are total {userInvoices?.length} invoices</p>
      </div>
      <HeaderButtons />
    </div>
  );
};

export default Header;
