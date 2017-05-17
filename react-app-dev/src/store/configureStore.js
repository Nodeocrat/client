import {combineReducers, applyMiddleware, createStore} from 'redux';
//import stateSlice1 from '@reducers/stateSlice1Reducer';
//import stateSlice2 from '@reducers/stateSlice2Reducer';

//middleware
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

// Calculate state 'slices' from each of the corresponding reducers
const rootReducer = combineReducers({
  /*stateSlice1,
  stateSlice2*/
});

// must use require since import does not support coniditional imports.

export default function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
