import React from 'react';
import { useOutletContext } from 'react-router-dom';

import HomeIndexClass from '../../components/pages/HomeIndex';

export function HomeIndex() {
  const { onAsideButtonClicked, onOutletChange } = useOutletContext();
  return (
    <HomeIndexClass
      onAsideButtonClicked={onAsideButtonClicked}
      onOutletChange={onOutletChange}
      />
  );
}
