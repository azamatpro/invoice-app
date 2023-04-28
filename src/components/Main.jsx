import Sidebar from "./Sidebar";
import { useContext } from "react";
import InvoiceFillForm from "./invoiceFill/InvoiceFillForm";
import Overlay from "./Overlay";
import { Outlet } from "react-router-dom";
import { OpenContext } from "../contexts/OpenContext";

const Main = () => {
  const { showForm } = useContext(OpenContext);
  return (
    <main className="container">
      {showForm && <InvoiceFillForm style={{ transform: "translateX(0)" }} />}
      {showForm && <Overlay />}
      <Sidebar />
      <Outlet />
    </main>
  );
};

export default Main;
