import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/organisms/Navbar';
import Aside from '../../components/organisms/Aside';
import init from '../../js/pages/user/home';
import { hide as hideNavbar, show as showNavbar } from '../../js/components/organisms/navbar';
import { checkIsLoggedIn } from '../../js/common';

import '../../css/font.css';
import '../../css/app.css';
import '../../css/pages/home.css';

export default class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDiseaseOrder : 0,
    };

    this.onAsideButtonClicked = this.onAsideButtonClicked.bind(this);
    this.onAsideToggleClicked = this.onAsideToggleClicked.bind(this);
    this.onOutletChange = this.onOutletChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    checkIsLoggedIn();
  }

  componentDidMount() {
    init(document);
  }

  onAsideButtonClicked(order) {
    hideNavbar(document);
    this.setState({
      selectedDiseaseOrder: order,
    });
  }

  onAsideToggleClicked() {
    const asideToggle = document.getElementById("asideToggle");
    if (asideToggle.value === 'active') {
      hideNavbar(document);
    }
    else {
      showNavbar(document);
    }
  }

  onOutletChange() {
    hideNavbar(document);
    checkIsLoggedIn();
  }

  async onLogout() {
    const refreshToken = localStorage.getItem('refreshToken');

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ refreshToken });

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${import.meta.env.VITE_HAPI_HOST}/authentications`, requestOptions);

    localStorage.clear();
  }

  render() {
    return (
      <>
        <Navbar
          onAsideToggleClicked={this.onAsideToggleClicked}
          onLogout={this.onLogout}
          />
        <div id="mainContent">
          <Aside
            selectedDiseaseOrder={this.state.selectedDiseaseOrder}
            onAsideButtonClicked={this.onAsideButtonClicked} />
          <Outlet
            context={
              { 
                onAsideButtonClicked: this.onAsideButtonClicked,
                onOutletChange: this.onOutletChange,
              }
            }
            />
        </div>
        <input
          type="hidden"
          defaultValue={window.innerWidth > 800 ? 'active' : 'hide'}
          style={{marginTop: '100px'}}
          id="asideToggle"
          />
      </>
    );
  }
}
