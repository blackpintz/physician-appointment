import addUserId from '../../actions/user';

test('should set up to add user id', () => {
  const action = addUserId(1);
  expect(action).toEqual({
    type: 'ADD_USER_ID',
    id: 1,
  });
});
