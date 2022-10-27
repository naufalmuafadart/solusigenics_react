import React, { Component } from 'react';
import OutletHeading2 from '../../atoms/OutletHeading2';
import LoadingScreen from '../../molecules/LoadingScreen';
import VideoCardList from "../../organisms/VideoCardList";

import {
  fetchRequestToHapiWithAuth,
  fetchRequestToHapi,
  fetchRequestToFlask,
} from '../../../js/common';

import outletInit from '../../../js/components/pages/outlet';
import '../../../css/component/pages/home_index.css';

class HomeIndexClass extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      videos: [],
      is_finish_mounted: false,
    };

    this.getVideoRecommendation = this.getVideoRecommendation.bind(this);
  }

  async getVideoRecommendation() {
    let response = await fetchRequestToHapiWithAuth('/favorites', 'GET', null);
    let data = response.data;
    const arr_video_id = data.map((video) => ({ id: video.video_id }));

    let body = {
      video_ids: arr_video_id,
    };
    response = await fetchRequestToHapi('/videos/get', 'POST', body);
    data = response.data;
    
    body = data.map((video) => ({ id: video.actual_id, source: video.source, }));
    response = await fetchRequestToFlask('/get_video_recommendation', 'POST', body);
    data = JSON.parse(response);
    return data.videos;
  }

  async componentDidMount() {
    outletInit('HomeIndex', 'Beranda');
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();
    const videos = await this.getVideoRecommendation();
    
    this.setState({
      videos,
      is_finish_mounted: true,
    });
  }

  render() {
    return (
      <div id="HomeIndex">
        <OutletHeading2 text="Rekomendasi Untuk Anda" />
        {
          (!this.state.is_finish_mounted) ? <LoadingScreen /> : null
        }
        <VideoCardList videos={this.state.videos} />
      </div>
    );
  }
}

export default HomeIndexClass;
