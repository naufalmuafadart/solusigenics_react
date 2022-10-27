import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.onDeleteVideo(this.props.id);
  }

  render() {
    return (
      <div className="card">
        <Link
          to={`/tonton?id=${this.props.id}&source=${this.props.source}`}
          className="left-side"
          style={{ textDecoration: "none" }}
          >
          <img
            src={this.props.thumbnail}
            className="thumbnail"/>
          <p>{this.props.title}</p>
        </Link>
        <div className="right-side">
          <img
            src="/images/icon/trash_bin.png"
            className="ic-trash"
            onClick={() => this.onDelete()}
            />
        </div>
      </div>
    )
  }
}
