/* eslint-disable func-names */
// Обработка ошибок

export const onError = (e) => ({
  type: 'onError',
  e,
});

// Установка отображения билетов

export const SET_TICKETS_VIEW = (ticketsView) => ({
  type: 'SET_TICKETS_VIEW',
  ticketsView,
});

// Какие билеты отображать

export function setTicketsView() {
  return function (dispatch, getState) {
    const getDuration = (ticket) => {
      const duration = ticket.segments[0].duration + ticket.segments[1].duration;
      return duration;
    };
    const state = getState();
    let ticketsList = state.getTickets.ticketsList.slice(0);
    const filter = state.setFilters.filter;
    const checkBox = state.setFilters.checked;
    switch (filter) {
      case 'cheaper':
        ticketsList.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      case 'faster':
        ticketsList.sort((a, b) => (getDuration(a) > getDuration(b) ? 1 : -1));
        break;
      case 'optimal':
        ticketsList.sort((a, b) => (a.price + getDuration(a) > b.price + getDuration(b) ? 1 : -1));
        break;
      default:
        break;
    }
    if (checkBox.all) {
      return dispatch(SET_TICKETS_VIEW(ticketsList, filter, checkBox));
    }
    if (!checkBox.noneTransplants) {
      ticketsList = ticketsList.filter((ticket) => ticket.segments[0].stops.length !== 0);
    }
    if (!checkBox.oneTransplants) {
      ticketsList = ticketsList.filter((ticket) => ticket.segments[0].stops.length !== 1);
    }
    if (!checkBox.twoTransplants) {
      ticketsList = ticketsList.filter((ticket) => ticket.segments[0].stops.length !== 2);
    }
    if (!checkBox.threeTransplants) {
      ticketsList = ticketsList.filter((ticket) => ticket.segments[0].stops.length !== 3);
    }
    return dispatch(SET_TICKETS_VIEW(ticketsList, filter, checkBox));
  };
}

// Переключения фильтров

export const GET_CURRENT_FILTER = (filter) => ({ type: filter });

export function onButtonFilter(filter) {
  return function (dispatch) {
    if (filter) {
      dispatch(GET_CURRENT_FILTER(filter));
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
          const error =
            err.message === 'Failed to fetch'
              ? { isError: true, errorNetwork: true }
              : { isError: true, errorNetwork: false };
          return dispatch(onError(error));
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
      .catch((err) => {
        const error =
          err.message === 'Failed to fetch'
            ? { isError: true, errorNetwork: true }
            : { isError: true, errorNetwork: false };
        return dispatch(onError(error));
      });
  };
}

// Делаем запрос

export function requestTickets() {
  return function (dispatch) {
    dispatch(fetchId());
  };
}
