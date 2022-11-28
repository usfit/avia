import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions';

import classes from './TicketFiltres.module.scss';

const changeFilter = (e, onButtonFilter) => {
  const val = e.target.id;
  onButtonFilter(val);
};

function TicketFiltres({ filter, onButtonFilter }) {
  return (
    <div className={classes.TicketFilters}>
      <button
        id="cheaper"
        className={filter === 'cheaper' ? classes.focused : ''}
        type="button"
        onClick={(e) => changeFilter(e, onButtonFilter)}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        id="faster"
        className={filter === 'faster' ? classes.focused : ''}
        type="button"
        onClick={(e) => changeFilter(e, onButtonFilter)}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        id="optimal"
        className={filter === 'optimal' ? classes.focused : ''}
        type="button"
        onClick={(e) => changeFilter(e, onButtonFilter)}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.setFilters;
};

const mapDispatchToProps = (dispatch) => {
  const { onButtonFilter } = bindActionCreators(actions, dispatch);
  return {
    onButtonFilter,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketFiltres);
