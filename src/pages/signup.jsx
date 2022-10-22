import React, { useEffect } from 'react';
import { Link, Form, redirect } from "react-router-dom";
import LoginSignUpAlert from '../components/molecules/LoginSignUpAlert';
import '../css/pages/login.css';
import init from '../js/pages/signup';

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const inputSubmit = document.getElementById('inputSubmit');

  inputSubmit.disabled = true;
  inputSubmit.value = '...';

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    username,
    email,
    password
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch('http://localhost:5001/users', requestOptions);
  let data = await response.text();
  data = JSON.parse(data);
  if (response.status == 201) {
    if (data.message == 'User successfully added') {
      sessionStorage.setItem('loginAlertMessage', 'Pendaftaran berhasil, silakan login');
      sessionStorage.setItem('loginAlertType', 'success');
      return redirect('/login');
    }
  }
  else {
    const alert = document.getElementById('LoginSignUpAlert');
    alert.classList.add('danger');
    alert.classList.add('show');
    alert.innerHTML = `<p>${data.message}</p>`;
  }
  
  inputSubmit.disabled = false;
  inputSubmit.value = 'Sign Up';
}

export function SignUp() {
  useEffect(() => {
    init(document);
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
              placeholder="Username"
              name="username"
              maxLength={50}
              required
              />
          </div>
          <div className="inputContainer">
            <input
              type="email"
              placeholder="Email"
              name="email"
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
            <input id="inputSubmit" type="submit" value="Sign Up" />
          </div>
        </Form>
      </div>
      <div className="box">
        <p>Sudah punya akun? <Link to={`/login`} className="link-login-signup">Login</Link></p>
      </div>
    </div>
  );
}
