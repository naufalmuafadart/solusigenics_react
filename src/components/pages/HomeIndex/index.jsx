import React, { Component } from 'react';
import OutletHeading2 from '../../atoms/OutletHeading2';
import LoadingScreen from '../../molecules/LoadingScreen';
import VideoCardList from "../../organisms/VideoCardList";

import outletInit from '../../../js/components/pages/outlet';
import '../../../css/component/pages/home_index.css';

class HomeIndexClass extends Component {
  constructor(props) {
    super(props);
    this.getVideoRecommendation = this.getVideoRecommendation.bind(this);

    this.state = {
      videos: [],
    };
  }

  async getVideoRecommendation(disease) {
    let response = await fetch(`${import.meta.env.VITE_FLASK_HOST}/get_video_by_disease?query=${disease}`);
    if (response.status === 200) {
      let data = await response.text();
      data = JSON.parse(data);
      return data["videos"];
    }
    else {
      return [];
    }
  }

  async componentDidMount() {
    outletInit('HomeIndex', 'Beranda');
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();
    const videos = await this.getVideoRecommendation('Tipes');

    const LoadingScreen = document.getElementById('loading-screen');
    LoadingScreen.style.display = 'none';
    
    this.setState({ videos });
  }

  render() {
    return (
      <div id="HomeIndex">
        <OutletHeading2 text="Rekomendasi Untuk Anda" />
        <LoadingScreen />
        <VideoCardList videos={this.state.videos} />
      </div>
    );
  }
}

export default HomeIndexClass;
