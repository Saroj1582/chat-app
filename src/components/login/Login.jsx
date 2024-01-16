import { signInWithEmailAndPassword } from "firebase/auth";

import "../Register/register.css";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Lama Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit} className="form">
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
            <button className="SignupBtn">Login</button>
          </form>
          <span className="bottomText">
            Don't have an account? <a href="#">Register</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
