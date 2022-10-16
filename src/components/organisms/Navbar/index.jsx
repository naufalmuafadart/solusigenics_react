import React, { Component } from "react";
import { Link } from "react-router-dom";
import init from "../../../js/components/organisms/navbar";

import "../../../css/component/organisms/navbar.css";

export default class Navbar extends Component {
  componentDidMount() {
    init(document);

    this.onMouseEnterThreeDots = this.onMouseEnterThreeDots.bind(this);
    this.onClickHistoryMenu = this.onClickHistoryMenu.bind(this);
  }

  onMouseEnterThreeDots() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.display = "block";
  }

  onClickHistoryMenu() {
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.style.display = "none";
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
              <p id="welcomeGreeting">Welcome, user</p>
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
            <Link to="/history" onClick={() => this.onClickHistoryMenu()}>History Tontonan</Link>
            <Link to="/login">Logout</Link>
          </aside>
        </div>
      </nav>
    );
  }
}
