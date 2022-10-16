import React, { useEffect } from 'react';
import { useOutletContext, useLoaderData } from 'react-router-dom';

import outletIinit from '../../js/components/pages/outlet';
import HomeIndexClass from '../../components/organisms/HomeIndex';

import '../../css/pages/user/home_index.css';

export function HomeIndex() {
  const { onAsideButtonClicked, onOutletChange } = useOutletContext();
  useEffect(() => {
    outletIinit('HomeIndex');
  });
  return (
    <HomeIndexClass
      onAsideButtonClicked={onAsideButtonClicked}
      onOutletChange={onOutletChange}
      />
  );
}
