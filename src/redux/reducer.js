import { combineReducers } from 'redux';

import * as constants from './constants';

let newState = {};

// Обработка ошибок

function onError(state = constants.error, action = {}) {
  switch (action.type) {
    case 'onError':
      newState = { ...action.e };
      return newState;
    default:
      return state;
  }
}

// Фильтры

function setFilters(state = constants.filters, action = {}) {
  switch (action.type) {
    case 'GET_CURRENT_FILTER':
      return { ...state, ...action.newState };
    default:
      return state;
  }
}

// Получение списка билетов

// Начинаем поиск

function getTickets(state = constants.tickets, action = {}) {
  let newTicketsList = [];
  switch (action.type) {
    case 'RECEIVE_SEARCH_ID':
      return { ...state, searchId: action.searchId };
    case 'RECEIVE_TICKETS':
      newTicketsList = [...state.ticketsList, ...action.tickets.tickets];
      return { ...state, ticketsList: newTicketsList, isFetching: !action.tickets.stop };
    default:
      return state;
  }
}

// Отображение билетов

function renderTickets(state = 5, action = {}) {
  switch (action.type) {
    case 'RENDER_TICKETS':
      return state + 5;
    default:
      return state;
  }
}

function ticketsView(state = [], action = {}) {
  if (action.ticketsView) {
    newState = action.ticketsView;
    return newState;
  }
  return state;
}

const reducer = combineReducers({
  setFilters,
  getTickets,
  renderTickets,
  ticketsView,
  onError,
});

export default reducer;
