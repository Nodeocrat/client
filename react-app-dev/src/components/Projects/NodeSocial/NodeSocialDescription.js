import React from 'react';
import text from '@styles/text.css';
import {Link} from 'react-router-dom';

export default props => (
  <div>
    <div className={`${text.title} ${text.center}`}>Node Social App</div>
    <div className={text.center}><i>ES6, Node, React, Redux, Socket.io, Express.js, Advanced CSS features</i></div>
    <br/>
    <p>{"This is an online interactive lobby/multiplayer game room, so it'll be a little boring if you are testing it by yourself."}</p>
    <p>It has been integrated with <Link to="/projects/GameProj">Node Shooter</Link>. Players can choose to create new instances of this game, or join one. This project makes advanced use of data structures and design patterns with the aforementioned technologies. It has been built to be easily extensible, as there are many more features yet to be added.</p>
    <div><strong>Client code repository: </strong><a href="https://github.com/Nodeocrat/client/tree/redux/react-app-dev/src/components/Projects/NodeSocial" target="_blank">https://github.com/Nodeocrat/client/tree/redux/react-app-dev/src/components/Projects/NodeSocial</a></div>
    <div><strong>Server code repository: </strong><a href="https://github.com/Nodeocrat/backend/tree/redux/NodeSocial" target="_blank">https://github.com/Nodeocrat/backend/tree/redux/NodeSocial</a></div>
    <br/>
  </div>
);
