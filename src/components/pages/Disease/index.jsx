import React, { Component } from "react";
import { Form } from 'react-router-dom';

import { fetchRequestToFlask } from '../../../js/common'

import OutletHeading2 from "../../atoms/OutletHeading2";
import VideoCardList from "../../organisms/VideoCardList";
import LoadingScreen from "../../molecules/LoadingScreen";
import PropsChangeDetector from "../../atoms/PropsChangeDetector";

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
      on_load_video: false,
    };

    this.getDiseaseVideos = this.getDiseaseVideos.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onDiseaseChange = this.onDiseaseChange.bind(this);
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
  }

  async onDiseaseChange() {
    this.setState({ videos: [] });
    const videos = await this.getDiseaseVideos(this.props.disease);
    this.setState({
      videos,
      currentDisease: this.props.disease,
    });
  }

  async getDiseaseVideos(disease) {
    this.setState({ on_load_video: true });
    let response = await fetchRequestToFlask(
      `/get_video_by_disease/${disease}`,
      'GET',
      null
    );
    this.setState({
      on_load_video: false,
    });
    return response["data"];
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
          (!this.state.finish_mounting || this.state.on_searching || this.state.on_load_video) ?
            <LoadingScreen />
          :
            null
        }
        <VideoCardList videos={this.state.videos} />
        <PropsChangeDetector
          props_item={this.props.disease}
          state_item={this.state.currentDisease}
          onPropsChange={this.onDiseaseChange}
          />
      </div>
    );
  }
}
