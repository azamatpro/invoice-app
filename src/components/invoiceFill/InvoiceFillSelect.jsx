

const InvoiceFillSelect = ({editedInvoice}) => {
  const options = [1, 7, 14, 30];
  return (
    <div className="">
      <label className="invoice-fill-box__input--label" htmlFor="payment">
        Payment Terms
      </label>
      <select
        className="invoice-fill-box__input--input"
        name="paymentTerms"
        id="payment"
        defaultValue={`Net ${options.find((option) => option === +editedInvoice?.paymentTerms)} Days`}
      >
        {options.map((option) => {
          return (
            <option
              key={option}
              defaultValue={`net-${option}`}
            >
              Net {option} Days
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InvoiceFillSelect;
