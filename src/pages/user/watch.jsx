import React from 'react';
import { useOutletContext } from 'react-router-dom';

import WatchClass from '../../components/pages/Watch';

const Watch = () => {
  const { onOutletChange } = useOutletContext();
  return (
    <WatchClass onOutletChange={onOutletChange} />
  );
}

export default Watch;
