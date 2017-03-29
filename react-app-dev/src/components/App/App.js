import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

//custom component imports
import NcNavBar from '@components/NcNavBar/NcNavBar';
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

const tabs = [
  {
    paths: ["/", "/login", "/register"],
    exact: true,
    navTab: true,
    name: "Home",
    view: Home
  },
  {
    path: "/blog",
    navTab: true,
    name: "Blog",
    view: Blog
  },
  {
    path: "/account",
    view: Account
  }
];

class App extends Component {
  constructor(props){
    super(props);
    //********************* CLIENT TESTING ***************
    this.state = {
      user: {
        initialized: true,
        signedIn: true,
        profile: {
          username: "AshleyPhillips",
          photoUrl: 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
          email: 'zukias@hotmail.com',
          passwordSet: true
        },
        socialProfiles: {
          google: {
            name: "折原臨也",
            photoUrl: 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg',
            id: 'hihiuhu89898'
          }
        }
      }
    };
    //*********************** END **********************

    this.onSignOut = this.onSignOut.bind(this);
    /*this.state = {
      user: {
        initialized: false,
        signedIn: false,
        profile: null,
        socialProfiles: {
          facebook: null,
          google: null
        }
      }
    };*/

    this.updateUser = this.updateUser.bind(this);
    //this.updateUser();
  }

  render() {
    return (
      <Router>
        <div>
          <NcNavBar user={this.state.user} onSignOut={this.onSignOut} routes={tabs}/>
          <NcMainView onUserUpdate={this.updateUser} routes={tabs} user={this.state.user}/>
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
            socialProfiles: user.socialProfiles
          }
        });
      },
      error: (response) => {
        //TODO use modal dialog once class created
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
            profile: null
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
