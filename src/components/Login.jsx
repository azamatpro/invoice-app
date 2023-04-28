import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../utils/firebase.utils";
import { useState } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate()
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInAuthWithEmailAndPassword(email, password);
      navigate("/")
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("Can not find user, Please sign up");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password for email");
      } else {
        console.log(error);
      }
    }
  };

  const signGoogleUser = async () => {
    await signInWithGooglePopup();
    navigate("/")
  };

  return (
    <div className="sign">
      <h1 className="sign__heading">Welcome back</h1>
      <p className="sign__message">Log in with your email and password</p>
      <form onSubmit={handleSubmit} className="sign__form">
        <input
          className="sign__input input-btn"
          type="email"
          name="email"
          placeholder="Email address"
          required
          value={email}
          onChange={handleChange}
        />
        <input
          className="sign__input input-btn"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />
        <button className="sign__btn-continue input-btn">Continue</button>
      </form>
      <p className="sign__message">
        Don't have an account?
        <Link className="sign__link" to="/signup">
          Sign up
        </Link>
      </p>
      <div className="orbox">
        <span>&nbsp;</span>
        <p>OR</p>
        <span>&nbsp;</span>
      </div>
      <button
        className="sign__btn-google input-btn"
        type="button"
        onClick={signGoogleUser}
      >
        <FcGoogle /> <span>Log in with Google</span>
      </button>
    </div>
  );
};

export default Login;
