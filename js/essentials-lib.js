
// options:
// type: request type (POST, GET, etc)
// url: url to make request to
// data: send data
// success: a callback function which is given the response as an argument
// response: expected response format... a shortcut for converting response format
// error: a callback function which will be called if there is an error, with a single argument with details of the error

// Example usage:
// ajax({
//   type: 'POST',
//   url: '/account/update',
//   data: {key1: val1, key2, val2},
//   success: function(response){
//    //custom code...
//   }
// });
const nc = {

  ajax: (config) => {
    if(!config.url)
      return console.error("url option required in ajax call");
    if(!config.type)
      config.type = 'post';

    let resFormat = null;
    if(config.response)
      resFormat = config.response.toUpperCase();
    else
      resFormat = 'JSON';


    const xhr = new XMLHttpRequest();
    xhr.open(config.type.toUpperCase(), config.url);

    const rawSendData = config.data;
    if(rawSendData){
      let sendData;
      try {
        sendData = JSON.stringify(rawSendData);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      } catch (e) {
        sendData = rawSendData;
      } finally {
        xhr.send(sendData);
      }
    } else {
      xhr.send();
    }

    xhr.onreadystatechange = function() {
      const DONE = 4; // readyState 4 means the request is done
      const OK = 200;
      if (xhr.readyState === DONE) {
        if (xhr.status === OK){
          let response = null;
          if(!xhr.responseText){
            //Intentionally blank
          } else if(resFormat === "JSON"){
            try{
              response = JSON.parse(xhr.responseText);
            } catch (e){
              if(config.error)
                return config.error({error: e, xhr: xhr, response: xhr.responseText});
            }
          } else if (resFormat === "TEXT" || resFormat === "RAW"){
            response = xhr.responseText;
          } else {
            //Unrecognised desired format
            if(config.error)
              return config.error({error: "Unrecognised response format", xhr: xhr, response: xhr.responseText});
          }
          if(config.success)
            config.success(response);
        } else {
          if(config.error)
            config.error({error: xhr.status, xhr: xhr, response: null});
        }
      }
    }
  },

  statusMsg: (inputMsgs, success) => {
    let msgs = "";
    if(Array.isArray(inputMsgs))
      msgs = inputMsgs;
    else if (typeof inputMsgs === 'string' || inputMsgs instanceof String)
      msgs = [inputMsgs];
    else
      msgs = "Unspecified error";

    let innerHTML = "";
    msgs.forEach((msg, index) => {
      if(index !== 0)
        innerHTML += '<br>';
      innerHTML +=
        '<span class="glyphicon glyphicon-' + (success ? "ok" : "exclamation") + '-sign" ' +
        'aria-hidden="true"></span>' +
        '<span class="sr-only">' + (success ? 'Success: ' : 'Error: ') + '</span>' +
        ' ' + msg;
    });
    const line = document.createElement('div');
    line.innerHTML = innerHTML;
    line.className = "alert alert-" + (success ? "success" : "danger");
    line.setAttribute("role", "alert");
    return line;
  },
  // displayStatus returns false if the errors array is non-empty present. True otherwise.
  displayStatus: (jsonResponse, element) => {
    let displayEle = null;
    let displayMsg = null;
    //If displayElement if of type string, then assume it's a query Selector (note: multiple elements not supported yet)
    if (typeof element === 'string' || element instanceof String)
      displayEle = document.querySelector(element);
    else
      displayEle = element;

    if(typeof jsonResponse === 'string' || jsonResponse instanceof String) // Then assume it is a success status msg
      displayMsg = {"actions": jsonResponse};
    else if (typeof jsonResponse === 'object')
      displayMsg = jsonResponse;

    if(!displayEle || !displayMsg)
      return null;

    if(displayMsg.actions && displayMsg.actions.length > 0){
      const actions = displayMsg.actions;
      displayEle.innerHTML = '';
      displayEle.appendChild(document.createElement('br'));
      displayEle.appendChild(nc.statusMsg(actions, true));
    } else { // No actions have taken place.
      if(displayMsg.errors && displayMsg.errors.length > 0){
        const errors = displayMsg.errors;
        displayEle.innerHTML = '';
        displayEle.appendChild(document.createElement('br'));
        displayEle.appendChild(nc.statusMsg(errors, false));
        return false;
      }
    }
    return true;
  },

  replaceBodyWithMsg: (msg) => {
    nc.displayStatus(msg, '#body-container');
  },

  onload: function(fn){
    if(!this.onloadTaskList)
      this.onloadTaskList = [];
    this.onloadTaskList.push(fn);
  }
};

window.onload = function(){
  if(nc.onloadTaskList){
    nc.onloadTaskList.forEach((fn)=>{
      fn();
    });
  }
}

/*window.customElements.define('nc-center', class extends HTMLElement {
  connectedCallback() {
    const outerDiv = document.createElement('div');
    outerDiv.classList = this.classList;
    this.classList = "";
    const innerDiv = document.createElement('div');
    outerDiv.style = "width: 100%;";
    innerDiv.style = "display: table; margin: 0 auto;"
    outerDiv.appendChild(innerDiv);
    for(let i = 0; i < this.childNodes.length; i++){
      if(!this.childNodes[i] instanceof Node){
        this.removeChild(this.childNodes[i]);
        innerDiv.appendChild(this.childNodes[i]);
      } else {
        const otherEle = this.childNodes[i];
        innerDiv.innerHTML = this.innerHTML;
        this.innerHTML = '';

        // Not yet able to manage elements which mix nodes and non-nodes.
        //TODO change it so the nc-center iterates through each element and
        // wraps them all in outer/inner divs. If one wants elements to be on same
        // line then it is up to them to make sure they sare spanned together
        break;
      }
    }
    this.appendChild(outerDiv);
  }
});*/
