import React from 'react';

import logo from '../../images/S7_logo.png';

import classes from './Ticket.module.scss';

const messageStopCount = (stopsCount) => {
  switch (stopsCount) {
    case 0:
      return 'БЕЗ ПЕРЕСАДОК';
    case 1:
      return `${stopsCount} ПЕРЕСАДКА`;
    default:
      return `${stopsCount} ПЕРЕСАДКИ`;
  }
};

const messageStops = (stops) => {
  const length = stops.length;
  let message = '';
  stops.forEach((stop, ind) => {
    message = ind + 1 === length ? (message += stop) : (message += `${stop}, `);
  });
  return message;
};

function Ticket({ ticket }) {
  console.log(ticket);
  const { price, carrier } = ticket;
  const priceTicket = `${Math.trunc(price / 1000)} ${price % 1000} Р`;
  const segmentOne = ticket.segments[0];
  const segmentsOneMessageStopsCount = messageStopCount(segmentOne.stops.length);
  const segmentOneMessageStops = messageStops(segmentOne.stops);
  const segmentOneDuration = `${Math.trunc(segmentOne.duration / 60)}ч ${segmentOne.duration % 60}м`;
  const segmentOneDate = new Date(segmentOne.date);
  console.log(segmentOneDate);

  const segmentTwo = ticket.segments[1];
  const segmentsTwoMessageStopsCount = messageStopCount(segmentTwo.stops.length);
  const segmentTwoMessageStops = messageStops(segmentTwo.stops);
  const segmentTwoDuration = `${Math.trunc(segmentTwo.duration / 60)}ч ${segmentTwo.duration % 60}м`;
  return (
    <div className={classes.Ticket}>
      <div className={classes.Ticket__header}>
        <p className={classes.Ticket__price}>{priceTicket}</p>
        {/* <img alt="logo" src={logo} /> */}
        <p>{carrier}</p>
      </div>
      <div className={classes.Ticket__info}>
        <table>
          <thead>
            <tr>
              <th>{`${segmentOne.origin} - ${segmentOne.destination}`}</th>
              <th>В ПУТИ</th>
              <th>{segmentsOneMessageStopsCount}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10:45 - 08:00</td>
              <td>{segmentOneDuration}</td>
              <td>{segmentOneMessageStops}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>{`${segmentTwo.origin} - ${segmentTwo.destination}`}</th>
              <th>В ПУТИ</th>
              <th>{segmentsTwoMessageStopsCount}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>11:20 - 00:50</td>
              <td>{segmentTwoDuration}</td>
              <td>{segmentTwoMessageStops}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ticket;
