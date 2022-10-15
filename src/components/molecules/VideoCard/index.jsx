import React from "react";
import { Link } from 'react-router-dom';

import "../../../css/component/molecules/VideoCard.css";

export default function VideoCard(props) {
  const { title, thumbnail } = props;
  return (
    <Link to="/watch" className="video" style={{ textDecoration: "none" }}>
      <figure>
        <img src={thumbnail} />
        <figcaption>{ title }</figcaption>
      </figure>
    </Link>
  );
}
