import React, { Component } from 'react';

import OutletHeading1 from '../../atoms/OutletHeading1';
import VideoCard2 from '../../molecules/VideoCard2';
import LoadingScreen from '../../molecules/LoadingScreen';

class HistoryAndFavoriteClass extends Component {
  componentDidMount() {
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();
  }

  render() {
    return (
      <>
        <OutletHeading1 text={this.props.heading} />
        <LoadingScreen />
        <VideoCard2 />
        <VideoCard2 />
        <VideoCard2 />
      </>
    )
  }
}

export default HistoryAndFavoriteClass;
