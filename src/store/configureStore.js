import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';
import physicianReducer from '../reducers/physician';

const store = createStore(
  combineReducers({
    user: userReducer,
    physician: physicianReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
