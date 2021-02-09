import addPhysician from '../../actions/physician';
import physician from '../fixtures/physicians';

test('should set up to add physician data', () => {
  const action = addPhysician(physician);
  expect(action).toEqual({
    type: 'ADD_PHYSICIAN',
    physician,
  });
});
