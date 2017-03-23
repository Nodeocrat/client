//Author: Ashley Phillips
//Date: ~End of 2016
/* Example usage:
import Ajax from '@services/Ajax';
Ajax.post({
  url: '/register',
  data: regObj,
  response: 'JSON',
  success: (response) => {
    if(response.errors && response.errors.length > 0){
      nc.displayStatus(response, '#status');
      grecaptcha.reset();
    } else if (response.actions && response.actions.length > 0){
      nc.replaceBodyWithMsg(response);
    }
  },
  error: (info) => {
    if(info.xhr.status !== 200)
      return console.error("Ajax request error on login page: " + info.error);
  }
});
*/

import SiteConfig from '@global/SiteConfig';

export default class Ajax {
  static get(config){
    config.method = "GET";
    this._sendReq(config);
  }
  static post(config){
    config.method = "POST";
    this._sendReq(config);
  }
  static _sendReq(config){
    if(!config.url)
      return console.error("url option required in ajax call");
    if(!config.method)
      config.method = 'POST';

    //TODO check if the config.url property is a request to an external domain
    //Regex.
    config.url = SiteConfig.apiPrefix + config.url;

    let resFormat = null;
    if(config.response)
      resFormat = config.response.toUpperCase();
    else
      resFormat = 'JSON';


    const xhr = new XMLHttpRequest();
    xhr.open(config.method.toUpperCase(), config.url);

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
  }
};
