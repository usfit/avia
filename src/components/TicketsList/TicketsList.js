import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Spin, Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import Ticket from '../Ticket';

import classes from './TicketsList.module.scss';

function TicketsList({ tickets, renderTicketsCount, isFetching, setTicketsView }) {
  setTicketsView();
  const ticketsView = tickets.slice(0, renderTicketsCount);
  const components = ticketsView.map((ticket) => {
    return <Ticket key={uuidv4()} ticket={ticket} />;
  });
  const loader = isFetching ? <Progress percent={tickets.length / 100} showInfo={false} /> : null;
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
  const tickets = state.ticketsView;
  const renderTicketsCount = state.renderTickets;
  const isFetching = state.getTickets.isFetching;
  if (tickets) {
    return { tickets, renderTicketsCount, isFetching };
  }
  return { tickets: [], isFetching };
};

const mapDispatchToProps = (dispatch) => {
  const { setTicketsView } = bindActionCreators(actions, dispatch);
  return { setTicketsView };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
