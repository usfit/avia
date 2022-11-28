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

// Фильтры сверху

function reducerSetFilter(state = constants.filter, action = {}) {
  switch (action.type) {
    case 'cheaper':
      return { filter: 'cheaper' };

    case 'faster':
      return { filter: 'faster' };

    case 'optimal':
      return { filter: 'optimal' };
    default:
      return state;
  }
}

// Фильтры снизу

const checkAll = () => {
  let count = 0;
  Object.values(newState)
    .splice(1)
    .forEach((value) => {
      count += value;
    });
  return count;
};

const setCheckbox = (state, check) => {
  newState = { ...state.checked, ...{ [check]: !state.checked[check] } };
  newState.all = !!(checkAll(newState) === 4);
  return newState;
};

function reducerSetCheckbox(state = constants.checked, action = {}) {
  switch (action.type) {
    case 'all':
      newState = { ...state.checked, ...{ all: !state.checked.all } };
      Object.keys(newState)
        .splice(1)
        .forEach((key) => {
          newState[key] = !!newState.all;
        });
      return { checked: newState };
    case 'noneTransplants':
      newState = setCheckbox(state, 'noneTransplants');
      return { checked: newState };

    case 'oneTransplants':
      newState = setCheckbox(state, 'oneTransplants');
      return { checked: newState };

    case 'twoTransplants':
      newState = setCheckbox(state, 'twoTransplants');
      return { checked: newState };

    case 'threeTransplants':
      newState = setCheckbox(state, 'threeTransplants');
      return { state, checked: newState };

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
  reducerSetFilter,
  reducerSetCheckbox,
  getTickets,
  renderTickets,
  ticketsView,
  onError,
});

export default reducer;
