export const error = { isError: false, errorNetwork: false };
export const filters = {
  filter: 'cheaper',
  checked: {
    all: true,
    noneTransplants: true,
    oneTransplants: true,
    twoTransplants: true,
    threeTransplants: true,
  },
  checkboxTitles: ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
};
export const tickets = {
  isFetching: false,
  ticketsList: [],
};

export const filtersButtons = {
  filtersLabels: ['cheaper', 'faster', 'optimal'],
  filtersDesc: ['САМЫЙ ДЕШЕВЫЙ', 'САМЫЙ БЫСТРЫЙ', 'ОПТИМАЛЬНЫЙ'],
};
