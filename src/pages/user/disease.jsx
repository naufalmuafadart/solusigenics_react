import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';

import OutletHeading2 from '../../components/atoms/OutletHeading2';
import VideoCardList from '../../components/organisms/VideoCardList';
import LoadingScreen from '../../components/molecules/LoadingScreen';
import '../../css/pages/user/disease.css';

export async function loader() {
  let response = await fetch('http://127.0.0.1:5000/get_video_by_disease?query='+'Tipes');
  if (response.status === 200) {
    let data = await response.text();
    data = JSON.parse(data);
    return data;
  }
  return { videos: [] };
}

export const Disease = () => {
  const { videos } = useLoaderData();
  return (
    <div id="diseaseOutlet">
      <Form id="searchVideo">
        <input type="text" placeholder="Cari video disini" />
        <input type="submit" value="Cari" />
      </Form>
      <OutletHeading2 text="Rekomendasi Untuk Anda" />
      {/* <LoadingScreen /> */}
      <VideoCardList videos={videos} />
    </div>
  );
}
