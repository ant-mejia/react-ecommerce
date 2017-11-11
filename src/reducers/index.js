import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demo from './demo';

const Reducers = combineReducers({
  demo,
  routerReducer
});

export default Reducers;
