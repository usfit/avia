const initialState = {
  tickets: [],
  filter: 'cheaper',
  checked: {
    all: true,
    noneTransplants: true,
    oneTransplants: true,
    twoTransplants: true,
    threeTransplants: true,
  },
};

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

const reducer = (state = initialState, action = {}) => {
  let newState = {};
  switch (action.type) {
    case 'cheaper':
      return { ...state, filter: 'cheaper' };

    case 'faster':
      return { ...state, filter: 'faster' };

    case 'optimal':
      return { ...state, filter: 'optimal' };

    case 'all':
      newState = { ...state.checked, ...{ all: !state.checked.all } };
      Object.keys(newState)
        .splice(1)
        .forEach((key) => {
          newState[key] = !!newState.all;
        });

      return { ...state, checked: newState };

    case 'noneTransplants':
      newState = setCheckbox(state, 'noneTransplants');
      return { ...state, checked: newState };

    case 'oneTransplants':
      newState = setCheckbox(state, 'oneTransplants');
      return { ...state, checked: newState };

    case 'twoTransplants':
      newState = setCheckbox(state, 'twoTransplants');
      return { ...state, checked: newState };

    case 'threeTransplants':
      newState = setCheckbox(state, 'threeTransplants');
      return { ...state, checked: newState };

    default:
      return state;
  }
};

export default reducer;
