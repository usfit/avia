import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Ticket from '../Ticket';

import classes from './TicketsList.module.scss';

function TicketsList({ tickets }) {
  const ticketsView = tickets.splice(0, 5);
  const components = ticketsView.map((ticket) => {
    return <Ticket key={uuidv4()} ticket={ticket} />;
  });
  // const components = [
  //   <Ticket key={uuidv4()} />,
  //   <Ticket key={uuidv4()} />,
  //   <Ticket key={uuidv4()} />,
  //   <Ticket key={uuidv4()} />,
  //   <Ticket key={uuidv4()} />,
  // ];
  return <div className={classes.TicketsList}>{components} </div>;
}

const mapStateToProps = (state) => {
  const tickets = state.getTickets.ticketsList.tickets;
  if (tickets) {
    return { tickets };
  }
  return { tickets: [] };
};

export default connect(mapStateToProps)(TicketsList);
