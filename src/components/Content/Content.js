import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TicketsList from '../TicketsList';
import TicketFiltres from '../TicketFiltres/TicketFiltres';
import * as actions from '../../actions';

import classes from './Content.module.scss';

function Content({ renderTickets }) {
  return (
    <div className={classes.Content}>
      <TicketFiltres />
      <TicketsList />
      <button className={classes.Content__readMore} type="button" onClick={renderTickets}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  const { RENDER_TICKETS } = bindActionCreators(actions, dispatch);
  return {
    renderTickets: RENDER_TICKETS,
  };
};

export default connect(null, mapDispatchToProps)(Content);
