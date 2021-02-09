import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';
import physicianReducer from '../reducers/physician';
import appointmentReducer from '../reducers/appointment';

const store = createStore(
  combineReducers({
    user: userReducer,
    physician: physicianReducer,
    appointment: appointmentReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
