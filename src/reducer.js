import { combineReducers } from 'redux';

// const initialState = {
//   tickets: [],
//   filter: 'cheaper',
//   checked: {
//     all: true,
//     noneTransplants: true,
//     oneTransplants: true,
//     twoTransplants: true,
//     threeTransplants: true,
//   },
// };

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
    searchId: null,
    ticketsList: [],
  },
  action = {}
) {
  switch (action.type) {
    case 'START_SEARCH':
      return { ...state, isFetching: true };
    case 'RECEIVE_SEARCH_ID':
      return { ...state, searchId: action.searchId };
    case 'RECEIVE_TICKETS':
      return { ...state, ticketsList: action.tickets };
    default:
      return state;
  }
}

const reducer = combineReducers({ reducerSetFilter, reducerSetCheckbox, getTickets });

export default reducer;
