import React from 'react';
import { connect } from 'react-redux';

import { CHOOSE_CHEAPER, CHOOSE_FASTER, CHOOSE_OPTIMAL } from '../../actions';

import classes from './TicketFiltres.module.scss';

function TicketFiltres({ filter, cheaper, faster, optimal }) {
  return (
    <div className={classes.TicketFilters}>
      <button className={filter === 'cheaper' ? classes.focused : ''} type="button" onClick={cheaper}>
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button className={filter === 'faster' ? classes.focused : ''} type="button" onClick={faster}>
        САМЫЙ БЫСТРЫЙ
      </button>
      <button className={filter === 'optimal' ? classes.focused : ''} type="button" onClick={optimal}>
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { filter: state.filter };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cheaper: () => dispatch(CHOOSE_CHEAPER()),
    faster: () => dispatch(CHOOSE_FASTER()),
    optimal: () => dispatch(CHOOSE_OPTIMAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketFiltres);
