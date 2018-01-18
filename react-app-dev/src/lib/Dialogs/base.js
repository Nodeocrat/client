import React from 'react';
import ReactDOM from 'react-dom';

export default class Dialog {

    constructor(component, root){
        this._component = component;
        this._root = root || null;
        this._close = this._close.bind(this);
        this._containerEle = null;
        this.show = this.show.bind(this);
        this._render = this._render.bind(this);

        //Remove
        this._ops = null;
    }

    _unrender(){
      ReactDOM.unmountComponentAtNode(this._containerEle);
      this._root.removeChild(this._containerEle);
      this._containerEle = null;
    }

    _close(){
        if(this._containerEle){
            window.removeEventListener("resize", this._render);
            this._unrender();
        } else {
            console.log('ERROR: Attempted to close popup on null dialog container');
        }
    }

    show(ops = {}){

        if(!this._containerEle){
          this._ops = ops;
          this._root = ops.root || this._root || document.body;

          if (typeof this._root === 'string' || this._root instanceof String)
              this._root = document.getElementById(this._root);

          window.addEventListener("resize", this._render);
          this._render();
        }
    }

    _render(){
      const dialogStyle = {
        textAlign: 'center',
        alignSelf: 'center'
      };

      // Error thrown if react component var names are not capitalized
      const Component = this._component;

      if(this._containerEle)
        this._unrender();


      this._containerEle = document.createElement('div');
      this._containerEle.style = `z-index: 1000;
                                  position: absolute;
                                  left: 0;
                                  top: 0;
                                  width: ${this._root.clientWidth}px;
                                  height: ${this._root.clientHeight}px;
                                  background-color: ${this._ops.overlay === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)'};
                                  display: flex;
                                  justify-content: center;`;

      this._root.appendChild(this._containerEle);

      ReactDOM.render(
          <span style={dialogStyle}>
            <Component {...this._ops.props} />
          </span>,
          this._containerEle);
    }
};
