import React from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

import HistoryClass from '../../components/pages/History';
import FavoriteClass from '../../components/pages/Favorite';

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
  if (heading == 'History Tontonan') {
    return (
      <HistoryClass
        heading={heading}
        onAsideButtonClicked={onAsideButtonClicked}
        onOutletChange={onOutletChange}
        />
    );
  }
  return (
    <FavoriteClass
      heading={heading}
      onAsideButtonClicked={onAsideButtonClicked}
      onOutletChange={onOutletChange}
      />
  );
}
