import React, { useEffect } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

import outletInit from '../../js/components/pages/outlet';
import HistoryAndFavoriteClass from '../../components/organisms/HistoryAndFavorite';

import "../../css/component/organisms/history_and_favorite.css";

export function HistoryLoader() {
  let heading = 'History Tontonan';
  return { heading };
}

export function FavoriteLoader() {
  let heading = 'Video Favorit';
  return { heading };
}

export function HistoryAndFavorite() {
  useEffect(() => {
    outletInit('HnFContainer');
  });
  const { onAsideButtonClicked, onOutletChange } = useOutletContext();
  const { heading } = useLoaderData();
  return (
    <div id="HnFContainer">
      <HistoryAndFavoriteClass
        heading={heading}
        onAsideButtonClicked={onAsideButtonClicked}
        onOutletChange={onOutletChange}
        />
    </div>
  );
}
