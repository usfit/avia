import React from 'react';

import AsideFilter from '../AsideFilter';
import Content from '../Content';

import classes from './MainContainer.module.scss';

function MainContainer() {
  return (
    <div className={classes.MainContainer}>
      <AsideFilter />
      <Content />
    </div>
  );
}

export default MainContainer;
