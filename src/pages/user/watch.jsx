import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import outletInit from '../../js/components/pages/outlet';

import WatchClass from '../../components/organisms/Watch';
import '../../css/pages/user/watch.css';

const Watch = () => {
  useEffect(() => {
    outletInit('watch');
  });

  const { onOutletChange } = useOutletContext();
  return (
    <WatchClass onOutletChange={onOutletChange} />
  );
}

export default Watch;
