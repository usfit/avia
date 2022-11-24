import { combineReducers } from 'redux';

// Обработка ошибок

function onError(state = { isError: false, errorNetwork: false }, action = {}) {
  let newState = {};
  switch (action.type) {
    case 'onError':
      newState =
        action.e.message === 'Failed to fetch'
          ? { isError: true, errorNetwork: true }
          : { isError: true, errorNetwork: false };
      return newState;
    default:
      return state;
  }
}

// Фильтры сверху

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
  const getDuration = (ticket) => {
    const duration = ticket.segments[0].duration + ticket.segments[1].duration;
    return duration;
  };
  if (action.type === 'SET_TICKETS_VIEW') {
    const checkBox = action.checkBox;
    const tickets = action.ticketsView.slice(0);
    let newState = state;
    switch (action.filter) {
      case 'cheaper':
        newState = tickets.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      case 'faster':
        newState = tickets.sort((a, b) => (getDuration(a) > getDuration(b) ? 1 : -1));
        break;
      case 'optimal':
        newState = tickets.sort((a, b) => (a.price + getDuration(a) > b.price + getDuration(b) ? 1 : -1));
        break;
      default:
        break;
    }
    if (checkBox.all) {
      return newState;
    }
    if (!checkBox.noneTransplants) {
      newState = newState.filter((ticket) => ticket.segments[0].stops.length !== 0);
    }
    if (!checkBox.oneTransplants) {
      newState = newState.filter((ticket) => ticket.segments[0].stops.length !== 1);
    }
    if (!checkBox.twoTransplants) {
      newState = newState.filter((ticket) => ticket.segments[0].stops.length !== 2);
    }
    if (!checkBox.threeTransplants) {
      newState = newState.filter((ticket) => ticket.segments[0].stops.length !== 3);
    }
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
