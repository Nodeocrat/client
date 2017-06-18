NodeSocial is designed to be as self-contained and 'pluggable' as possible.
However, some assumptions still have to be made.

Assumptions made by NodeSocial:

1. redux, react and react-redux is already set up, including all the component-level
stuff like <Provider>, and injecting store, store initiation etc.
2. User is available as a first level property; state.user
and it structured as:
{
  username: "name",
  email: "emailAddr",
  ...
}
3. '@store/configureStore' resolves to file where the store is configured and
exported as a default export (so that NodeSocial has access to store.dispatch)

Things client code must do to get it working:
--------------------------------------------
1. add NodeSocial/reducers to root reducer as follows:

import NodeSocialReducers from '@components/Projects/NodeSocial/reducers';
const rootReducer = combineReducers({
  user: userReducer,
  ...NodeSocialReducers
});
Look at reducers/index.js at the state. The same state cannot be present in the first-level of the rootReducer's state else they will be duplicated.
