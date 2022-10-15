import React from 'react';
import { useOutletContext, useLoaderData } from 'react-router-dom';

import HomeIndexClass from '../../components/organisms/HomeIndex';

import '../../css/pages/user/home_index.css';

export async function loader() {
  let response = await fetch('http://127.0.0.1:5000/get_video_by_disease?query='+'Tipes');
  if (response.status === 200) {
    let data = await response.text();
    data = JSON.parse(data);
    return data;
  }
  return { videos: [] };
}

export function HomeIndex() {
  const { onAsideButtonClicked, onOutletChange } = useOutletContext();
  const { videos } = useLoaderData();
  return (
    <HomeIndexClass
      onAsideButtonClicked={onAsideButtonClicked}
      onOutletChange={onOutletChange}
      data={videos}
      />
  );
}
