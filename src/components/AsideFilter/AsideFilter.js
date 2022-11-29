/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../redux/actions';

import classes from './AsideFilter.module.scss';

const changeCheckBox = (e, getCurrentCheckbox) => {
  const val = e.target.id;
  getCurrentCheckbox(val);
};

function AsideFilter({ checked, checkboxTitles, getCurrentCheckbox }) {
  const checkKeys = Object.keys(checked);
  const checkBoxes = checkKeys.map((key, index) => {
    return (
      <div className={classes.AsideFilter__item} key={`checkBox_${key}`}>
        <input
          type="checkbox"
          className={classes.AsideFilter__checkbox}
          id={key}
          name={key}
          checked={checked[key]}
          onChange={(e) => changeCheckBox(e, getCurrentCheckbox)}
        />
        <label htmlFor={key}>{checkboxTitles[index]}</label>
      </div>
    );
  });
  return (
    <aside className={classes.AsideFilter}>
      <fieldset>
        <legend>Количество пересадок</legend>
        {checkBoxes}
      </fieldset>
    </aside>
  );
}

const mapStateToProps = (state) => {
  return state.setFilters;
};

const mapDispatchToProps = (dispatch) => {
  const { onButtonFilter } = bindActionCreators(actions, dispatch);
  return {
    getCurrentCheckbox: onButtonFilter,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsideFilter);
