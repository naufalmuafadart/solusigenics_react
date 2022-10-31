import VideoCard2 from '../../molecules/VideoCard2';
import React, { useEffect, useState } from 'react';

const VideoCardList2 = ( props ) => {
	const {
		onDeleteVideo,
    data_from_flask,
	} = props;

	return (
		<>
      {
        data_from_flask.map(
          (video) => (
            <VideoCard2
              key={video.id}
              id={video.id}
              source={video.source}
              title={video.title}
              thumbnail={video.thumbnail}
              onDeleteVideo={onDeleteVideo}
              />
          )
        )
      }
		</>
	);
};

export default VideoCardList2;
