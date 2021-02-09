const appointmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return action.appointment;
    default:
      return state;
  }
};

export default appointmentReducer;
