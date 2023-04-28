import produce from "immer";
import { useContext, useReducer } from "react";
import { InvoiceContext } from "../../contexts/InvoiceContext";
import { OpenContext } from "../../contexts/OpenContext";
import { INVOICE_ACTION_TYPES } from "./InvoiceAtionTypes";
import InvoiceFillAdd from "./InvoiceFillAdd";
import { nanoid } from "nanoid";

const defaultNewItem = {
  name: "",
  quantity: 0,
  price: 0,
  total: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case INVOICE_ACTION_TYPES.ADD_ITEM:
      state.push({ ...defaultNewItem, id: nanoid() });
      break;
    case INVOICE_ACTION_TYPES.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case INVOICE_ACTION_TYPES.EDIT_ITEM:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    default:
      return state;
  }
};
const InvoiceItemsList = () => {
  const { invoice } = useContext(InvoiceContext);
  const { showForm } = useContext(OpenContext);
  const handleShowAddItem = () => {
    dispatch({ type: INVOICE_ACTION_TYPES.ADD_ITEM });
  };

  const [state, dispatch] = useReducer(
    produce(reducer),
    showForm === "edit" ? invoice?.items : []
  );
  return (
    <div className="invoice-fill-item">
      <h1 className="invoice-fill-item__heading">Item List</h1>
      <div className="invoice-fill-item__item-inputs">
        <span className="invoice-fill-box__input--label">Item Name</span>
        <span className="invoice-fill-box__input--label">Qty.</span>
        <span className="invoice-fill-box__input--label">Price</span>
        <span className="invoice-fill-box__input--label">Total</span>
      </div>

      {state.map((item, i) => (
        <InvoiceFillAdd
          key={nanoid()}
          itemDispatch={dispatch}
          itemOrder={i + 1}
          item={item}
        />
      ))}
      <button
        type="button"
        className="btn invoice-fill-item__btn"
        onClick={handleShowAddItem}
      >
        + Add New Item
      </button>
    </div>
  );
};

export default InvoiceItemsList;
