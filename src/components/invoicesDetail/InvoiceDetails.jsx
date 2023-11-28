import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import { InvoiceContext } from "../../contexts/InvoiceContext";
import { InvoiceDataContext } from "../../contexts/InvoiceDataContext";
import { OpenContext } from "../../contexts/OpenContext";
import { deleteDocument } from "../../utils/firebase.utils";
import InvoiceDetailsBtn from "./InvoiceDetailsBtn";
import InvoiceDetailsDataWrap from "./InvoiceDetailsDataWrap";
import InvoiceDetailsInfoText from "./InvoiceDetailsInfoText";
import InvoiceDetailsItem from "./InvoiceDetailsItem";
import { nanoid } from "nanoid";

const InvoiceDetails = () => {
  const { fetchInvoices } = useContext(InvoiceDataContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setShowForm } = useContext(OpenContext);
  const { invoice, getInvoice } = useContext(InvoiceContext);
  useEffect(() => {
    getInvoice(id);
  }, [id, getInvoice]);

  if (!invoice) return <h1 style={{ marginTop: "6rem" }}>Loading</h1>;

  const {
    status,
    description,
    senderAddress,
    clientAddress,
    createdAt,
    paymentDue,
    clientName,
    clientEmail,
    items,
    total,
  } = invoice;

  const handleEdit = () => {
    setShowForm("edit");
  };
  const handleDelete = async () => {
    await deleteDocument(invoice.id.toLowerCase());
    navigate("/");
    fetchInvoices();
  };
  const handleMarkPaid = () => {
    if (status !== "paid") {
      navigate("/payment");
    } else {
      alert("Payment is already completed!");
      return;
    }
  };

  return (
    <div className='invoice-data'>
      {/* <!-- Go Back --> */}
      <Link
        to='/'
        className='btn go-back'
      >
        <ArrowLeft className='go-back__icon' />
        <span className='go-back__text'>Go back</span>
      </Link>

      {/* <!-- Invoice Detail Btns --> */}
      <div className='invoice-detail-manage'>
        <p className='invoice-detail-manage__text'>Status</p>
        <div className='invoice-detail-manage__btn-cover'>
          <button className={`btn invoice__btn invoice__btn--${status}`}>
            <span style={{ marginRight: "0.3rem" }}>&#9679;</span> {status}
          </button>
          <InvoiceDetailsBtn
            handleClick={handleEdit}
            btnText='Edit'
            className='edit'
          />
          <InvoiceDetailsBtn
            handleClick={handleDelete}
            btnText='Delete'
            className='delete'
          />
          <InvoiceDetailsBtn
            handleClick={handleMarkPaid}
            btnText='Mark as Paid'
            className='mark-paid'
          />
        </div>
      </div>

      {/* <!-- Invoice info --> */}
      <div className='invoice-info'>
        <div className='invoice-info-head'>
          <div className='invoice-info-head-box'>
            <h1
              className='invoice__id-style invoice-info-head-box__id'
              style={{ fontSize: "1.7rem" }}
            >
              <span>#</span>
              {id}
            </h1>
            <InvoiceDetailsInfoText text={description} />
          </div>
          <div className='invoice-info-head-box'>
            <InvoiceDetailsInfoText
              style={{ textAlign: "right" }}
              text={senderAddress.street}
            />
            <InvoiceDetailsInfoText
              style={{ textAlign: "right" }}
              text={senderAddress.city}
            />
            <InvoiceDetailsInfoText
              style={{ textAlign: "right" }}
              text={senderAddress.postCode}
            />
            <InvoiceDetailsInfoText
              style={{ textAlign: "right" }}
              text={senderAddress.country}
            />
          </div>
        </div>
        <div className='invoice-info-details'>
          <div className='invoice-info-details-box'>
            <InvoiceDetailsDataWrap
              heading={createdAt}
              text='Invoice Date'
            />
            <InvoiceDetailsDataWrap
              heading={paymentDue}
              text='Payment Due'
            />
          </div>
          <div className='invoice-info-details-box'>
            <InvoiceDetailsDataWrap
              heading={clientName}
              text='Payment Due'
            />
            <div className='invoice-info-details-box__wrap'>
              <InvoiceDetailsInfoText text={clientAddress.street} />
              <InvoiceDetailsInfoText text={clientAddress.city} />
              <InvoiceDetailsInfoText text={clientAddress.postCode} />
              <InvoiceDetailsInfoText text={clientAddress.country} />
            </div>
          </div>
          <div className='invoice-info-details-box'>
            <InvoiceDetailsDataWrap
              heading={clientEmail}
              text='Sent to'
            />
          </div>
        </div>

        <div className='invoice-info-wrap-items'>
          <div className='padding-medium invoice-info-item'>
            <div className='invoice-info-item-box margin-r-2'>
              <InvoiceDetailsInfoText
                style={{ justifySelf: "start" }}
                text='Item Name'
              />
              <InvoiceDetailsInfoText
                style={{ justifySelf: "center" }}
                text='QTY.'
              />
              <InvoiceDetailsInfoText
                style={{ justifySelf: "center" }}
                text='Price'
              />
              <InvoiceDetailsInfoText
                style={{ justifySelf: "center" }}
                text='Total'
              />
            </div>
            <div className='invoice-info-item-scroll invoice-info-item'>
              {items.map((item) => (
                <InvoiceDetailsItem
                  key={nanoid()}
                  item={item}
                />
              ))}
            </div>
          </div>
          <div className='invoice-info-item-amount'>
            <p className='invoice-info-item-amount__amount-text'>Amount Due</p>
            <h1 className='invoice-info-item-amount__amount'>$ {total}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
