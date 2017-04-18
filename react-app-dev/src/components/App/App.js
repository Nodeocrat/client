import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//custom component imports
import NcNavBar from '@components/Navigation/NcNavBar';
import NcMainView from '@components/NcMainView/NcMainView';
import Projects from '@components/Projects/Projects';
import Home from '@components/Home/Home.js';
import Account from '@components/Account/Account';

import text from '@styles/text.css';

//services
import Ajax from '@services/Ajax';

// tab format:
// path
// [renderPath]
// [exact]
// [navTab]: if true, it'll be placed on the navigation bar @ top of page
// [name]: name of tab on navigation bar
// view: view to be rendered

class App extends Component {
  constructor(props){
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: {
        initialized: false,
        signedIn: false,
        profile: null,
        linkedProfiles: {
          facebook: null,
          google: null
        },
        updateUser: this.updateUser
      }
    };
    this.onSignOut = this.onSignOut.bind(this);
    this.updateUser();
  }

  render() {

    const tabs = [
      {
        path: "/",
        exact: true,
        navTab: true,
        name: "Home",
        view: Home
      },
      {
        path: "/projects",
        navTab: true,
        name: "Projects",
        view: Projects,
        props: {user: this.state.user}
      },
      {
        path: "/account",
        view: Account,
        props: {user: this.state.user}
      }
    ];

    return (
      <Router>
        <div className={text.regular}>
          <NcNavBar user={this.state.user} onSignOut={this.onSignOut} routes={tabs}/>
          <NcMainView routes={tabs}/>
        </div>
      </Router>
    );
  }

  updateUser(){
    Ajax.get({
      url: '/account/user',
      response: 'JSON',
      success: (user) => {
        this.setState({
          user: {
            initialized: true,
            signedIn: user.signedIn,
            profile: user.profile,
            linkedProfiles: user.linkedProfiles,
            updateUser: this.updateUser
          }
        });
      },
      error: (response) => {
        //TODO use modal dialog alert once implemented
        console.log(response);
      }
    });
  }

  onSignOut(){
    Ajax.post({
      url: '/auth/logout',
      response: 'JSON',
      success: (response) => {
        this.setState({
          user: {
            initialized: true,
            signedIn: false,
            profile: null,
            linkedProfiles: null,
            updateUser: this.updateUser
          }
        });
      },
      error: (response) => {
        //TODO Modal dialog once Alert popups implemented
        console.log(response);
      }
    });
  }
}

export default App;
