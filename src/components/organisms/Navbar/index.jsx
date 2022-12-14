import React, { Component } from "react";
import { Link, redirect } from "react-router-dom";
import { init } from "../../../js/components/organisms/navbar";

import { fetchRequestToHapiWithAuth } from '../../../js/common';

import "../../../css/component/organisms/navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.onMouseEnterThreeDots = this.onMouseEnterThreeDots.bind(this);
    this.onClickHistoryMenu = this.onClickHistoryMenu.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  async componentDidMount() {
    init(document);

    await this.getUsername();

    this.onMouseEnterThreeDots = this.onMouseEnterThreeDots.bind(this);
    this.onClickHistoryMenu = this.onClickHistoryMenu.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async getUsername() {
    const response = await fetchRequestToHapiWithAuth('/users/username', 'GET', null);
    this.setState({
      username: response.data,
    });
  }

  onMouseEnterThreeDots() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.display = "block";
  }

  onClickHistoryMenu() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.display = "none";
  }

  async onLogout(e) {
    if (localStorage.getItem('refreshToken') !== null) {
      e.preventDefault();
    }

    await this.props.onLogout();

    document.getElementById('logoutLink').click();
  }

  render() {
    return (
      <nav id="navbar">
        <main>
          <div className="left-side">
            <div id="ic-menu" onClick={() => this.props.onAsideToggleClicked()}>
              <img src="/images/icon/icons8-menu-150.svg" />
            </div>
            <Link to="/" id="navbrand-anchor">
              <p className="billabong-font-family" id="navbrand">
                Solusigenics
              </p>
            </Link>
            <Link to="/favorit" className="group-wrapper">
              <img src="/images/navbar/star.png" alt="" />
              <p id="text-video-favorite">Video Favorit</p>
            </Link>
          </div>
          <div className="right-side">
            <div className="group-wrapper">
              <img src="/images/navbar/user.png" alt="" />
              <p id="welcomeGreeting">Welcome, {this.state.username}</p>
            </div>
            <img
              src="/images/navbar/three_dots.png"
              onMouseEnter={() => this.onMouseEnterThreeDots()}
              alt="ic-three-dots"
              id="three-dots" />
          </div>
        </main>
        <hr />
        <div id="dropdown-container">
          <aside id="dropdown-menu">
            <Link
              to="/history"
              onClick={() => this.onClickHistoryMenu()}
              >
              History Tontonan
            </Link>
            <Link
              id="logoutLink"
              to="/login"
              onClick={(e) => this.onLogout(e)}
              >
              Logout
            </Link>
          </aside>
        </div>
      </nav>
    );
  }
}
