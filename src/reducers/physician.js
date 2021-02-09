const physicianReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PHYSICIAN':
      return action.physician;
    default:
      return state;
  }
};

export default physicianReducer;
