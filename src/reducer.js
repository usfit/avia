const initialState = {
  filter: 'cheaper',
};

const reducer = (state = initialState, action = {}) => {
  if (state === 'undefined') {
    return state;
  }
  const newState = Object.assign(state);
  switch (action.type) {
    case 'CHOOSE_CHEAPER':
      newState.filter = 'cheaper';
      return newState;

    case 'CHOOSE_FASTER':
      newState.filter = 'faster';
      return newState;

    case 'CHOOSE_OPTIMAL':
      newState.filter = 'optimal';
      return newState;

    default:
      return newState;
  }
};

export default reducer;
