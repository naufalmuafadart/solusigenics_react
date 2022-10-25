import React, { Component } from 'react';

import { fetchRequestToHapiWithAuth, fetchRequestToFlask } from '../../../js/common';

import outletInit from '../../../js/components/pages/outlet';
import '../../../css/component/pages/watch.css';

export default class WatchClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      title: 'Title',
      url: ''
    };

    this.ic_white_url = '/images/icon/heart_white.png';
    this.ic_red_url = '/images/icon/heart_red.png';

    this.onIcHeartClicked = this.onIcHeartClicked.bind(this);
  }

  async componentDidMount() {
    outletInit('watch', 'Judul Video');
    this.props.onOutletChange();

    let url = window.location.href;
    url = new URL(url);
    const source = url.searchParams.get("source");
    const videoId = url.searchParams.get("id");
    const accessToken = localStorage.getItem('accessToken');

    let body = {
      actual_id : videoId,
      source,
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    console.log(body);
    let raw = JSON.stringify(body);
    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };

    await fetchRequestToHapiWithAuth('/histories', 'POST', body);

    url = `/get_play_url_by_id/${videoId}?source=${source}`;
    const response = await fetchRequestToFlask(url, 'GET', null);
    url = response;

    body = [{
      id : videoId,
      source,
    }];

    // headers = new Headers();
    // headers.append("Content-Type", "application/json");
    
    // raw = JSON.stringify(body);
    // requestOptions = {
    //   method: 'POST',
    //   headers: headers,
    //   body: raw,
    //   redirect: 'follow'
    // };

    let request = await fetchRequestToFlask('/get_videos_detail', 'POST', body);
    let data = JSON.parse(request);
    data = data['videos'][0];
    console.log(data);
    this.setState({
      url,
      title: data.title
    });
  }

  onIcHeartClicked() {
    this.setState(
      (prevState) => {
        return { isLiked: !prevState.isLiked }
      }
    );
  }

  render() {
    return (
      <div id="watch">
        <iframe
          src={this.state.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
        <section id="titleSection">
          <p>{ this.state.title }</p>
          <img
            src={
              this.state.isLiked ? this.ic_red_url : this.ic_white_url
            }
            onClick={ () => this.onIcHeartClicked() }
            alt="icon heart"
            />
        </section>
      </div>
    )
  }
}
