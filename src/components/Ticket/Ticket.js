import React from 'react';

import logo from '../../images/S7_logo.png';

import classes from './Ticket.module.scss';

function Ticket() {
  return (
    <div className={classes.Ticket}>
      <div className={classes.Ticket__header}>
        <p className={classes.Ticket__price}>13 400 Р</p>
        <img alt="logo" src={logo} />
      </div>
      <div className={classes.Ticket__info}>
        <table>
          <thead>
            <tr>
              <th>MOW - HKT</th>
              <th>В ПУТИ</th>
              <th>2 ПЕРЕСАДКИ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10:45 - 08:00</td>
              <td>21ч 15м</td>
              <td>HKG, JNB</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>MOW - HKT</th>
              <th>В ПУТИ</th>
              <th>2 ПЕРЕСАДКИ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>11:20 - 00:50</td>
              <td>13ч 30м</td>
              <td>HKG</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ticket;
