import React from 'react';
import {Route, Link} from 'react-router-dom';

const BlogItem = ({ match }) => (
  <div>
    <h3>{match.params.blogId} ... bloggity blog blog blog blablhblahbla</h3>
  </div>
);

export default (props) => (
  <div>
    <Route exact path={props.match.url} render={() => (
      <div>
        <h2>Blogs</h2>
        <ul>
          <li>
            <Link to={`${props.match.url}/Blog1`}>
              Blog 1
            </Link>
          </li>
          <li>
            <Link to={`${props.match.url}/Blog2`}>
              Blog 2
            </Link>
          </li>
          <li>
            <Link to={`${props.match.url}/Blog3`}>
              Blog 3
            </Link>
          </li>
        </ul>
      </div>
    )}/>
    <Route path={`${props.match.url}/:blogId`} component={BlogItem}/>
  </div>
);
