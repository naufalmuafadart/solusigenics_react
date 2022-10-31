import React from "react";
import { Link } from 'react-router-dom';

import "../../../css/component/molecules/VideoCard.css";

export default function VideoCard(props) {
  const { id, title, thumbnail, source } = props;
  return (
    <div className="video_card">
      <Link
        to={`/tonton?id=${id}&source=${source}`}
        className="video"
        style={{ textDecoration: "none" }}
        >
        <figure>
          <img src={thumbnail} />
          <figcaption>{ title }</figcaption>
        </figure>
      </Link>
    </div>
  );
}
