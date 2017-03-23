import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

//custom component imports
import NcNavBar from '@components/NcNavBar/NcNavBar';
import NcMainView from '@components/NcMainView/NcMainView';
import Blog from '@components/Blog/Blog';

const tabs = [
  {
    path: "/",
    name: "Home",
    view: () => (<div>Home</div>)
  },
  {
    path: "/blog",
    name: "Blog",
    view: Blog
  }
];

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NcNavBar routes={tabs}/>
          <NcMainView routes={tabs}/>
        </div>
      </Router>
    );
  }
}

export default App;
