import React from 'react';

import TicketsList from '../TicketsList';
import TicketFiltres from '../TicketFiltres/TicketFiltres';

import classes from './Content.module.scss';

function Content() {
  return (
    <div className={classes.Content}>
      <TicketFiltres />
      <TicketsList />
      <button className={classes.Content__readMore} type="button">
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </div>
  );
}

export default Content;
