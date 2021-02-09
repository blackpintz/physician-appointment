const userReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_USER_ID':
      return action.id;
    default:
      return state;
  }
};

export default userReducer;
