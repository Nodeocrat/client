import React from 'react';
import ScriptLoader from '@services/ScriptLoader';

export default class RoomProj extends React.Component {
  render(){
    return (
      <section>
        <h2 style={{textAlign: 'center'}}><b>Room pattern</b></h2>

        <h4><b>Summary</b></h4>
        <p>
        {`The Room package is designed to be used whenever there is a collection of clients communicating with each other via a central server. Usually there's a lot of setup involved with creating such rooms including setting up the websocket server, working out when the client is initialized and ready to receive the initial rooms state, and cleaning up resources such as event listeners, and if you want to implement more advanced functionality such as disconnect/reconnect management, then things can get messy. This room package is designed to greatly simplify all of this.`}
        </p>

        <h4><b>Socket Handler</b></h4>
        <p>
        {`The socket handler could (and will) be its own module. It is a wrapper for the raw websocket and handles the disconnect/reconnect functionality with pings/pongs, and emits 'disconnect' upon disconnecting, in which case the client side SocketHandler automatically kicks into reconnect mode, and the SocketHandler will emit 'reconnect' upon reconnecting. It also follows socket.io's message sending style of emitting an event with a payload. You may be wondering why I haven't just used socket.io instead, for which there are many reasons beyond the scope of this article, but among them, are its performance and size. The client-side code for the socket handler can be found `}<a target="_blank" href="https://github.com/Nodeocrat/client-room/blob/master/Sockets.js">here</a> and the server-side code <a target="_blank" href="https://github.com/Nodeocrat/server-room/blob/master/ClientPool/SocketHandler.js">here</a>. The main difference between the two is the implemention of ping/pong functionality on the server, _reconnect method on the client, as well as the clients _enqueue function which is necessary incase messages are sent while the connection is initializing. Other than that they are very similar.
        </p>

        <h4><b>Features</b></h4>
        <p>
        {`All of the features are demonstrated in [samples]. The server side module exports a class, 'Room', which is intended to be extended from, and exposes hooks, while the client side module is more simple and may or may not be extended from. There are 5 samples which walk you through how to use the room package to build a chat-room, with increasingly complex functionality, and how easy the Room package makes it. For a basic chat room example with minimal features, see [Sample 1]. [Sample 2] demonstrates how you can extend sample 1 very easily to add reconnect functionality. Sample 3 extends sample 1 by showing how you can grant/deny permission for users joining a room. Sample 4 demonstrates how you can use a hook on the server side for the interval between when a client is accepted, and when they are initialized, and a usage example of why you may want to do this. [Sample 5] demonstrates how you can join multiple of the same type of room at the same time, without any conflicts. The 'ultimate' sample, [Sample 6] puts together all of the previous samples to demonstrate you can use all of the features together. Note the reconnect functionality also gets more interesting in this sample. Read more in the [sample 6 description].`}

        {`<<<The server side Room module stores clients by session ID, which has a natural side effect of being able to have multiple clients over different devices logging into the same user. If you do not want this, permission can be denied via the permission hook (see sample 3.>>>`}

        {`<<<DESCRIPTION OF CLIENT POOL FEATURE>>>.`}
        </p>

        <h4><b>Future</b></h4>
        {`Currently the Room package only sends messages via a central server and does not work over peer to peer connections. I will be using WebRTC to make this possible in the future.`}
      </section>
    );
  }
}
