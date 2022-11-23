import { combineReducers } from 'redux';

// Вильтры сверху

function reducerSetFilter(state = { filter: 'cheaper' }, action = {}) {
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

const checkAll = (newState) => {
  let count = 0;
  Object.values(newState)
    .splice(1)
    .forEach((value) => {
      count += value;
    });
  return count;
};

const setCheckbox = (state, check) => {
  const newState = { ...state.checked, ...{ [check]: !state.checked[check] } };
  newState.all = !!(checkAll(newState) === 4);
  return newState;
};

function reducerSetCheckbox(
  state = {
    checked: {
      all: true,
      noneTransplants: true,
      oneTransplants: true,
      twoTransplants: true,
      threeTransplants: true,
    },
  },
  action = {}
) {
  let newState = {};

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

function getTickets(
  state = {
    isFetching: false,
    ticketsList: [],
  },
  action = {}
) {
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
  const tickets = action.ticketsView;
  if (action.type === 'SET_TICKETS_VIEW') {
    switch (action.filter) {
      case 'cheaper':
        return tickets.sort((a, b) => (a.price > b.price ? 1 : -1));
      default:
        return state;
    }
  }
  return state;
}

const reducer = combineReducers({ reducerSetFilter, reducerSetCheckbox, getTickets, renderTickets, ticketsView });

export default reducer;
