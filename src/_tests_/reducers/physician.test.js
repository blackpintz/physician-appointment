import physicianReducer from '../../reducers/physician';
import physician from '../fixtures/physicians';

test('should set physician to physician data from fixture', () => {
  const action = {
    type: 'ADD_PHYSICIAN',
    physician,
  };
  const state = physicianReducer(undefined, action);
  expect(state).toBe(physician);
});
