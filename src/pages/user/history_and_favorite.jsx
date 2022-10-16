import React from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

import HistoryAndFavoriteClass from '../../components/pages/HistoryAndFavorite';

export function HistoryLoader() {
  let heading = 'History Tontonan';
  return { heading };
}

export function FavoriteLoader() {
  let heading = 'Video Favorit';
  return { heading };
}

export function HistoryAndFavorite() {
  const { onAsideButtonClicked, onOutletChange } = useOutletContext();
  const { heading } = useLoaderData();
  return (
    <HistoryAndFavoriteClass
      heading={heading}
      onAsideButtonClicked={onAsideButtonClicked}
      onOutletChange={onOutletChange}
      />
  );
}
