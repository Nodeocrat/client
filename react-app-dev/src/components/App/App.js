import React, { Component } from 'react';
import './App.css';

//custom component imports
import NcNavBar from '@components/NcNavBar/NcNavBar';
import NcMainView from '@components/NcMainView/NcMainView';

class App extends Component {
  render() {
    return (
      <div>
        <NcNavBar/>
        <div style={{paddingTop: 100 + 'px'}}>
          <NcMainView/>
        </div>
      </div>
    );
  }
}

export default App;
