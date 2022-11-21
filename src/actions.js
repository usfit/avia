/* eslint-disable func-names */
export const GET_CURRENT_FILTER = (filter) => ({ type: filter });
export const GET_CURRENT_CHECLBOX = (checkBox) => ({ type: checkBox });

// Начинаем поиск

export const START_SEARCH = () => ({ type: 'START_SEARCH' });

// Устанавливаем id

export const RECEIVE_SEARCH_ID = (searchId) => {
  return {
    type: 'RECEIVE_SEARCH_ID',
    searchId,
  };
};

// Устанавливаем билеты

export const RECEIVE_TICKETS = (tickets) => {
  return {
    type: 'RECEIVE_TICKETS',
    tickets,
  };
};

// Запрашваем билеты
export function fetchTickets(searchId) {
  return (dispatch) => {
    dispatch(RECEIVE_SEARCH_ID(searchId));
    return fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`)
      .then((res) => res.json())
      .then((ans) => dispatch(RECEIVE_TICKETS(ans)));
  };
}

// Запрашиваем id
export function fetchId() {
  return function (dispatch) {
    return fetch('https://front-test.dev.aviasales.ru/search')
      .then((res) => res.json())
      .then((ans) => dispatch(fetchTickets(ans.searchId)));
  };
}

// Делаем запрос

export function requestTickets() {
  return function (dispatch) {
    dispatch(START_SEARCH());
    dispatch(fetchId());
  };
}
