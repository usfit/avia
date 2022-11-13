import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Ticket from '../Ticket';

import classes from './TicketsList.module.scss';

function TicketsList() {
  const components = [
    <Ticket key={uuidv4()} />,
    <Ticket key={uuidv4()} />,
    <Ticket key={uuidv4()} />,
    <Ticket key={uuidv4()} />,
    <Ticket key={uuidv4()} />,
  ];
  return <div className={classes.TicketsList}>{components} </div>;
}

export default TicketsList;
