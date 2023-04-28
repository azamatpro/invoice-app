import { ReactComponent as EmptyLogo } from "../assets/illustration-empty.svg";

const EmptyBox = () => {
  return (
    <>
      <div className="sign-box">
        <EmptyLogo className="sign-box__logo" />
        <h2>No Invoice found here</h2>
        <div style={{ width: "25rem" }}>
          <p>
            Create an invoice by clicking the <strong>New Invoice</strong>{" "}
            button and get started
          </p>
        </div>
      </div>
    </>
  );
};

export default EmptyBox;
