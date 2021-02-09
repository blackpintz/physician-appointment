import userReducer from '../../reducers/user';

test('should set id to 1', () => {
  const id = 1;
  const action = {
    type: 'ADD_USER_ID',
    id,
  };
  const state = userReducer(undefined, action);
  expect(state).toBe(id);
});
