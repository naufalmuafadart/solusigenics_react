import React, { Component } from "react";
import { Form } from 'react-router-dom';

import OutletHeading2 from "../../atoms/OutletHeading2";
import VideoCardList from "../../organisms/VideoCardList";
import LoadingScreen from "../../molecules/LoadingScreen";

import outletInit from "../../../js/components/pages/outlet";

import '../../../css/component/pages/disease.css';

export default class DiseaseClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      currentDisease: this.props.disease,
    };

    this.getDiseaseVideos = this.getDiseaseVideos.bind(this);
  }

  async getDiseaseVideos(disease) {
    let response = await fetch(`http://127.0.0.1:5000/get_video_by_disease?query=${disease}`);
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
    outletInit('diseaseOutlet');
    this.props.onAsideButtonClicked(this.props.order);
    this.props.onOutletChange();
    const videos = await this.getDiseaseVideos(this.props.disease);
    if (videos.length > 0) {
      const LoadingScreen = document.getElementById('loading-screen');
      LoadingScreen.style.display = 'none';
    }
    this.setState({ videos });
  }

  async componentDidUpdate() {
    const LoadingScreen = document.getElementById('loading-screen');
    LoadingScreen.style.display = 'grid';
    if (this.state.currentDisease !== this.props.disease) {
      const videos = await this.getDiseaseVideos(this.props.disease);
      LoadingScreen.style.display = 'none';
      this.setState({ videos, currentDisease: this.props.disease });
    }
    LoadingScreen.style.display = 'none';
  }

  render() {
    return (
      <div id="diseaseOutlet">
        <Form id="searchVideo">
          <input type="text" placeholder="Cari video disini" />
          <input type="submit" value="Cari" />
        </Form>
        <OutletHeading2 text={`Video penyakit ${this.props.disease}`} />
        <LoadingScreen />
        <VideoCardList videos={this.state.videos} />
      </div>
    );
  }
}
