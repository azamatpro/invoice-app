import { useContext } from "react";
import { OpenContext } from "../../contexts/OpenContext";

const InvoiceFillBoxInput = ({ id, labelText, style, editedInvoice }) => {
  const { showForm } = useContext(OpenContext);
  
  return (
    <div className="invoice-fill-box__input" style={style}>
      <label className="invoice-fill-box__input--label" htmlFor={id}>
        {labelText}
      </label>
      <input
        className="invoice-fill-box__input--input outline-none"
        type={`${id === "date" ? "date" : "text"}`}
        name={id}
        id={id}
        required
        defaultValue={showForm === "edit" ? editedInvoice[id] : ""}
      />
    </div>
  );
};

export default InvoiceFillBoxInput;
