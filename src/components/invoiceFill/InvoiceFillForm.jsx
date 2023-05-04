import { useContext, useRef } from "react";
import { InvoiceContext } from "../../contexts/InvoiceContext";
import { InvoiceDataContext } from "../../contexts/InvoiceDataContext";
import { OpenContext } from "../../contexts/OpenContext";
import { UserContext } from "../../contexts/UserContext";
import { addCollectionAndDocs } from "../../utils/firebase.utils";
import InvoiceFillBoxInput from "./InvoiceFillBoxInput";
import InvoiceFillBtns from "./InvoiceFillBtns";
import InvoiceFillSelect from "./InvoiceFillSelect";
import InvoiceItemsList from "./invoiceItemsList";
import { nanoid } from "nanoid";


const InvoiceFillForm = ({ style }) => {
  const { invoice, getInvoice } = useContext(InvoiceContext);
  const { fetchInvoices } = useContext(InvoiceDataContext);
  const { showForm, setShowForm } = useContext(OpenContext);
  const { currentUser } = useContext(UserContext);
  const containerRef = useRef(null);

  let editedInvoice;
  if (showForm === "edit") {
    editedInvoice = {
      ...invoice,
      senderStreet: invoice.senderAddress.street,
      senderCity: invoice.senderAddress.city,
      senderPostCode: invoice.senderAddress.postCode,
      senderCountry: invoice.senderAddress.country,
      clientStreet: invoice.clientAddress.street,
      cleintCity: invoice.clientAddress.city,
      clientPostCode: invoice.clientAddress.postCode,
      clientCountry: invoice.clientAddress.country,
      date: invoice.createdAt,
    };
  }

  const handleDiscard = () => {
    setShowForm("");
  };
  let status = "pending";
  const handleDraft = () => {
    status = "draft";
    fetchInvoices();
  };

  // HELPER FUNCS
  const generateId = () => {
    const abs = "abcdefghijklmnopqrstuvwxyz";
    const randomAbs = `${abs[Math.floor(Math.random() * abs.length)]}${
      abs[Math.floor(Math.random() * abs.length)]
    }`.toUpperCase();
    return randomAbs + Math.floor(1000 + Math.random() * 9000);
  };
  const createItems = (data) => {
    const filteredItems = Object.entries(data).filter((invoice) =>
      invoice[0].startsWith("item")
    );
    const items = [];
    for (let i = 1; i <= filteredItems.length / 4; i++) {
      const obj = Object.fromEntries(
        filteredItems.filter((el) => el[0].includes(i))
      );
      const item = {
        name: obj[`itemName_${i}`],
        quantity: obj[`itemQuantity_${i}`],
        price: obj[`itemPrice_${i}`],
        total: obj[`itemTotal_${i}`],
        id: nanoid(),
      };
      items.push(item);
    }
    return items;
  };

  const getFormData = function (e) {
    e.preventDefault();
    const invoiceDataArr = [...new FormData(e.target)];
    const data = Object.fromEntries(invoiceDataArr);
    const id = showForm === "new" ? generateId() : invoice.id;
    const items = createItems(data);
    const total = items.reduce((sum, item) => sum + item.total * 1, 0);
    const paymentTerms = data.paymentTerms.split(" ")[1];
    const invoiceDoc = {
      userId: currentUser.uid,
      id,
      createdAt: data.date,
      status,
      paymentDue: "no payment",
      description: data.description,
      paymentTerms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      senderAddress: {
        street: data.senderStreet,
        city: data.senderCity,
        postCode: data.senderPostCode,
        country: data.senderCountry,
      },
      clientAddress: {
        street: data.clientStreet,
        city: data.cleintCity,
        postCode: data.clientPostCode,
        country: data.clientCountry,
      },
      items,
      total,
    };
    addCollectionAndDocs("invoices", invoiceDoc);
    setShowForm("");
    fetchInvoices();
    if (showForm === "edit") getInvoice(id);
  };

  return (
    <form onSubmit={getFormData} className="invoice-fill" style={{ ...style }}>
      <h1 className="invoice-fill__heading">New Invoice</h1>

      <div className="invoice-fill-inputs" ref={containerRef}>
        <div className="invoice-fill-box">
          <h3 className="invoice-fill-box__heading">Bill From</h3>

          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="senderStreet"
            labelText="Street Address"
            style={{ gridColumn: "1 /-1" }}
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="senderCity"
            labelText="City"
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="senderPostCode"
            labelText="Post code"
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="senderCountry"
            labelText="Country"
          />
        </div>

        <div className="invoice-fill-box">
          <h3 className="invoice-fill-box__heading">Bill To</h3>
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="clientName"
            labelText="Clinet's name"
            style={{ gridColumn: "1 /-1" }}
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="clientEmail"
            labelText="Clinet's email"
            style={{ gridColumn: "1 /-1" }}
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="clientStreet"
            labelText="Street Address"
            style={{ gridColumn: "1 /-1" }}
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="cleintCity"
            labelText="City"
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="clientPostCode"
            labelText="Post code"
          />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="clientCountry"
            labelText="Country"
          />
        </div>

        <div className="invoice-fill-date-box">
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="date"
            labelText="Invoice Date"
          />
          <InvoiceFillSelect editedInvoice={editedInvoice} />
          <InvoiceFillBoxInput
            editedInvoice={editedInvoice}
            id="description"
            labelText="Description"
            style={{ gridColumn: "1 /-1" }}
          />
        </div>

        <InvoiceItemsList container={containerRef} />
      </div>

      <div className="invoice-fill-footbtns">
        <InvoiceFillBtns
          type={"button"}
          handleClick={handleDiscard}
          btnText="Discard"
          className="discard"
        />
        <InvoiceFillBtns
          type={"submit"}
          btnText="Save as Draft"
          className="save-draft"
          handleClick={handleDraft}
        />
        <InvoiceFillBtns
          type={"submit"}
          btnText="Save & Send"
          className="save-send"
        />
      </div>
    </form>
  );
};

export default InvoiceFillForm;
