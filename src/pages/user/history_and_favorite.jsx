import React from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

import HistoryAndFavoriteClass from '../../components/pages/HistoryAndFavorite';

export function HistoryLoader() {
  const heading = 'History Tontonan';
  return { heading };
}

export function FavoriteLoader() {
  const heading = 'Video Favorit';
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
