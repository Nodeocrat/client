import React from 'react';
import {Route, Link} from 'react-router-dom';

import {PropsRoute} from '@lib/CustomRoutes';
import ApBlog from './ApBlog';
import GameBlog from './GameBlog';

const BlogItem = ({ match }) => (
  <div>
    <h3>{match.params.blogId} ... bloggity blog blog blog blablhblahbla</h3>
  </div>
);

export default (props) => {
  return (
    <div>
      <Route exact path={props.match.url} render={() => (
        <div>
          <h2>Blogs</h2>
          <ul>
            <li>
              <Link to={`${props.match.url}/GameBlog`}>
                Loopless game server experiment
              </Link>
            </li>
            <li>
              <Link to={`${props.match.url}/ApBlog`}>
                Auslander-Parter algorithm
              </Link>
            </li>
          </ul>
        </div>
      )}/>
      <Route path={`${props.match.url}/ApBlog`} component={ApBlog}/>
      <PropsRoute profile={props.user.profile} path={`${props.match.url}/GameBlog`} component={GameBlog}/>
    </div>
  );
};
