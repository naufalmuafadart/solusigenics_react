import backgroundImage from '../../../assets/images/loading_screeen/background.png';
import centerImage from '../../../assets/images/loading_screeen/center.png';
import React from 'react';

import '../../../css/component/molecules/loading_screen.css';

export default function LoadingScreen() {
  return (
    <div id="loading-screen">
      <div>
        <img
          id="ls-logo"
          src={centerImage}
          alt="loading bg" />
      </div>
      <div>
        <img
          id="ls-bg"
          src={backgroundImage}
          alt="logo" />
      </div>
    </div>
  )
}
