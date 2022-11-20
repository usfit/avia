import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';

import classes from './TicketFiltres.module.scss';

const changeFilter = (e, getCurrentFilter) => {
  const val = e.target.id;
  getCurrentFilter(val);
};

function TicketFiltres({ filter, getCurrentFilter }) {
  return (
    <div className={classes.TicketFilters}>
      <button
        id="cheaper"
        className={filter === 'cheaper' ? classes.focused : ''}
        type="button"
        onClick={(e) => changeFilter(e, getCurrentFilter)}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        id="faster"
        className={filter === 'faster' ? classes.focused : ''}
        type="button"
        onClick={(e) => changeFilter(e, getCurrentFilter)}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        id="optimal"
        className={filter === 'optimal' ? classes.focused : ''}
        type="button"
        onClick={(e) => changeFilter(e, getCurrentFilter)}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.reducerSetFilter;
};

const mapDispatchToProps = (dispatch) => {
  const { GET_CURRENT_FILTER } = bindActionCreators(actions, dispatch);
  return {
    getCurrentFilter: GET_CURRENT_FILTER,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketFiltres);
