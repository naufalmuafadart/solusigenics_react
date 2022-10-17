import React, { useEffect } from 'react';
import { Link, Form, redirect } from "react-router-dom";
import '../css/pages/login.css';
import init from '../js/pages/signup';

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(username);
  console.log(email);
  console.log(password);

  sessionStorage.setItem('loginAlertMessage', 'Pendaftaran berhasil, silakan login');
  sessionStorage.setItem('loginAlertType', 'success');
  return redirect('/login');
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
          <div className="inputContainer">
            <input type="text" placeholder="Username" name="username" required />
          </div>
          <div className="inputContainer">
            <input type="email" placeholder="Email" name="email" required />
          </div>
          <div className="inputContainer">
            <input type="password" placeholder="Password" name="password" required />
          </div>
          <div className="inputContainer">
            <input type="submit" value="Sign Up" />
          </div>
        </Form>
      </div>
      <div className="box">
        <p>Sudah punya akun? <Link to={`/login`} className="link-login-signup">Login</Link></p>
      </div>
    </div>
  );
}
