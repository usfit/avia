const initialState = {
  filter: 'cheaper',
  checked: {
    all: true,
    noneTransplants: true,
    oneTransplants: true,
    twoTransplants: true,
    threeTransplants: true,
  },
};

const reducer = (state = initialState, action = {}) => {
  let newState = {};
  switch (action.type) {
    case 'cheaper':
      newState = { filter: 'cheaper' };
      return { ...state, ...newState };

    case 'faster':
      newState = { filter: 'faster' };
      return { ...state, ...newState };

    case 'optimal':
      newState = { filter: 'optimal' };
      return { ...state, ...newState };

    default:
      return state;
  }
};

export default reducer;
