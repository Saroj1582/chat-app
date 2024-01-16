import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="navbar">
        <span className="navLogo">Lama Chat</span>
        <div className="navbarRight">
          <div className="navImgContainer">
            <img className="navImg" src={currentUser.photoURL} alt="" />
          </div>
          <span className="navName">{currentUser.displayName}</span>
          <button onClick={() => signOut(auth)} className="logoutBtn">
            logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
