import React, { Component, useEffect } from 'react';

import OutletHeading1 from '../../atoms/OutletHeading1';
import LoadingScreen from '../../molecules/LoadingScreen';
import { hide as hideNavbar } from '../../../js/components/organisms/navbar';

import outletInit from "../../../js/components/pages/outlet";
import {
  checkIsLoggedIn,
  fetchRequestToHapiWithAuth
} from '../../../js/common';

import VideoCardList2 from '../../organisms/VideoCardList2';

import '../../../css/component/pages/history_and_favorite.css';

class HistoryAndFavoriteClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_from_flask: [],
      videos: [],
      data_from_hapi: [],
      is_finish_mounted: false,
      is_on_load_video: false,
      is_first_time_load_video: true,
      heading: this.props.heading,
      date: +new Date(),
    };

    this.onDeleteVideo = this.onDeleteVideo.bind(this);
    this.setDataFromHapi = this.setDataFromHapi.bind(this);
    this.setDataFromFlask = this.setDataFromFlask.bind(this);
    this.setIsOnLaodVideo = this.setIsOnLaodVideo.bind(this);
    this.setStateHeading = this.setStateHeading.bind(this);
  }

  componentDidMount() {
    outletInit('HnFContainer', this.props.heading);
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();

    this.setState({
      is_finish_mounted: true,
    });
  }

  async componentDidUpdate() {
    outletInit('HnFContainer', this.props.heading);
    hideNavbar(document);
    checkIsLoggedIn();
  }

  setDataFromHapi(data) {
    this.setState({
      is_first_time_load_video: false,
      data_from_hapi: data,
    });
  }

  setDataFromFlask(data) {
    this.setState({
      is_first_time_load_video: false,
      data_from_flask: data,
    });
  }

  setIsOnLaodVideo(is_on_load_video) {
    this.setState({ is_on_load_video });
  }

  setStateHeading() {
    this.setState({ heading : this.props.heading, });
  }

  async onDeleteVideo(id) {
    const video = this.state.data_from_hapi.find((video) => video.actual_id == id);
    let url = this.props.heading.includes('History') ? '/histories' : '/favorites';
    url = `${url}/${video.id}`;
    await fetchRequestToHapiWithAuth(url, 'DELETE', null);
    const arr = this.state.data_from_flask.filter((item) => item.id != video.actual_id);
    this.setState({
      date: +new Date(),
      data_from_flask: arr,
    });
  }

  render() {
    return (
      <div id="HnFContainer">
        <OutletHeading1 text={this.props.heading} />
        {
          (this.state.is_on_load_video) ? <LoadingScreen /> : null
        }
        <VideoCardList2
          url={this.props.heading.includes('History') ? '/histories': '/favorites'}
          onDeleteVideo={this.onDeleteVideo}
          date={this.state.date}
          setDataFromHapi={this.setDataFromHapi}
          setDataFromFlask={this.setDataFromFlask}
          setIsOnLaodVideo={this.setIsOnLaodVideo}
          setStateHeading={this.setStateHeading}
          is_first_time_load_video={this.state.is_first_time_load_video}
          data_from_flask={this.state.data_from_flask}
          props_heading={this.props.heading}
          state_heading={this.state.heading}
          />
      </div>
    )
  }
}

export default HistoryAndFavoriteClass;
