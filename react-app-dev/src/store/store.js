import {combineReducers, applyMiddleware, createStore} from 'redux';
import userReducer from '@reducers/userReducer';
import accountReducer from '@reducers/accountReducer';
import loginReducer from '@reducers/loginReducer';
import NodeSocialReducers from '@components/Projects/NodeSocial/reducers';

//middleware
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

/*For better performance (unnecessary in this simple app), segment reducers further.
e.g. import {profileReducer, linkedProfilesReducer, initializedReducer, errorsReducer}
from '@reducers/userReducer';

const rootReducer = combineReducers({
  user: combineReducers({
    errors: errorsReducer,
    initialized: initializedReducer,
    profile: profileReducer,
    linkedProfiles: linkedProfilesReducer
  })
});

This way, in the connect function, each individual slice
can be listened to for changes, and components won't needlessly have render() called.
TODO: Test it actually works this way /w comments
*/
const rootReducer = combineReducers({
  account: accountReducer,
  login: loginReducer,
  user: userReducer,
  ...NodeSocialReducers
});

// must use require since es6 imports do not support coniditional imports.

function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}

//TODO remove this for production
const testData = {
  user: {
    initialized: true,
    profile: {
      username: "TestAcc",
      email: "test@nodeocrat.com",
      photoUrl: "https://i.vimeocdn.com/portrait/58832_300x300",
      passwordSet: true
    },
    linkedProfiles: {
      facebook: null,
      google: null
    }
  }
};
const store = configureStore(testData);

export {store as default};
