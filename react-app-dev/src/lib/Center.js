import React from 'react';

export default (props) => (
  <div style={{width: 100 + '%'}}>
    <div style={{display: 'table', margin: 0 + ' auto'}}>
      {props.children}
    </div>
  </div>
);


/*.center-outer {
  width: 100%;
}
.center-inner {
  display: table;
  margin: 0 auto;
}
*/
