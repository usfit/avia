import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  messageStopCount,
  messageStops,
  getTicketDate,
  calcPrice,
  calcDuration,
  getDirection,
} from '../../utils/utils';

import classes from './Ticket.module.scss';

function Ticket({ ticket }) {
  const { price, carrier } = ticket;
  const priceTicket = calcPrice(price);

  const segments = ticket.segments.map((segment) => {
    return (
      <div key={uuidv4()}>
        <ul className={classes.Ticket__bodyHeaders}>
          <li>{getDirection(segment)}</li>
          <li>В ПУТИ</li>
          <li>{messageStopCount(segment.stops.length)}</li>
        </ul>
        <ul className={classes.Ticket__bodyInfo}>
          <li>{getTicketDate(segment.date, segment.duration)}</li>
          <li>{calcDuration(segment.duration)}</li>
          <li>{messageStops(segment.stops)}</li>
        </ul>
      </div>
    );
  });

  return (
    <div className={classes.Ticket}>
      <div className={classes.Ticket__header}>
        <p className={classes.Ticket__price}>{priceTicket}</p>
        <img alt="logo" src={`https://pics.avs.io/99/36/${carrier}.png`} />
      </div>
      <div className={classes.Ticket__body}>{segments}</div>
    </div>
  );
}

export default Ticket;
