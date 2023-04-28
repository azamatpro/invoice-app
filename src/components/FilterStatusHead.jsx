import { useState } from "react";
import { ReactComponent as ArrowDown } from "../assets/icon-arrow-down.svg";
import { ReactComponent as ArrowUp } from "../assets/icon-arrow-up.svg";
import FilterStatusForm from "./FilterStatusForm";

const FilterStatusHead = () => {
  const [showFilter, setShowFilter] = useState(false);
  const toggleShowFilter = () => setShowFilter(!showFilter);
  return (
    <>
      <div className="filter-status" onClick={toggleShowFilter}>
        <span className="filter-status__title">Filter by status</span>
        {!showFilter ? (
          <ArrowDown
            className="filter-status__icon"
            style={{ marginTop: "0.5rem" }}
          />
        ) : (
          <ArrowUp className="filter-status__icon" />
        )}
      </div>
      {showFilter && <FilterStatusForm switchFilter={setShowFilter} />}
    </>
  );
};

export default FilterStatusHead;
