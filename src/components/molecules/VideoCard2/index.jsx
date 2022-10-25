import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class index extends Component {
  render() {
    return (
      <div className="card">
        <Link to="/tonton" className="left-side" style={{ textDecoration: "none" }}>
          <img
            src={this.props.thumbnail}
            className="thumbnail"/>
          <p>{this.props.title}</p>
        </Link>
        <div className="right-side">
          <img
            src="/images/icon/trash_bin.png"
            className="ic-trash"
            />
        </div>
      </div>
    )
  }
}
