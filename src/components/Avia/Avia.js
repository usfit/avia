import React from 'react';

import MainContainer from '../MainContainer';
import logo from '../../images/logo.svg';

import classes from './Avia.module.scss';

function Avia() {
  return (
    <div className={classes.Avia}>
      <img alt="logo" src={logo} className={classes.logo} />
      <MainContainer />
    </div>
  );
}

export default Avia;
