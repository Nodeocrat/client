import React, { Component } from 'react';
import './NcMainView.css';

//View to handle logic between NcNavBar and which view to show

function HomePage(props){
  return (
    <div>Home</div>
  );
}

function BlogPage(props){
  return (
    <div>Blogs</div>
  );
}

class NcMainView extends Component {

  render() {
    return (
      <div className="container">
        <div className="col-lg-10 col-lg-offset-1">
          <HomePage/>
        </div>
      </div>
    );
  }
}

export default NcMainView;
