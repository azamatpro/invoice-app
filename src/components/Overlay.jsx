import { useContext } from "react";
import { OpenContext } from "../contexts/OpenContext";

const Overlay = () => {
  const handleShowForm = () => setShowForm('');
  const { setShowForm } = useContext(OpenContext);
  return (
    <div onClick={handleShowForm} className="overlay">
      &nbsp;
    </div>
  );
};

export default Overlay;
