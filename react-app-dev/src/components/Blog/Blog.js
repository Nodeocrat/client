import React from 'react';
import {Route, Link} from 'react-router-dom';
import UrlHelper from '@lib/UrlHelper';

import {PropsRoute} from '@lib/CustomRoutes';
import ApBlog from './ApBlog';
//import GameBlog from './GameBlog';

const BlogItem = ({ match }) => (
  <div>
    <h3>{match.params.blogId} ... bloggity blog blog blog blablhblahbla</h3>
  </div>
);

export default (props) => {

  const currentUrl = UrlHelper.currentUrl(props);

  return (
    <div>
      {currentUrl.endsWith('blog/login') || currentUrl.endsWith('blog/register') ||
        currentUrl.endsWith('blog') || currentUrl.endsWith('blog/') ?
        <Route path={props.match.url} render={() => (
          <div>
            <h2>Blogs</h2>
            <ul>
              <li>
                <a href={`/gameblog.html`}>
                  Loopless game server experiment
                </a>
              </li>
              <li>
                <Link to={`${props.match.url}/ApBlog`}>
                  Auslander-Parter algorithm
                </Link>
              </li>
            </ul>
          </div>
        )}/>
      :
        <div>
          <Route path={`${props.match.url}/ApBlog`} component={ApBlog}/>
        </div>
      }
    </div>
  );
};


//<PropsRoute path={`${props.match.url}/GameBlog`} profile={props.user.profile} render={()=>(<div>GameBlog</div>)}/>
