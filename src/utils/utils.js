import { format } from 'date-fns';

export const messageStopCount = (stopsCount) => {
  switch (stopsCount) {
    case 0:
      return 'БЕЗ ПЕРЕСАДОК';
    case 1:
      return `${stopsCount} ПЕРЕСАДКА`;
    default:
      return `${stopsCount} ПЕРЕСАДКИ`;
  }
};

export const messageStops = (stops) => {
  const length = stops.length;
  let message = '';
  stops.forEach((stop, ind) => {
    message = ind + 1 === length ? (message += stop) : (message += `${stop}, `);
  });
  return message;
};

export const getTicketDate = (date, duration) => {
  const oneDate = new Date(date);
  const twoDate = new Date(oneDate.getTime() + duration * 60000);
  const dateMessage = `${format(oneDate, 'HH:mm')} - ${format(twoDate, 'HH:mm')}`;
  return dateMessage;
};

export const calcPrice = (price) => {
  return price % 1000 === 0 ? `${Math.trunc(price / 1000)} 000 Р` : `${Math.trunc(price / 1000)} ${price % 1000} Р`;
};

export const calcDuration = (duration) => {
  return `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
};

export const getDirection = (segment) => {
  return `${segment.origin} - ${segment.destination}`;
};
