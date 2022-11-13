import React from 'react';

import classes from './TicketFiltres.module.scss';

function TicketFiltres() {
  return (
    <div className={classes.TicketFilters}>
      <button className={classes.focused} type="button">
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button type="button"> САМЫЙ БЫСТРЫЙ </button>
      <button type="button"> ОПТИМАЛЬНЫЙ </button>
    </div>
  );
}

export default TicketFiltres;
