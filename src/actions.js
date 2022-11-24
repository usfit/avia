/* eslint-disable func-names */
// Обработка ошибок

export const onError = (e) => ({
  type: 'onError',
  e,
});

// Установка отображения билетов

export const SET_TICKETS_VIEW = (ticketsView, filter, checkBox) => ({
  type: 'SET_TICKETS_VIEW',
  ticketsView,
  filter,
  checkBox,
});

// Какие билеты отображать

export function setTicketsView() {
  return function (dispatch, setState) {
    const state = setState();
    const ticketsList = state.getTickets.ticketsList;
    const filter = state.reducerSetFilter.filter;
    const checkBox = state.reducerSetCheckbox.checked;
    return dispatch(SET_TICKETS_VIEW(ticketsList, filter, checkBox));
  };
}

// Переключения фильтров

export const GET_CURRENT_FILTER = (filter) => ({ type: filter });
export const GET_CURRENT_CHECKBOX = (checkBox) => ({ type: checkBox });

export function onButtonFilter(filter = null, checkBox = null) {
  return function (dispatch) {
    if (filter) {
      dispatch(GET_CURRENT_FILTER(filter));
    }
    if (checkBox) {
      dispatch(GET_CURRENT_CHECKBOX(checkBox));
    }
    dispatch(setTicketsView());
  };
}

// Отображение билетов

export const RENDER_TICKETS = () => {
  return { type: 'RENDER_TICKETS' };
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
    return (
      fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        // eslint-disable-next-line no-use-before-define
        .then((ans) => dispatch(fetchTicketsMore(ans, searchId)))
        .catch((err) => {
          if (err.status === 500) {
            // eslint-disable-next-line no-use-before-define
            return dispatch(fetchTicketsMore({ tickets: [], stop: false }, searchId));
          }
          return dispatch(onError(err));
        })
    );
  };
}

export function fetchTicketsMore(ans, searchId) {
  return (dispatch) => {
    dispatch(RECEIVE_TICKETS(ans));
    dispatch(setTicketsView());
    if (!ans.stop) {
      setTimeout(() => dispatch(fetchTickets(searchId)), 250);
    }
  };
}

// Запрашиваем id
export function fetchId() {
  return function (dispatch) {
    return fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((ans) => dispatch(fetchTickets(ans.searchId)))
      .catch((err) => dispatch(onError(err)));
  };
}

// Делаем запрос

export function requestTickets() {
  return function (dispatch) {
    dispatch(fetchId());
  };
}
