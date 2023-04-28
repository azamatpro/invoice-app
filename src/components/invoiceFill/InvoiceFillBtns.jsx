const InvoiceFillBtns = ({handleClick, type, btnText, className }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`btn invoice-fill-footbtns__btn invoice-fill-footbtns__btn--${className}`}
    >
      {btnText}
    </button>
  );
};

export default InvoiceFillBtns;
