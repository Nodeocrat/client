import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

//custom component imports
import NcNavBar from '@components/Navigation/NcNavBar';
import NcMainView from '@components/NcMainView/NcMainView';
import Blog from '@components/Blog/Blog';
import Home from '@components/Home/Home';
import Account from '@components/Account/Account';

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
    //********************* CLIENT-ONLY TESTING ***************
    /*this.state = {
      user: {
        initialized: true,
        signedIn: false,
        profile: {
          username: "AshleyPhillips",
          photoUrl: 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
          email: 'zukias@hotmail.com',
          passwordSet: true
        },
        linkedProfiles: {
          google: {
            name: "狂馬鹿",
            photoUrl: 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
            id: 'hihiuhu89898'
          }
        }
      }
    };*/
    //*********************** END **********************
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
    this.updateUser = this.updateUser.bind(this);
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
        path: "/blog",
        navTab: true,
        name: "Blog",
        view: Blog,
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
        <div>
          <NcNavBar user={this.state.user} onSignOut={this.onSignOut} routes={tabs}/>
          <NcMainView routes={tabs}/>
        </div>
      </Router>
    );
  }

  updateUser(){
    Ajax.get({
      url: '/user',
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
      url: '/logout',
      response: 'JSON',
      success: (response) => {
        this.setState({
          user: {
            initialized: true,
            signedIn: false,
            profile: null,
            linkedProfiles: null
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
