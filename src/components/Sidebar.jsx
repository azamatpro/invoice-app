import { ReactComponent as InvoiceLogo } from "../assets/logo.svg";
import Avatar from "./Avatar";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo-box">
        <InvoiceLogo className="logo-box__logo" />
        <div className="logo-box__footer"></div>
      </div>
      <Avatar/>
    </nav>
  );
};

export default Sidebar;
