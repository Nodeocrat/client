import {apiPrefix} from '@global/SiteConfig';
import ScriptLoader from '@services/ScriptLoader';

const scriptUrl = "https://cdn.socket.io/socket.io-1.2.0.js";

class SocketHandler {
  constructor(){
    this.delayedTasks = [];
    this._socket = null;
  }

  connect(){
    if(!this.isLoaded()){
      ScriptLoader(
        [scriptUrl],
        () => {
          this._socket = window.io({path: `${apiPrefix}/socket.io`});
          while(this.delayedTasks.length > 0)
            this.delayedTasks.shift()();
        }
      );
    }
  }

  isLoaded(){
    if(window.io && this._socket)
      return true;
    else
      return false
  }

  on(event, callback){
    if(this.isLoaded())
      this._socket.on(event, callback);
    else
      this.delayedTasks.push(() => this._socket.on(event, callback));
  }

  emit(event, ...params){
    if(this.isLoaded())
      this._socket.emit(event, ...params);
    else
      this.delayedTasks.push(() => this._socket.emit(event, ...params));
  }

  disconnect(){
    if(this.isLoaded())
      this._socket.disconnect();
    else
      this.delayedTasks.push(() => this._socket.disconnect());
  }

}

const socketHandler = new SocketHandler();
export default socketHandler;
