/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import classes from './AsideFilter.module.scss';

function AsideFilter() {
  return (
    <aside className={classes.AsideFilter}>
      <fieldset>
        <legend>Количество пересадок</legend>

        <div className={classes.AsideFilter__item}>
          <input type="checkbox" className={classes.AsideFilter__checkbox} id="all" name="all" />
          <label htmlFor="all">Все</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input
            type="checkbox"
            className={classes.AsideFilter__checkbox}
            id="nonetransplants"
            name="nonetransplants"
          />
          <label htmlFor="nonetransplants">Без пересадок</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input type="checkbox" className={classes.AsideFilter__checkbox} id="oneTransplants" name="oneTransplants" />
          <label htmlFor="oneTransplants">1 пересадка</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input type="checkbox" className={classes.AsideFilter__checkbox} id="twoTransplants" name="twoTransplants" />
          <label htmlFor="twoTransplants">2 пересадки</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input
            type="checkbox"
            className={classes.AsideFilter__checkbox}
            id="threeTransplants"
            name="threeTransplants"
          />
          <label htmlFor="threeTransplants">3 пересадки</label>
        </div>
      </fieldset>
    </aside>
  );
}

export default AsideFilter;
