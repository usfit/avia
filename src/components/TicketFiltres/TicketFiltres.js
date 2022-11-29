import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filtersButtons } from '../../redux/constants';
import * as actions from '../../redux/actions';

import classes from './TicketFiltres.module.scss';

const changeFilter = (e, onButtonFilter) => {
  const val = e.target.id;
  onButtonFilter(val);
};

function TicketFiltres({ filter, onButtonFilter }) {
  const { filtersLabels, filtersDesc } = filtersButtons;
  const buttons = filtersLabels.map((item, index) => {
    return (
      <button
        key={`buttonFiltersKey__${item}`}
        id={item}
        className={filter === item ? classes.focused : ''}
        type="button"
        onClick={(e) => changeFilter(e, onButtonFilter)}
      >
        {filtersDesc[index]}
      </button>
    );
  });
  return <div className={classes.TicketFilters}>{buttons}</div>;
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
