import React, { Component } from 'react';

import { 
  setTitle,
  fetchRequestToHapiWithAuth,
  fetchRequestToHapi,
  fetchRequestToFlask
} from '../../../js/common';

import outletInit from '../../../js/components/pages/outlet';
import '../../../css/component/pages/watch.css';

export default class WatchClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      video_title: '',
      video_url: '',
      video_id: 0,
      video_actual_id: '',
      video_source: '',
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

    let body = {
      actual_id : videoId,
      source,
    };

    this.setState({ video_source: source });

    await fetchRequestToHapiWithAuth('/histories', 'POST', body);
  
    body = [{
      id : videoId,
      source,
    }];

    let request = await fetchRequestToFlask('/get_videos_detail', 'POST', body);
    let data = request['data'][0];

    this.setState({
      video_title: data.title,
      video_actual_id: videoId,
      video_url: data.play_url
    });

    request = await fetchRequestToHapi(`/videos/get/${videoId}/${this.state.video_source}`, 'GET', null);
    data = request;

    setTitle(document, this.state.video_title);

    this.setState({
      video_id: data.data.id
    });

    request = await fetchRequestToHapiWithAuth(`/favorites/${this.state.video_id}`, 'GET', null);
    data = request;
    data = data.data;
    
    this.setState({ isLiked: data });
  }

  async onIcHeartClicked() {
    if (this.state.isLiked) {
      await fetchRequestToHapiWithAuth(`/favorites/${this.state.video_id}`, 'DELETE', null);
    }
    else {
      const body = { video_id: this.state.video_id };
      await fetchRequestToHapiWithAuth('/favorites', 'POST', body);
    }

    const isLiked = await fetchRequestToHapiWithAuth(`/favorites/${this.state.video_id}`, 'GET');

    this.setState({ isLiked: isLiked.data });
  }

  render() {
    return (
      <div id="watch">
        <iframe
          src={this.state.video_url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
        <section id="titleSection">
          <p>{ this.state.video_title }</p>
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
