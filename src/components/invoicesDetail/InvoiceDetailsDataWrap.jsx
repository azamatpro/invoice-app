import React from "react";
import InvoiceDetailsInfoHeading from "./InvoiceDetailsInfoHeading";
import InvoiceDetailsInfoText from "./InvoiceDetailsInfoText";

const InvoiceDetailsDataWrap = ({heading, text}) => {
    return (
      <div className="invoice-info-details-box__wrap">
        <InvoiceDetailsInfoText text={text}/>
        <InvoiceDetailsInfoHeading heading={heading}/>
      </div>
    )
};

export default InvoiceDetailsDataWrap;
