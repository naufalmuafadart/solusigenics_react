import React, { Component } from 'react';

import outletInit from '../../../js/components/pages/outlet';
import '../../../css/component/pages/watch.css';

export default class WatchClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
    };

    this.ic_white_url = '/images/icon/heart_white.png';
    this.ic_red_url = '/images/icon/heart_red.png';

    this.onIcHeartClicked = this.onIcHeartClicked.bind(this);
  }

  componentDidMount() {
    outletInit('watch');
    this.props.onOutletChange();
  }

  onIcHeartClicked() {
    this.setState(
      (prevState) => {
        return { isLiked: !prevState.isLiked }
      }
    );
  }

  render() {
    return (
      <div id="watch">
        <iframe
          src="https://www.youtube.com/embed/-xTIRoONRa8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
        <section id="titleSection">
          <p>Webinar Seri COVID-19 Waspada Omicron, Kenali dan Kendalikan Penyakit Penyerta KOMORBID</p>
          <img
            src={
              this.state.isLiked ? this.ic_red_url : this.ic_white_url
            }
            onClick={ () => this.onIcHeartClicked() }
            alt="icon heart"
            />
        </section>
      </div>
    )
  }
}
