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
      <section>
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
        {`On the client side the part to take notice of is in the login() function. The rest is setup, or code to manipulate HTML/CSS.`}
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
          {`This is the API endpoint which chatRoom.join('/chatroom') posts to in the client sample, and is where permission is requested to join the room. The `} <a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonjoinrequestclient-userinfo" target="_blank">permission hook</a>{` is demonstrated in sample 3, but if you do not implement it in your subclass, then permission will always be granted to join. Once permission to join has been granted, the client is added to the room in an uninitialized state and will not yet receive broadcasted messages. A useful hook `}<a href="https://github.com/Nodeocrat/room-samples/blob/master/api-docs.md#hook-roomonclientacceptedclient" target="_blank">onClientAccepted</a>{` is called at this time too, demonstrated in sample 4.`}
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
        {``}
        </p>

        <br/>
        <h4><b>Sample 4: Initialization hook</b></h4>
        <p>
        {`Example of 'initializing...'; e.g. when to use 'onClientAccepted' ... explain you could also use this to change state of number of users in room and other things which could change if other users are accepted, in order to avoid conflicts of users joining at the same time. Make an explanation of this in the article and reference this sample. Explain at this point that you cannot assume there is an active websocket connection, so do not emit any events, or register for broadcasting. You may register event listeners though, but the main purpose is for informing people of another user joining, and avoiding conflicts of users joining around the same time.`}
        </p>

        <br/>
        <h4><b>Sample 5: Multiple rooms of the same type</b></h4>
        <p>
        {`a chat room which allows multi-login of clients of the same user & lock the room into a custom element? demonstrates that you can easily join multiple rooms of the same type without havint to worry about conflicting events on the server or client side thanks to the way the rooms on the client/server precede events with an agreed unique ID behind the scenes.`}
        </p>

        <br/>
        <h4><b>Sample 6: Everything together</b></h4>
        <p>
        {`balablae everythign in previous samples but the reconnect functionality is more interesting here.`}
        </p>
      </section>
    );
  }
}
