import React, { Component } from 'react';
import OutletHeading2 from '../../atoms/OutletHeading2';
import VideoCard from '../../molecules/VideoCard';
import LoadingScreen from '../../molecules/LoadingScreen';

class HomeIndexClass extends Component {
  componentDidMount() {
    this.props.onAsideButtonClicked(0);
    this.props.onOutletChange();
  }

  render() {
    return (
      <div id="HomeIndex">
        <OutletHeading2 text="Rekomendasi Untuk Anda" />
        <LoadingScreen />
        {
          this.props.data.map(
            (video) => (
              <VideoCard 
                key={video.id} 
                title={video.title} 
                thumbnail={video.thumbnail}
                />
            )
          )
        }
      </div>
    );
  }
}

export default HomeIndexClass;
