import React from 'react';
import {BrowserRouter} from 'react-router-dom';

//custom component imports
import NcNavBar from '@components/Navigation/NcNavBar';
import NcMainView from '@components/NcMainView/NcMainView';
import Projects from '@components/Projects/Projects';
import Home from '@components/Home/Home.js';
import Account from '@components/Account/Account';

//styles
import text from '@styles/text.css';

//services
import Ajax from '@services/Ajax';

export default class extends React.Component {
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

    //Dev only
    /*this.state = {
      user: {
        initialized: true,
        signedIn: true,
        profile: {
          username: "SillyBoy",
          email: "admin@nodeocrat.com",
          photoUrl: "https://delmarva.streetlightoutages.com/common/images/organizations/_default/unavailablePhoto.png",
          passwordSet: false
        },
        linkedProfiles: {
          facebook: null,
          google: null
        },
        updateUser: () => console.log('update user called')
      }
    };*/
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
      <BrowserRouter>
        <div className={text.regular}>
          <NcNavBar user={this.state.user} onSignOut={this.onSignOut} routes={tabs}/>
          <NcMainView routes={tabs}/>
        </div>
      </BrowserRouter>
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
