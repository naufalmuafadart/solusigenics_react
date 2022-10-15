import React, { Component } from 'react'

export default class WatchClass extends Component {
  componentDidMount() {
    this.props.onOutletChange();
  }

  render() {
    return (
      <div id="watch">
        <iframe
          src="https://www.youtube.com/embed/-xTIRoONRa8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
        <section id="titleSection">
          <p>Webinar Seri COVID-19 Waspada Omicron, Kenali dan Kendalikan Penyakit Penyerta KOMORBID</p>
          <img src="/images/icon/heart_white.png" alt="" />
        </section>
      </div>
    )
  }
}
