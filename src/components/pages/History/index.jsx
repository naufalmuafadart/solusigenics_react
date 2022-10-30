import React, { Component } from 'react';

import OutletHeading1 from '../../atoms/OutletHeading1';
import VideoCard2 from '../../molecules/VideoCard2';
import LoadingScreen from '../../molecules/LoadingScreen';
import { hide as hideNavbar } from '../../../js/components/organisms/navbar';

import outletInit from "../../../js/components/pages/outlet";
import {
  checkIsLoggedIn,
  fetchRequestToHapi,
  fetchRequestToFlask,
  fetchRequestToHapiWithAuth
} from '../../../js/common';

import '../../../css/component/pages/history_and_favorite.css';

class HistoryClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_from_flask: [],
      histories: [],
      data_from_hapi: [],
      is_finish_mounted: false,
    };

    this.onDeleteVideo = this.onDeleteVideo.bind(this);
  }

  async componentDidMount() {
    outletInit('HnFContainer', this.props.heading);
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();

    const url = '/histories';
    let responseResult = await fetchRequestToHapiWithAuth(url, 'GET', null);
    const histories = responseResult["data"];
    const arr_video_id = histories.map((video) => video.video_id);

    if (arr_video_id.length != 0) {
      let raw = {
        "video_ids": arr_video_id.map((video) => ({ id: video })),
      };
    
      responseResult = await fetchRequestToHapi('/videos/get', 'POST', raw);
      let data_from_hapi = responseResult['data'];
  
      raw = data_from_hapi.map(
        (video) => ({
          id: video.actual_id,
          source: video.source,
        }),
      );
  
      let data_from_flask = await fetchRequestToFlask('/get_videos_detail', 'POST', raw);
      data_from_flask = JSON.parse(data_from_flask);
  
      this.setState({
        data_from_flask: data_from_flask["videos"],
        histories: histories,
        data_from_hapi: data_from_hapi,
      });
    }
    else {
      this.setState({
        histories: histories,
      });
    }
    this.setState({
      is_finish_mounted: true,
    });
  }

  componentDidUpdate() {
    outletInit('HnFContainer', this.props.heading);
    hideNavbar(document);
    checkIsLoggedIn();
  }

  async onDeleteVideo(id) {
    const video = this.state.data_from_hapi.find((video) => video.actual_id == id);
    await fetchRequestToHapiWithAuth(`/histories/${video.id}`, 'DELETE', null);
    const arr = this.state.data_from_flask.filter((video) => video.id != id);
    this.setState({
      data_from_flask: arr,
    });
  }

  render() {
    return (
      <div id="HnFContainer">
        <OutletHeading1 text={this.props.heading} />
        {
          (this.state.data_from_flask.length == 0 && !this.state.is_finish_mounted) ? <LoadingScreen /> : null
        }
        {
          (this.state.is_finish_mounted && this.state.data_from_flask.length == 0) ?
            <h2 className="alert">Tidak ada history tontonan</h2>
          :
            null
        }
        {
          this.state.data_from_flask.map(
            (video) => (
              <VideoCard2
                key={video.id}
                id={video.id}
                source={video.source}
                title={video.title}
                thumbnail={video.thumbnail}
                onDeleteVideo={this.onDeleteVideo}
                />
            )
          )
        }
      </div>
    )
  }
}

export default HistoryClass;
