import React, { Component } from 'react';
import OutletHeading2 from '../../atoms/OutletHeading2';
import LoadingScreen from '../../molecules/LoadingScreen';
import VideoCardList from "../VideoCardList";

class HomeIndexClass extends Component {
  componentDidMount() {
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();
  }

  render() {
    return (
      <div id="HomeIndex">
        <OutletHeading2 text="Rekomendasi Untuk Anda" />
        <LoadingScreen />
        <VideoCardList videos={this.props.data} />
      </div>
    );
  }
}

export default HomeIndexClass;
