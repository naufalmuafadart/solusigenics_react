import React, { Component } from "react";
import { Form } from 'react-router-dom';

import { fetchRequestToFlask } from '../../../js/common'

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
      keyword: '',
      on_searching: false,
      finish_mounting: false,
    };

    this.getDiseaseVideos = this.getDiseaseVideos.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  async componentDidMount() {
    outletInit('diseaseOutlet', `Penyakit ${this.props.disease}`);
    this.props.onAsideButtonClicked(this.props.order);
    this.props.onOutletChange();
    const videos = await this.getDiseaseVideos(this.props.disease);
    this.setState({
      videos,
      finish_mounting: true,
    });
  }

  async componentDidUpdate() {
    outletInit('diseaseOutlet', `Penyakit ${this.props.disease}`);
    if (this.state.currentDisease !== this.props.disease) {
      const videos = await this.getDiseaseVideos(this.props.disease);
      this.setState({ videos, currentDisease: this.props.disease });
    }
  }

  async getDiseaseVideos(disease) {
    let response = await fetch(`${import.meta.env.VITE_FLASK_HOST}/get_video_by_disease/${disease}`);
    if (response.status === 200) {
      let data = await response.text();
      data = JSON.parse(data);
      return data["data"];
    }
    else {
      return [];
    }
  }

  async onInputChange(e) {
    this.setState({ keyword: e.target.value });
  }

  async onSubmit() {
    this.setState({
      videos: [],
      on_searching: true,
    });
    if (this.state.keyword != '') {
      const response = await fetchRequestToFlask(
        `/search/${this.state.currentDisease}/${this.state.keyword}`,
        'GET',
        null
      );
      const data = JSON.parse(response);
      this.setState({
        videos: data['videos'],
      });
    }
    else {
      const videos = await this.getDiseaseVideos(this.props.disease);
      this.setState({ videos });
    }
    this.setState({
      on_searching: false,
    });
  }

  render() {
    return (
      <div id="diseaseOutlet">
        <Form id="searchVideo" onSubmit={() => this.onSubmit()}>
          <input type="text" placeholder="Cari video disini" onChange={this.onInputChange} />
          <input type="submit" value="Cari" />
        </Form>
        <OutletHeading2 text={`Video penyakit ${this.props.disease}`} />
        {
          (!this.state.finish_mounting || this.state.on_searching) ?
            <LoadingScreen />
          :
            null
        }
        <VideoCardList videos={this.state.videos} />
      </div>
    );
  }
}
