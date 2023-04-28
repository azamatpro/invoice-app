import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../assets/icon-arrow-right.svg";
const InvoiceItem = ({ invoice }) => {
  const { id, createdAt, clientName, total, status } = invoice;
  return (
    <Link to={`${id}`} className="invoice">
      <h2 className="invoice__id-style">
        <span>#</span>
        {id}
      </h2>
      <p className="invoice__text-style invoice__text--date">{createdAt}</p>
      <p className="invoice__text-style invoice__text--name">{clientName}</p>
      <div className="invoice__price-box">
        <h2 className="invoice__price">£ {total}</h2>
      </div>
      <button className={`btn invoice__btn invoice__btn--${status}`}>
        <span style={{ marginRight: "0.3rem" }}>&#9679;</span> {status}
      </button>
      <ArrowRight className="invoice__icon" />
    </Link>
  );
};

export default InvoiceItem;
