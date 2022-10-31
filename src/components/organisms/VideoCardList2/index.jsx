import VideoCard2 from '../../molecules/VideoCard2';
import React, { useEffect, useState } from 'react';
import {
	fetchRequestToHapiWithAuth,
	fetchRequestToHapi,
	fetchRequestToFlask
} from '../../../js/common';

const VideoCardList2 = ( props ) => {
	const {
		url,
		date,
		onDeleteVideo,
		setDataFromHapi,
		setDataFromFlask,
		setIsOnLaodVideo,
    setStateHeading,
    is_first_time_load_video,
    data_from_flask,
    props_heading,
    state_heading,
	} = props;
	const [videos, setVideos] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setIsOnLaodVideo(true);
      setStateHeading();
      if (is_first_time_load_video || props_heading != state_heading) {
        let result = await fetchRequestToHapiWithAuth(url, 'GET', null);

        const videos = result.data;

        const arr_video_id = videos.map((video) => video.video_id);
        setVideos(arr_video_id);
        
        if (arr_video_id.length != 0) {
          let raw = {
            "video_ids": arr_video_id.map((video) => ({ id: video })),
          };

          result = await fetchRequestToHapi('/videos/get', 'POST', raw);
          let data_from_hapi = result['data'];
          
          raw = data_from_hapi.map(
            (video) => ({
              id: video.actual_id,
              source: video.source,
            })
          );
          
          let data = await fetchRequestToFlask('/get_videos_detail', 'POST', raw);
          data = JSON.parse(data);
          data = data.videos;
          setDataFromHapi(data_from_hapi);
          setDataFromFlask(data);
          setVideos(data);
        }
        else {
          setVideos([]);
        }
      }
      else {
        setVideos(data_from_flask);
      }
			setIsOnLaodVideo(false);
    };

    fetchData();
	}, [
    url,
    date,
    is_first_time_load_video,
    data_from_flask,
    props_heading,
    state_heading,
  ]);

	return (
		<>
			{
				Array.isArray(videos) && videos.length > 0 ?
					videos[0].disease !== null ? 
						videos.map(
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
					:
						null
				:
					null
			}
		</>
	);
};

export default VideoCardList2;
