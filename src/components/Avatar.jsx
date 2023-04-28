import { ReactComponent as IconSun } from "../assets/icon-sun.svg";
// import { ReactComponent as IconMoon } from "../assets/icon-moon.svg";
// import AvatarImage from '../assets/image-avatar.jpg'
import { RxAvatar } from "react-icons/rx";
import { signOutUser } from "../utils/firebase.utils";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const signOutHandler = async () => {
  await signOutUser();
};

const Avatar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="avatar-box">
      <IconSun className="avatar-box__switch-mode"/>

      <div className="avatar-box__bottom-border">&nbsp;</div>
      <div className="avatar-box__user">
        <RxAvatar
          style={{
            width: "3rem",
            height: "3rem",
            color: "#fff",
            cursor: "pointer",
          }}
        />
      </div>
      <div className="user-settings">
        {currentUser && (
          <p onClick={signOutHandler} className="user-settings__signout">
            Sign out
          </p>
        )}
      </div>
    </div>
  );
};

export default Avatar;
