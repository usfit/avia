/* eslint-disable func-names */

// Переключения фильтров
export const GET_CURRENT_FILTER = (filter) => ({ type: filter });
export const GET_CURRENT_CHECLBOX = (checkBox) => ({ type: checkBox });

// Отображение билетов

export const RENDER_TICKETS = () => ({ type: 'RENDER_TICKETS' });

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
  console.log(tickets);
  return {
    type: 'RECEIVE_TICKETS',
    tickets,
  };
};

// Запрашваем билеты
export function fetchTickets(searchId) {
  return (dispatch) => {
    dispatch(RECEIVE_SEARCH_ID(searchId));
    return fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      .then((res) => res.json())
      .then((ans) => dispatch(fetchTicketsMore(ans, searchId)));
  };
}

// export function fetchTicketsMore(ans, searchId) {
//   return (dispatch) => {
//     dispatch(RECEIVE_TICKETS(ans));
//     if (!ans.stop) {
//       const interval = setInterval(() => dispatch(fetchTickets(searchId)), 1500);
//     }
//   };
// }

// Запрашиваем id
export function fetchId() {
  return function (dispatch) {
    return fetch('https://aviasales-test-api.kata.academy/search')
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
