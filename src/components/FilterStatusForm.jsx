import { useContext, useState } from "react";
import { InvoiceDataContext } from "../contexts/InvoiceDataContext";
const statuses = ["paid", "draft", "pending", "all"];

const FilterStatusForm = ({ switchFilter }) => {
  const { setFilterValue } = useContext(InvoiceDataContext);
  const handleStatusChange = (e) => {
    setFilterValue(e.target.value);
    setTimeout(() => {
      switchFilter(false);
    }, 100);
  };

  return (
    <form className="filter-form header-filter-position" action="#">
      {statuses.map((status) => (
        <div className="filter-form__category" key={status}>
          <input
            onChange={handleStatusChange}
            name="filter"
            type="radio"
            defaultValue={status}
          />
          <span>{status}</span>
        </div>
      ))}
    </form>
  );
};

export default FilterStatusForm;
