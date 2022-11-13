import React from 'react';

import TicketsList from '../TicketsList';
import TicketFiltres from '../TicketFiltres/TicketFiltres';
// import AsideFilter from '../AsideFilter';

import classes from './Content.module.scss';

function Content() {
  return (
    <div className={classes.Content}>
      {/* <AsideFilter /> */}
      <TicketFiltres />
      <TicketsList />
      <button className={classes.Content__readMore} type="button">
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </div>
  );
}

export default Content;
