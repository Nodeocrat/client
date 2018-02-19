import React from 'react';
import ScriptLoader from '@services/ScriptLoader';
import {Link} from 'react-router-dom';

export default class RoomProj extends React.Component {
  constructor(){
    super();

    ScriptLoader([
      "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"
    ], () => window.PR.prettyPrint());
  }

  render(){
    return (
      <section className="col-md-10 col-md-offset-1">
        <h2 style={{textAlign: 'center'}}><b>Samples</b></h2>
        <div>There are 6 samples:</div>
        <ul>
          <li><a href="https://github.com/Nodeocrat/room-samples/tree/master/sample-1" target="_blank">Sample 1: Basics</a></li>
          <li><a href="https://github.com/Nodeocrat/room-samples/tree/master/sample-2" target="_blank">Sample 2: Disconnecting & reconnecting</a></li>
          <li><a href="https://github.com/Nodeocrat/room-samples/tree/master/sample-3" target="_blank">Sample 3: Permissions</a></li>
          <li><a href="https://github.com/Nodeocrat/room-samples/tree/master/sample-4" target="_blank">Sample 4: Initialization hook</a></li>
          <li><a href="https://github.com/Nodeocrat/room-samples/tree/master/sample-5" target="_blank">Sample 5: Multiple rooms of the same type</a></li>
          <li><a href="https://github.com/Nodeocrat/room-samples/tree/master/sample-6" target="_blank">Sample 6: Everything together</a></li>
        </ul>

        <br/>
        <h4><b>Sample 1: Basics</b></h4>
        <p>
        <a href="https://github.com/Nodeocrat/room-samples/tree/master/sample-1">Sample 1</a>{` is a simple chat room example. If you're testing it on your own, use two separate browsers or a browser with incognito mode to log into multiple accounts. The server side room module doesn't allow multiple clients with the same session ID.`}
        </p>
        <p>
        {`On the client side the part to take notice of is in the login() function. The rest is mostly DOM manipulation.`}
        </p>
        <pre className="prettyprint lang-js">
        {`
        chatRoom = new ClientRoom();
        chatRoom.join('/chatroom', {username: nameInput.value})
          .then(() => {
            //Socket events
            chatRoom.on('INIT', users => {
              for(let user of users)
                userList.set(user.username, user);
              renderUserList();
            });

            // etc...

            chatRoom.initialized();
          })
          .catch(err => console.log(err));`}
          </pre>
          <p>
          {`Above is an excerpt from the client sample. To create a client room you must always construct a new room and use `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#clientroomjoinurl-payload" target="_blank">ClientRoom.join</a>{` to request to join that room. If unsuccessful an exception will be thrown with err being a string, for the reason of the failure. Upon success, this is the time to initialize the client. Once you have finished initializing, call `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#clientroominitialized" target="_blank">initialized()</a>{` as shown, which will notify the corresponding room on the server that you have finished initializing.`}
          Now for the server side code,
          </p>
          <pre className="prettyprint">
          {`
          const server = http.createServer(app);
          Room.initialize(server, {sidHeader: SID});`}
          </pre>
          Firstly it is important to note you must pass the http server to
          <a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#clientroominitialized" target="_blank"> Room.initialize()</a>, and your session ID string name in the cookie, with the  sidHeader prop in the optional 2nd argument (default to 'sid').

          <pre className="prettyprint">
          {`
          app.post('/chatroom', (req, res) => {
            const result = chatRoom.join({cookie: req.headers.cookie, id: req.body.username});
            res.json(result);
          });`}
          </pre>
          <p>
          {`This is the API endpoint which chatRoom.join('/chatroom') posts to in the client sample, and is where permission is requested to join the room. The `} <a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonjoinrequestclient-userinfo" target="_blank">permission hook</a>{` is demonstrated in sample 3, but if you do not implement it in your subclass, then permission will always be granted to join. Once permission to join has been granted, the client is added to the room in an uninitialized state and will not yet receive broadcasted messages. A useful hook `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonclientacceptedclient" target="_blank">onClientAccepted</a>{` is called at this time too, demonstrated in sample 4. If your Room server is at a different URL to your API, or you want to specify a path, you can add a 'url' property onto the result object here. It can be a relative path or an absolute URL.`}
          </p>
          <pre className="prettyprint">
          {`
          class ChatRoom extends Room {
            constructor(){
              super();
              this._users = new Map();
            }

            initClient(client){
              super.initClient(client); // Must always call super for this hook

              if(!client.id)
                this.leave(client);

              this._users.set(client.id, {username: client.id});

              this.addListener(client, 'SEND_MSG', msg => {
                this.broadcast('USER_MSG', {username: client.id, text: msg});
              });
              this.broadcast('USER_JOINED', this._users.get(client.id));
              this.emit(client, 'INIT', [...this._users.values()]); // Convert to array of user objects
            }

            onClientLeave(client){
              super.onClientLeave(client); // Must always call super for this hook

              this._users.delete(client.id);
              this.broadcast('USER_LEFT', {username: client.id});
            }
          }`}</pre>
          <p>
          {`This is our subclass which extends Room, and implements only two client hooks. initClient is called when a client has called `} <a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#clientroominitialized" target="_blank">ClientRoom.initialized()</a>{`, from the first code sample on the client side, so you can safely assume here that the client is all initialized, and is a good place to set the listeners. The `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonclientleaveclient" target="_blank">onClientLeave</a>{` hook is called when a client leaves, which can happen in a number of ways. Both `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#clientroomleave" target="_blank">client</a>{` and `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonclientleaveclient" target="_blank">server</a>{` modules have a leave method, with the server-side module taking a client parameter. Also if you haven't implemented disconnect/reconnect functionality, a disconnect will automatically boot the player from the room.`}
        </p>

        <br/>
        <h4><b>Sample 2: Disconnecting & reconnecting</b></h4>
        <p>
        {`The SocketHandler class (read about it in the `}<Link to='/projects/Room'>Summary</Link>{` section) can detect disconnects and reconnects, and will try to reconnect when the connection is lost. The server-side Room module allows you to access `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonclientdisconnectclient" target="_blank">onClientDisconnect</a>{` and `} <a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonclientreconnectclient" target="_blank">onClientReconnect</a>{` hooks, when this happens. To stop players being booted from the room upon disconnect, you must pass a reconnectTimeout property in the `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#new-roomoptions" target="_blank">constructor</a>{`, as follows:`}
        </p>
        <pre className="prettyprint">
        {`
        constructor(){
          super({reconnectTimeout: 15000});
          this._users = new Map();
        }`}
        </pre>
        <p>
        {`The parameter is in milliseconds. This will boot the client from the room if they have not reconnected within 15 seconds. It defaults to 0. Passing a negative number will disable the auto-boot completely. Now we can implement the disconnect and reconnect hooks as shown below.`}
        </p>
        <pre className="prettyprint">
        {`
        onClientDisconnect(client){
          super.onClientDisconnect(client); // Must always call super for this hook
          const user = this._users.get(client.id);
          user.status = 'DISCONNECTED';
          this.broadcast('USER_DISCONNECTED', user);
        }

        onClientReconnect(client){
          super.onClientReconnect(client); // Must always call super for this hook
          const user = this._users.get(client.id);
          user.status = 'ONLINE';
          this.broadcast('USER_RECONNECTED', user, {exclude: new Set([client.sid])});
          this.sendInitialData(client);
        }`}
        </pre>
        <p>
        {`That's all that's required to implement reconnect functionality on the server. For the client side, if a user has disconnected, a message will be printed in the chat room message area, as well as their name in the user list graying out. If they do not reconnect within 15 seconds they will leave, and if they reconnect before then, their name will go back to white with a reconnect message in the chat area. The only new events added to the chat room are shown below.`}
        </p>
        <pre className="prettyprint">
        {`
        chatRoom.on('USER_DISCONNECTED', user => {
          userList.set(user.username, user);
          newMessage(\`\${user.username} disconnected\`);
          renderUserList();
        });
        chatRoom.on('USER_RECONNECTED', user => {
          userList.set(user.username, user);
          newMessage(\`\${user.username} reconnected\`);
          renderUserList();
        });`}
        </pre>

        <br/>
        <h4><b>Sample 3: Permissions</b></h4>
        <p>
        {`This sample demonstrates how to grant or refuse permission. Here, we refuse permission to join if the username entered is longer than 8 characters, or if its empty. To do this, all we need to do is implement the `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonjoinrequestclient-userinfo" target="_blank">onJoinRequest</a>{` hook on the server-side ChatRoom class, as shown below.`}
        </p>
        <pre className="prettyprint">
        {`
        onJoinRequest(userInfo){ // Do not call super for this hook
          if(!userInfo.id)
            return {success: false, reason: 'Username cannot be empty'};

          if(userInfo.id.length > 8)
            return {success: false, reason: 'Username cannot be longer than 8 characters'};

          return true; // You can also return a boolean, but if it's false, it's recommended to include a reason
        }`}
        </pre>
        <p>
        {`Now, if we enter no name, or a name longer than 8 characters, the error reason will be caught and printed to the developer console.`}
        </p>

        <br/>
        <h4><b>Sample 4: Initialization hook</b></h4>
        <p>
        {`Here, the `}<a href="" target="_blank">onClientAccepted</a>{` hook is demonstrated, which is useful for a few reasons. First is that it allows us to broadcast that a user is joining, but not yet initialized, and second; it allows us to add a user to the room before the user has initialized, which can be useful if we have a user limit for our room, to avoid a conflict if two users request to join (see sample 3) at the same time for the last spot.`}
        </p>
        <p>
        {`All that has been changed to the client from sample 1 is a new 'USER_INITIALIZED' websocket event for when the user has finished initializing, and the initialized() callback has been wrapped in a setTimeout to simulate initialization.`}
        </p>
        <pre className="prettyprint">
        {`
          chatRoom.on('USER_INITIALIZED', user => {
            userList.set(user.username, user);
            renderUserList();
            newMessage(\`\${user.username} initialized\`);
          });

          //etc...

          setTimeout(() => chatRoom.initialized(), 5000);
        `}
        </pre>
        <p>
        {`For the backend, things have been moved around a little. The user now gets created in onClientAccepted, and the 'USER_JOINED' has been moved to the new onClientAccepted hook, while being replaced with 'USER_INITIALIZED'.`}
        </p>
        <pre className="prettyprint">
        {`
          initClient(client){
            super.initClient(client); // Must always call super for this hook

            const user = this._users.get(client.id);
            if(!user)
              return this.leave(client);

            user.status = 'ONLINE';

            this.addListener(client, 'SEND_MSG', msg => {
              this.broadcast('USER_MSG', {username: client.id, text: msg});
            });

            this.broadcast('USER_INITIALIZED', this._users.get(client.id));
            this.emit(client, 'INIT', [...this._users.values()]); // Convert to array of user objects since Map objects cannot be converted to JSON
          }

          onClientAccepted(client){
            super.onClientAccepted(client); // Always call super for this hook

            if(!client.id)
              return console.log('Cannot create client with empty id');

            const newUser = {username: client.id, status: 'INITIALIZING'};
            this._users.set(client.id, newUser);
            this.broadcast('USER_JOINED', newUser);
          }`}
          </pre>

        <br/>
        <h4><b>Sample 5: Multiple rooms of the same type</b></h4>
        <p>
        {`Sample 5 demonstrates that you can easily join multiple rooms of the same type without having to worry about conflicting events on the server or client thanks to the way the rooms on the client/server precede events with an agreed unique ID behind the scenes. Here, the backend code has been changed to require logging in before joining a room, which no longer requires POST data to be sent in the join rooms' request, and we now have 4 chat-rooms, and require a parameter ID for the room you wish to join for the /chatroom POST endpoint.`}
        </p>
        <pre className="prettyprint">
        {`
          const chatRooms = [];
          for(let i = 0; i < 4; ++i)
            chatRooms.push(new ChatRoom());

          /*
          *  API
          */
          const namesInUse = new Map();

          // Simple auth-free login just to be able to set a session name
          app.post('/login', (req, res) => {
            const username = req.body.username;
            if(!username || (namesInUse.get(username) && namesInUse.get(username) !== req.sessionID))
              return res.sendStatus(400);
            req.session.username = username;
            namesInUse.set(username, req.sessionID);
            res.sendStatus(200);
          });

          app.post('/logout', (req, res) => {
            namesInUse.delete(req.session.username);
            req.session.username = null;
            res.sendStatus(200);
          });

          //Same as before, but with a url parameter for the room we wish to join
          app.post('/chatroom/:roomId', (req, res) => {
            const roomId = req.params.roomId;
            if(!roomId)
              return res.json({success:false, reason:'Room Id not provided'});
            if(!req.session.username)
              return res.json({success: false, reason:'Username not provided'});
            if(isNaN(roomId) || (roomId < 0 || roomId > 3))
              return res.json({success: false, reason: 'Invalid Room ID'});

            const result = chatRooms[roomId].join({cookie: req.headers.cookie, id: req.session.username});
            res.json(result);
          });`}
        </pre>
        <p>
        {`For the client, when you login now, you are presented with 4 rooms which you can join. The code for the client is mostly the same apart from it has been factored into its own class (in `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/sample-5/client/chat-room.js" target="_blank">chat-room.js</a>{`), with the constructor taking an integer for the room number and there is a new renderJoinBtn function so each room can have its own join button. Normally web components should be used here, but the spec is too unstable at the moment, and using babel or React isn't worth it for such a small sample, so we just use a class which manipulates the DOM when it is constructed.`}
        </p>
        <pre className="prettyprint">
        {`
          const chatRooms = [];
          for(let i = 0; i <= 3; ++i)
            chatRooms.push(new ChatRoom(i));`}
        </pre>
        <br/>
        <h4><b>Sample 6: Everything together</b></h4>
        <p>
        {`Sample 6 combines everything from the previous samples. The disconnect/reconnect functionality is more interesting too, since if you disconnect and only rejoin a single room, you can still be booted from the other rooms if you don't join back in time. Also the onJoinRequest is used to refuse permission to join a room if you're already a member of another 3. Upon attempting to join a 4th, you will be refused permission and a message will be printed to the developer console stating this.`}
        </p>
      </section>
    );
  }
}
