import React, { useEffect } from 'react';
import {
  Link,
  redirect,
  Form
} from "react-router-dom";
import LoginSignUpAlert from '../components/molecules/LoginSignUpAlert';
import '../css/pages/login.css';
import init from '../js/pages/login';

export async function action() {
  return redirect('/');
}

export function Login() {
  useEffect(() => {
    init(document);
    if(sessionStorage.getItem('loginAlertType') !== null) {
      const message = sessionStorage.getItem('loginAlertMessage');
      const loginAlertType = sessionStorage.getItem('loginAlertType');
      const alert = document.getElementById('LoginSignUpAlert');
      alert.classList.add(loginAlertType);
      alert.classList.add('show');
      alert.innerHTML = `<p>${message}</p>`;
    }
    sessionStorage.clear();
  });

  return (
    <div id="content">
      <div className="box">
        <Form method="post">
          <h1 className="billabong-font-family">Solusigenics</h1>
          <LoginSignUpAlert message={'Username atau Email atau Password salah'} />
          <div className="inputContainer">
            <input type="text" placeholder="Username atau email" name="usernameoremail" required />
          </div>
          <div className="inputContainer">
            <input type="password" placeholder="Password" name="password" required />
          </div>
          <div className="inputContainer">
            <input
              type="submit"
              value="Login"
              />
          </div>
        </Form>
      </div>
      <div className="box">
        <p>Belum punya akun? <Link to={`/signup`} className="link-login-signup">Sign Up</Link></p>
      </div>
    </div>
  );
}
