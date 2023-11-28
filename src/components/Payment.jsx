import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { InvoiceContext } from "../contexts/InvoiceContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { InvoiceDataContext } from "../contexts/InvoiceDataContext";
import { addCollectionAndDocs } from "../utils/firebase.utils";

export default function Payment() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { invoice } = useContext(InvoiceContext);
  const { getInvoice } = useContext(InvoiceContext);
  const { fetchInvoices } = useContext(InvoiceDataContext);
  const amount = +invoice?.total;
  const { currentUser } = useContext(UserContext);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    if (amount < 1) {
      alert("Amount is not positive!");
      setIsProcessing(false);
    }
    const res = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    });
    const data = await res.json();
    const clientSecret = data.paymentIntent.client_secret;
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser?.displayName ? currentUser?.displayName : "Guest",
        },
      },
    });
    setIsProcessing(false);
    if (paymentResult.paymentIntent.status === "succeeded") {
      setIsProcessing(false);
      invoice.status = "paid";
      invoice.paymentDue = new Date().toJSON().slice(0, 10);
      addCollectionAndDocs("invoices", invoice);
      getInvoice(invoice?.id);
      fetchInvoices();
      alert("Payment Successful!");
      navigate(`/${invoice.id}`);
    }
    if (paymentResult.paymentIntent.error) alert(paymentResult.error);
  };
  return (
    <div className='payment'>
      <h2 className='payment__heading'>Payment</h2>
      <form
        onSubmit={handlePayment}
        className='payment__form'
      >
        <div className='invoice invoice-fixer'>
          <h2 className='invoice__id-style'>
            <span>#</span>
            {invoice?.id}
          </h2>
          <p className='invoice__text-style invoice__text--date'>{invoice?.createdAt}</p>
          <p className='invoice__text-style invoice__text--name'>{invoice?.clientName}</p>
          <div className='invoice__price-box'>
            <h2 className='invoice__price'>$ {invoice?.total}</h2>
          </div>
        </div>
        <label
          className='payment__card-title'
          htmlFor='card-payment'
        >
          Credit Card Payment
        </label>
        <CardElement id='card-payment' />
        <button className='payment__btn'>{isProcessing === true ? "Processing" : "Pay now"}</button>
      </form>
    </div>
  );
}
