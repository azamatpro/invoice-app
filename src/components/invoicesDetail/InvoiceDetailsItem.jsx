import InvoiceDetailsInfoHeading from "./InvoiceDetailsInfoHeading";
import InvoiceDetailsInfoText from "./InvoiceDetailsInfoText";

const InvoiceDetailsItem = ({ item }) => {
  const { name, price, quantity, total } = item;
  return (
    <div className="invoice-info-item-box">
      <InvoiceDetailsInfoHeading
        style={{ justifySelf: "start" }}
        heading={name}
      />
      <InvoiceDetailsInfoText
        style={{ justifySelf: "center" }}
        text={quantity}
      />
      <InvoiceDetailsInfoText style={{ justifySelf: "center" }} text={price} />
      <InvoiceDetailsInfoText style={{ justifySelf: "center" }} text={total} />
    </div>
  );
};

export default InvoiceDetailsItem;
