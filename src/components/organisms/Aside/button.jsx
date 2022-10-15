import cx from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: this.props.order,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onAsideButtonClicked(this.state.order);
  }

  render() {
    const cn = cx({
      selected: this.props.active,
      btnDisease: true,
    });
    return (
      <Link to={`/${this.props.disease}`}>
        <button
          className={cn}
          onClick={this.onClick}
          >
          { this.props.disease }
        </button>
      </Link>
    );
  }
}

export default Button;
