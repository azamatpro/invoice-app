import React, { useRef, useState } from "react";
import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";
import { INVOICE_ACTION_TYPES } from "./InvoiceAtionTypes";

const InvoiceFillAdd = ({ itemDispatch, itemOrder, item }) => {
  const [total, setTotal] = useState(60);
  // console.log(total);
  const quantityRef = useRef();
  const priceRef = useRef();

  const countTotal = () => {
    // console.log("Price:", priceRef.current?.value);
    // console.log("Quantity:", quantityRef.current?.value);
    // console.log(
    //   "TotalValue",
    //   priceRef.current?.value * quantityRef.current?.value
    // );

    setTotal(priceRef.current.value * quantityRef.current.value);
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name.includes("Price") || name.includes("Quantity")) {
      countTotal();
    }
    itemDispatch({
      type: INVOICE_ACTION_TYPES.EDIT_ITEM,
      payload: { [name]: value, id: item.id },
    });
  };
  const handleRemove = () => {
    itemDispatch({ type: INVOICE_ACTION_TYPES.REMOVE_ITEM, payload: item.id });
  };
  return (
    <div className="invoice-fill-item__item-inputs">
      <input
        className="invoice-fill-box__input--input"
        type="text"
        style={{ outline: "none" }}
        name={`itemName_${itemOrder}`}
        value={item[`itemName_${itemOrder}`] || item?.name}
        required
        onChange={handleEditItem}
      />
      <input
        className="invoice-fill-box__input--input"
        type="number"
        style={{ outline: "none" }}
        name={`itemQuantity_${itemOrder}`}
        ref={quantityRef}
        value={item[`itemQuantity_${itemOrder}`] || item?.quantity}
        required
        onChange={handleEditItem}
      />
      <input
        className="invoice-fill-box__input--input"
        type="number"
        style={{ outline: "none" }}
        name={`itemPrice_${itemOrder}`}
        ref={priceRef}
        value={item[`itemPrice_${itemOrder}`] || item?.price}
        required
        onChange={handleEditItem}
      />
      <input
        className="invoice-fill-box__input--input"
        type="number"
        style={{ border: "none", outline: "invert" }}
        name={`itemTotal_${itemOrder}`}
        value={item?.total || total}
        required
        onChange={handleEditItem}
      />
      <IconDelete className="icon-delete-box" onClick={handleRemove} />
    </div>
  );
};

export default InvoiceFillAdd;
