import React, { Component } from 'react';

import OutletHeading1 from '../../atoms/OutletHeading1';
import VideoCard2 from '../../molecules/VideoCard2';
import LoadingScreen from '../../molecules/LoadingScreen';
import { hide as hideNavbar } from '../../../js/components/organisms/navbar';

import outletInit from "../../../js/components/pages/outlet";

import '../../../css/component/pages/history_and_favorite.css';

class HistoryAndFavoriteClass extends Component {
  componentDidMount() {
    outletInit('HnFContainer');
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();
  }

  componentDidUpdate() {
    hideNavbar(document);
  }

  render() {
    return (
      <div id="HnFContainer">
        <OutletHeading1 text={this.props.heading} />
        <LoadingScreen />
        <VideoCard2 />
        <VideoCard2 />
        <VideoCard2 />
      </div>
    )
  }
}

export default HistoryAndFavoriteClass;
