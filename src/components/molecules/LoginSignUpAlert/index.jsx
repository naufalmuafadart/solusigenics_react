import React from 'react';
import '../../../css/component/molecules/login_sign_up_alert.css';

export default function LoginSignUpAlert({ message }) {
  return (
    <div id="LoginSignUpAlert">
      <p>{message}</p>
    </div>
  );
}
