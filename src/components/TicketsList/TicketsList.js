import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Ticket from '../Ticket';

import classes from './TicketsList.module.scss';

function TicketsList({ tickets, renderTicketsCount, isFetching }) {
  const ticketsView = tickets.slice(0, renderTicketsCount);
  const components = ticketsView.map((ticket) => {
    return <Ticket key={uuidv4()} ticket={ticket} />;
  });
  const loader = isFetching ? <p>ЗАГРУЗКА</p> : null;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const spinner = tickets.length === 0 ? <Spin indicator={antIcon} /> : null;
  return (
    <>
      {loader}
      {spinner}
      <div className={classes.TicketsList}>{components} </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const tickets = state.getTickets.ticketsList;
  const renderTicketsCount = state.renderTickets;
  const isFetching = state.getTickets.isFetching;
  if (tickets) {
    return { tickets, renderTicketsCount, isFetching };
  }
  return { tickets: [], isFetching };
};

export default connect(mapStateToProps)(TicketsList);
