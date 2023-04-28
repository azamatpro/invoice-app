import React from "react";
import { ReactComponent as EmptyLogo } from "../assets/illustration-empty.svg";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const handleLoginNavigate = () => navigate("/login");
  const handleSignupNavigate = () => navigate("/signup");
  return (
    <>
      <div className="sign-box">
        <EmptyLogo className="sign-box__logo" />
        <h2>Welcome to Invoice App</h2>
        <p>Log in with your Invoice App account to continue</p>
        <div className="sign-box__btns">
          <button onClick={handleLoginNavigate} className="sign-box__btn login">
            Log in
          </button>
          <button
            onClick={handleSignupNavigate}
            className="sign-box__btn signup"
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
