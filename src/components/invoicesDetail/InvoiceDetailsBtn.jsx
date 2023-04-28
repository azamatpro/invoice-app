const InvoiceDetailsBtn = ({ className, btnText, handleClick }) => {
  return (
    <button
      className={`btn invoice-detail-manage__btn invoice-detail-manage__btn--${className}`}
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
};

export default InvoiceDetailsBtn;
