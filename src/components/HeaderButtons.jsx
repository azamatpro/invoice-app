
import { useContext } from "react";
import { ReactComponent as IconPlus } from "../assets/icon-plus.svg";
import { OpenContext } from "../contexts/OpenContext";
import FilterStatusHead from "./FilterStatusHead";

const HeaderButtons = () => {
  const { setShowForm } = useContext(OpenContext);
  const toggleShowForm = () => setShowForm("new");

  return (
    <div className="header-buttons">
      <div className="filter-container">
        <FilterStatusHead />
      </div>
      <button onClick={toggleShowForm} className="btn btn-new-invoice">
        <div className="plus-box">
          <IconPlus />
        </div>
        <span>New Invoice</span>
      </button>
    </div>
  );
};

export default HeaderButtons;
