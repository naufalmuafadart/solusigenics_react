import React, { Component, useEffect } from 'react';

import OutletHeading1 from '../../atoms/OutletHeading1';
import LoadingScreen from '../../molecules/LoadingScreen';
import { hide as hideNavbar } from '../../../js/components/organisms/navbar';

import outletInit from "../../../js/components/pages/outlet";
import {
  checkIsLoggedIn,
  fetchRequestToHapiWithAuth,
  fetchRequestToHapi,
  fetchRequestToFlask,
} from '../../../js/common';

import VideoCardList2 from '../../organisms/VideoCardList2';

import '../../../css/component/pages/history_and_favorite.css';

const HeadingPropsChangeDetector = (props) => {
  const {props_heading, state_heading, date, onPropsChange } = props;
  useEffect(() => {
    const checkPropsChange = async () => {
      if (props_heading != state_heading) {
        await onPropsChange();
      }
    };
    checkPropsChange();
  }, [
    props_heading,
    state_heading,
    date,
  ]);
  return (null);
};

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

    this.alertNoVideo = `Tidak ada ${this.props.heading.toLowerCase()}`;

    this.onDeleteVideo = this.onDeleteVideo.bind(this);
    this.setStateHeading = this.setStateHeading.bind(this);
    this.loadVideo = this.loadVideo.bind(this);
    this.onPropsChange = this.onPropsChange.bind(this);
  }

  async componentDidMount() {
    outletInit('HnFContainer', this.props.heading);
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();

    await this.loadVideo();

    this.setState({
      is_finish_mounted: true,
    });
  }

  async componentDidUpdate() {
    outletInit('HnFContainer', this.props.heading);
    hideNavbar(document);
    checkIsLoggedIn();
  }

  async loadVideo() {
    this.setState({
      is_on_load_video : true,
      data_from_flask: [],
      data_from_hapi: [],
    });
    let url = this.props.heading.includes('History') ? '/histories' : '/favorites';
    let result = await fetchRequestToHapiWithAuth(url, 'GET', null);
    const videos = result.data;

    const arr_video_id = videos.map((video) => video.video_id);

    if (arr_video_id.length != 0) {
      let raw = {
        "video_ids": arr_video_id.map((video) => ({ id: video })),
      };

      result = await fetchRequestToHapi('/videos/get', 'POST', raw);
      let data_from_hapi = result['data'];
      
      raw = data_from_hapi.map(
        (video) => ({
          id: video.actual_id,
          source: video.source,
        })
      );
      
      let data_from_flask = await fetchRequestToFlask('/get_videos_detail', 'POST', raw);
      data_from_flask = data_from_flask.data;
      console.log(data_from_flask);
      
      this.setState({ data_from_hapi, data_from_flask, });
    }
    this.setState({ is_on_load_video : false });
  }

  setStateHeading() {
    this.setState({ heading : this.props.heading, });
  }

  async onPropsChange() {
    this.alertNoVideo = `Tidak ada ${this.props.heading.toLowerCase()}`;
    this.setStateHeading();
    await this.loadVideo();
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
          (this.state.is_finish_mounted && this.state.data_from_flask.length == 0 && !this.state.is_on_load_video) ?
            <h2 className="alert">{this.alertNoVideo}</h2>
          :
            null
        }
        {
          (this.state.is_on_load_video) ? <LoadingScreen /> : null
        }
        <VideoCardList2
          onDeleteVideo={this.onDeleteVideo}
          data_from_flask={this.state.data_from_flask}
          />
        <HeadingPropsChangeDetector
          props_heading={this.props.heading}
          state_heading={this.state.heading}
          date={this.state.date}
          onPropsChange={this.onPropsChange}
          />
      </div>
    )
  }
}

export default HistoryAndFavoriteClass;
