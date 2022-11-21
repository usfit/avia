/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import classes from './AsideFilter.module.scss';

const changeCheckBox = (e, getCurrentCheckbox) => {
  const val = e.target.id;
  getCurrentCheckbox(val);
};

function AsideFilter({ checked, getCurrentCheckbox }) {
  return (
    <aside className={classes.AsideFilter}>
      <fieldset>
        <legend>Количество пересадок</legend>

        <div className={classes.AsideFilter__item}>
          <input
            type="checkbox"
            className={classes.AsideFilter__checkbox}
            id="all"
            name="all"
            checked={checked.all}
            onChange={(e) => changeCheckBox(e, getCurrentCheckbox)}
          />
          <label htmlFor="all">Все</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input
            type="checkbox"
            className={classes.AsideFilter__checkbox}
            id="noneTransplants"
            name="noneTransplants"
            checked={checked.noneTransplants}
            onChange={(e) => changeCheckBox(e, getCurrentCheckbox)}
          />
          <label htmlFor="noneTransplants">Без пересадок</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input
            type="checkbox"
            className={classes.AsideFilter__checkbox}
            id="oneTransplants"
            name="oneTransplants"
            checked={checked.oneTransplants}
            onChange={(e) => changeCheckBox(e, getCurrentCheckbox)}
          />
          <label htmlFor="oneTransplants">1 пересадка</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input
            type="checkbox"
            className={classes.AsideFilter__checkbox}
            id="twoTransplants"
            name="twoTransplants"
            checked={checked.twoTransplants}
            onChange={(e) => changeCheckBox(e, getCurrentCheckbox)}
          />
          <label htmlFor="twoTransplants">2 пересадки</label>
        </div>
        <div className={classes.AsideFilter__item}>
          <input
            type="checkbox"
            className={classes.AsideFilter__checkbox}
            id="threeTransplants"
            name="threeTransplants"
            checked={checked.threeTransplants}
            onChange={(e) => changeCheckBox(e, getCurrentCheckbox)}
          />
          <label htmlFor="threeTransplants">3 пересадки</label>
        </div>
      </fieldset>
    </aside>
  );
}

const mapStateToProps = (state) => {
  return state.reducerSetCheckbox;
};

const mapDispatchToProps = (dispatch) => {
  const { GET_CURRENT_CHECLBOX } = bindActionCreators(actions, dispatch);
  return {
    getCurrentCheckbox: GET_CURRENT_CHECLBOX,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsideFilter);
