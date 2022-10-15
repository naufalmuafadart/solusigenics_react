import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/pages/login.css';
import init from '../js/pages/signup';

export default function SignUp() {
  useEffect(() => {
    init(document);
  });

  return (
    <div id="content">
      <div className="box">
        <form>
          <h1 className="billabong-font-family">Solusigenics</h1>
          <div className="inputContainer">
            <input type="text" placeholder="Username" />
          </div>
          <div className="inputContainer">
            <input type="text" placeholder="Email" />
          </div>
          <div className="inputContainer">
            <input type="text" placeholder="Password" />
          </div>
          <div className="inputContainer">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
      <div className="box">
        <p>Sudah punya akun? <Link to={`/login`} className="link-login-signup">Login</Link></p>
      </div>
    </div>
  );
}
