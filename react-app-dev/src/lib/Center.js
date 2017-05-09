import React from 'react';

//Only useful if you need to center a group of elements which are to span the parent ele, which is to wrap its child elements. Otherwise use CSS to center.
export default props => (
  <div style={{width: 100 + '%'}}>
    <div style={{display: 'table', margin: 0 + ' auto'}}>
      {props.children}
    </div>
  </div>
);
