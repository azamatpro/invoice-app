import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  signInWithGooglePopup,
} from "../utils/firebase.utils";
import { useState } from "react";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate()
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return alert("Password and Confirm password are not match");
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      navigate("/")
      await createUserDocFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Can not create user, email is already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const signGoogleUser = async () => {
    await signInWithGooglePopup();
    navigate("/")
  };
  return (
    <div className="sign">
      <h1 className="sign__heading">Create your account</h1>
      <p className="sign__message">Sign up with your email and password</p>
      <form onSubmit={handleSubmit} className="sign__form">
        <input
          className="sign__input input-btn"
          type="text"
          name="displayName"
          placeholder="Display name"
          required
          value={displayName}
          onChange={handleChange}
        />
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

        <input
          className="sign__input input-btn"
          type="password"
          name="confirmPassword"
          placeholder="Confim password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />
        <button className="sign__btn-continue input-btn">Continue</button>
      </form>
      <p className="sign__message">
        Already have an account?
        <Link className="sign__link" to="/login">
          Log in
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
        <FcGoogle /> <span>Sign up with Google</span>
      </button>
    </div>
  );
};

export default Signup;
