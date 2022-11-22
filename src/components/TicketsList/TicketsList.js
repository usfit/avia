import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Ticket from '../Ticket';

import classes from './TicketsList.module.scss';

function TicketsList({ tickets, renderTicketsCount }) {
  const ticketsView = tickets.slice(0, renderTicketsCount);
  const components = ticketsView.map((ticket) => {
    return <Ticket key={uuidv4()} ticket={ticket} />;
  });
  return <div className={classes.TicketsList}>{components} </div>;
}

const mapStateToProps = (state) => {
  const tickets = state.getTickets.ticketsList.tickets;
  const renderTicketsCount = state.renderTickets;
  if (tickets) {
    return { tickets, renderTicketsCount };
  }
  return { tickets: [] };
};

export default connect(mapStateToProps)(TicketsList);
