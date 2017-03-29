import React from 'react';
import ScriptLoader from '@services/ScriptLoader';
import StatusText from '@lib/StatusText';

export default class GameBlog extends React.Component {
  constructor(props){
    super(props);

    ScriptLoader(["https://cdn.socket.io/socket.io-1.2.0.js",
                  "/drawscript.min.js"]);

    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.state = {
      visiblePlayBtn: true,
      error: null
    }
  }

  handleOnPlay(){
    const username = this.props.profile.username;
    const picUrl = this.props.profile.photoUrl;

    if(!username || !picUrl)
      return this.setState({
        error: "You must be logged in to play"
      });

    window.startWebsocketSession(username, picUrl);

    this.setState({
      error: null,
      visiblePlayBtn: false
    });
  }

  render(){

    const btnDisplay = this.state.visiblePlayBtn ? "block" : "none";
    return (
      <div>

        <button onClick={this.handleOnPlay} style={{display: btnDisplay}}>Play</button>
        {this.state.error ? <StatusText type="error" text={this.state.error}/> : null}
        <div id="game_container">
          <canvas style={{borderStyle: 'solid', borderWidth: 5 + 'px'}} id="canvas" width="800" height="800"></canvas>
          <div id="game_chat" style={{display: 'inline-block'}}>
            <ul id="messages"></ul>
            <form id="chat_form" action="">
              <input id="m" autoComplete="off"/><button>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

};
