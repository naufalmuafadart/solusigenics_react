import React from 'react';
import VideoCard from '../../molecules/VideoCard';

import "../../../css/component/organisms/video_card_list.css";

export default function VideoCardList(props) {
  const { videos } = props;
  return (
    <div id="videoList">
      {
        videos.map(
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
