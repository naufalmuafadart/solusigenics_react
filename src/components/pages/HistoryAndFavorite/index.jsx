import React, { Component } from 'react';

import OutletHeading1 from '../../atoms/OutletHeading1';
import VideoCard2 from '../../molecules/VideoCard2';
import LoadingScreen from '../../molecules/LoadingScreen';
import { hide as hideNavbar } from '../../../js/components/organisms/navbar';

import outletInit from "../../../js/components/pages/outlet";
import { checkIsLoggedIn } from '../../../js/common';

import '../../../css/component/pages/history_and_favorite.css';

class HistoryAndFavoriteClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_from_flask: [],
      data_from_hapi: [],
    };
  }

  async componentDidMount() {
    outletInit('HnFContainer', this.props.heading);
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();

    const accessToken = localStorage.getItem('accessToken');

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const url = this.props.heading.includes('Hist') ? `${import.meta.env.VITE_HAPI_HOST}/histories` : '';
    let response = await fetch(url, requestOptions);
    let data = await response.text();
    data = JSON.parse(data);
    data = data["data"];
    const arr_video_id = data.map((video) => video.video_id);

    let raw = JSON.stringify({
      "video_ids": arr_video_id.map((video) => ({ id: video })),
    });
    
    myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    response = await fetch(`${import.meta.env.VITE_HAPI_HOST}/videos/get`, requestOptions);
    let data_from_hapi = await response.text();
    data_from_hapi = JSON.parse(data_from_hapi);
    data_from_hapi = data_from_hapi["data"];
    console.log({ data_from_hapi });

    raw = JSON.stringify(data_from_hapi.map(
      (video) => ({
        id: video.actual_id,
        source: video.source,
      }),
    ));

    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    response = await fetch(`${import.meta.env.VITE_FLASK_HOST}/get_videos_detail`, requestOptions);
    let data_from_flask = await response.text();
    data_from_flask = JSON.parse(data_from_flask);
    console.log({ data_from_flask });

    this.setState({
      data_from_flask: data_from_flask["videos"],
      data_from_hapi: data_from_hapi,
    });
  }

  componentDidUpdate() {
    outletInit('HnFContainer', this.props.heading);
    hideNavbar(document);
    checkIsLoggedIn();
  }

  render() {
    return (
      <div id="HnFContainer">
        <OutletHeading1 text={this.props.heading} />
        {
          this.state.data_from_flask.length > 0 ? null : <LoadingScreen />
        }
        {
          this.state.data_from_flask.map(
            (video) => (
              <VideoCard2
                key={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                />
            )
          )
        }
      </div>
    )
  }
}

export default HistoryAndFavoriteClass;
