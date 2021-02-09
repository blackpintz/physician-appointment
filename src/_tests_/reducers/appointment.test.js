import appointmentReducer from '../../reducers/appointment';
import appointment from '../fixtures/appointments';

test('should set appointment to appointment data from fixture', () => {
  const action = {
    type: 'ADD_APPOINTMENT',
    appointment,
  };
  const state = appointmentReducer(undefined, action);
  expect(state).toBe(appointment);
});
