import addAppointment from '../../actions/appointment';
import appointment from '../fixtures/appointments';

test('should set up to add appointment data', () => {
  const action = addAppointment(appointment);
  expect(action).toEqual({
    type: 'ADD_APPOINTMENT',
    appointment,
  });
});
