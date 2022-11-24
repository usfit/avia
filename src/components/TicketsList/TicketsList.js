/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Spin, Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Ticket from '../Ticket';
import ErrorMessage from '../ErrorMessage';

import classes from './TicketsList.module.scss';

function TicketsList({ tickets, ticketsList, renderTicketsCount, isFetching, errors }) {
  const error = errors.isError;
  const errorNetwork = errors.errorNetwork;
  const ticketsView = tickets.slice(0, renderTicketsCount);
  const notFountMessage =
    ticketsView.length === 0 && !error ? <h1>Рейсов, подходящих под заданные фильтры, не найдено</h1> : null;
  const components =
    ticketsView.length !== 0
      ? ticketsView.map((ticket) => {
          return <Ticket key={uuidv4()} ticket={ticket} />;
        })
      : notFountMessage;
  const errorMessage = error ? <ErrorMessage errorNetwork={errorNetwork} /> : null;
  const loader = isFetching ? <Progress percent={ticketsList.length / 100} showInfo={false} /> : null;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const spinner = ticketsList.length === 0 && !error ? <Spin indicator={antIcon} /> : null;
  return (
    <>
      {errorMessage}
      {loader}
      {spinner}
      <div className={classes.TicketsList}>{components} </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const errors = state.onError;
  const tickets = state.ticketsView;
  const ticketsList = state.getTickets.ticketsList;
  const renderTicketsCount = state.renderTickets;
  const isFetching = state.getTickets.isFetching;
  if (ticketsList) {
    return { tickets, ticketsList, renderTicketsCount, isFetching, errors };
  }
  return { tickets: [], ticketsList: [], isFetching };
};

export default connect(mapStateToProps)(TicketsList);
