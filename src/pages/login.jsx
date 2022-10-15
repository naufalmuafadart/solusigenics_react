import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../css/pages/login.css';
import init from '../js/pages/login';

export default function Login() {
  useEffect(() => {
    init(document);
  });

  const navigate = useNavigate();

  return (
    <div id="content">
      <div className="box">
        <form>
          <h1 className="billabong-font-family">Solusigenics</h1>
          <div className="inputContainer">
            <input type="text" placeholder="Username atau email" />
          </div>
          <div className="inputContainer">
            <input type="text" placeholder="Password" />
          </div>
          <div className="inputContainer">
            <input
              type="submit"
              value="Login"
              onClick={() => { navigate('/') }}
              />
          </div>
        </form>
      </div>
      <div className="box">
        <p>Belum punya akun? <Link to={`/signup`} className="link-login-signup">Sign Up</Link></p>
      </div>
    </div>
  );
}
