import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TicketsList from '../TicketsList';
import TicketFiltres from '../TicketFiltres/TicketFiltres';
import * as actions from '../../redux/actions';

import classes from './Content.module.scss';

function Content({ ticketsView, renderTickets }) {
  const buttonTicketsMore =
    ticketsView.length !== 0 ? (
      <button className={classes.Content__readMore} type="button" onClick={renderTickets}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    ) : null;
  return (
    <div className={classes.Content}>
      <TicketFiltres />
      <TicketsList />
      {buttonTicketsMore}
    </div>
  );
}

const mapStateToProps = (state) => {
  const ticketsView = state.ticketsView;
  return { ticketsView };
};

const mapDispatchToProps = (dispatch) => {
  const { RENDER_TICKETS } = bindActionCreators(actions, dispatch);
  return {
    renderTickets: RENDER_TICKETS,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
