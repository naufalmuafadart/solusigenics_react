import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/organisms/Navbar';
import Aside from '../../components/organisms/Aside';
import init from '../../js/pages/user/home';

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
  }

  componentDidMount() {
    init(document);
  }

  onAsideButtonClicked(order) {
    if (window.innerWidth <= 800) {
      const asideToggle = document.getElementById('asideToggle');
      const aside = document.querySelector("#mainContent > aside");
      asideToggle.value = 'hide';
      aside.style.display = 'none';
    }
    this.setState({
      selectedDiseaseOrder: order,
    });
  }

  onAsideToggleClicked() {
    if (window.innerWidth <= 800) {
      const aside = document.querySelector("#mainContent > aside");
      const asideToggle = document.getElementById("asideToggle");
      asideToggle.value = asideToggle.value == 'active' ? 'hide' : 'active';
      if (asideToggle.value === 'active') {
        aside.style.display = 'block';
      }
      else {
        aside.style.display = 'none';
      }
    }
  }

  onOutletChange() {
    if (window.innerWidth <= 800) {
      const asideToggle = document.getElementById('asideToggle');
      const aside = document.querySelector("#mainContent > aside");
      asideToggle.value = 'hide';
      aside.style.display = 'none';
    }
  }

  render() {
    return (
      <>
        <Navbar onAsideToggleClicked={this.onAsideToggleClicked} />
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
