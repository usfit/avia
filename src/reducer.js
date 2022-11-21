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

// Изменение фильтров сверху

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

// Измменение фильтров сбоку

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
      return { checked: newState };

    default:
      return state;
  }
}

// Запрос на сервер

const reducer = combineReducers({
  reducerSetFilter,
  reducerSetCheckbox,
});

export default reducer;
