import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class index extends Component {
  render() {
    return (
      <div className="card">
        <Link to="/tonton" className="left-side" style={{ textDecoration: "none" }}>
          <img
            src="https://i.ytimg.com/vi/xyVfLxV08I0/maxresdefault.jpg"
            className="thumbnail"/>
          <p>Video Favorit Video Favorit Video Favorit Video Favorit Video Favorit Video Favorit Video Favorit Video Favorit Video Favorit </p>
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
