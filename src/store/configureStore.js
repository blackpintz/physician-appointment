import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';

const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
