import React from 'react';
import { useOutletContext } from 'react-router-dom';

import WatchClass from '../../components/organisms/Watch';
import '../../css/pages/user/watch.css';

const Watch = () => {
  const { onOutletChange } = useOutletContext();
  return (
    <WatchClass onOutletChange={onOutletChange} />
  );
}

export default Watch;
