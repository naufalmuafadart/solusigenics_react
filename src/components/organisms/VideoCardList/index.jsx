import React from 'react';
import VideoCard from '../../molecules/VideoCard';

export default function VideoCardList(props) {
  const { videos } = props;
  return (
    <>
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
    </>
  );
}
