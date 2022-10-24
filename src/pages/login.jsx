import React, { useEffect } from 'react';
import {
  Link,
  redirect,
  Form
} from "react-router-dom";
import LoginSignUpAlert from '../components/molecules/LoginSignUpAlert';
import '../css/pages/login.css';
import init from '../js/pages/login';
import { checkIsLoggedOut } from '../js/common';

export async function action({ request }) {
  const formData = await request.formData();
  const usernameoremail = formData.get("usernameoremail");
  const password = formData.get("password");

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    usernameoremail,
    password,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch(`${import.meta.env.VITE_HAPI_HOST}/authentications`, requestOptions);
  let data = await response.text();
  data = JSON.parse(data);
  if (response.status == 201) {
    const { accessToken, refreshToken } = data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return redirect('/');
  }
  else {
    const alert = document.getElementById('LoginSignUpAlert');
    alert.classList.add('danger');
    alert.classList.add('show');
    alert.innerHTML = `<p>${data.message}</p>`;
  }
}

export function Login() {
  useEffect(() => {
    init(document);
    checkIsLoggedOut();
    if(sessionStorage.getItem('loginAlertType') !== null) {
      const message = sessionStorage.getItem('loginAlertMessage');
      const loginAlertType = sessionStorage.getItem('loginAlertType');
      const alert = document.getElementById('LoginSignUpAlert');
      alert.classList.add(loginAlertType);
      alert.classList.add('show');
      alert.innerHTML = `<p>${message}</p>`;
      sessionStorage.clear();
    }
  });

  return (
    <div id="content">
      <div className="box">
        <Form method="post">
          <h1 className="billabong-font-family">Solusigenics</h1>
          <LoginSignUpAlert message={''} />
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Username atau email"
              name="usernameoremail"
              maxLength={100}
              required
              />
          </div>
          <div className="inputContainer">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength={8}
              maxLength={40}
              required
              />
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
