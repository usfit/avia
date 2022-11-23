// Установка отображения билетов

export const SET_TICKETS_VIEW = (ticketsView, filter) => ({ type: 'SET_TICKETS_VIEW', ticketsView, filter });

// Какие билеты отображать

export function setTicketsView() {
  return function (dispatch, setState) {
    const state = setState();
    const ticketsList = state.getTickets.ticketsList;
    const filter = state.reducerSetFilter.filter;
    return dispatch(SET_TICKETS_VIEW(ticketsList, filter));
  };
}

// Переключения фильтров

export const GET_CURRENT_FILTER = (filter) => ({ type: filter });
export const GET_CURRENT_CHECLBOX = (checkBox) => ({ type: checkBox });

export function onButtonFilter(filter) {
  return function (dispatch) {
    dispatch(GET_CURRENT_FILTER(filter));
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
        .then((res) => res.json())
        // eslint-disable-next-line no-use-before-define
        .then((ans) => dispatch(fetchTicketsMore(ans, searchId)))
        .catch((err) => {
          if (err.message === 'Unexpected end of JSON input') {
            // eslint-disable-next-line no-use-before-define
            dispatch(fetchTicketsMore({ tickets: [], stop: false }, searchId));
          }
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
      .then((res) => res.json())
      .then((ans) => dispatch(fetchTickets(ans.searchId)))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          alert('Проверьте соединение к интернету и обновите страницу!');
        }
      });
  };
}

// Делаем запрос

export function requestTickets() {
  return function (dispatch) {
    dispatch(fetchId());
  };
}
