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

import {apiPrefix} from '@global/SiteConfig';

export default class Ajax {
  static get(options){
    options.method = "GET";
    this.sendReq(options);
  }
  static post(options){
    options.method = "POST";
    this.sendReq(options);
  }
  static sendReq(options){
    if(!options.url)
      return console.error("url option required in ajax call");
    if(!options.method)
      options.method = 'POST';

    //TODO check if the options.url property is a request to an external domain
    //Regex.
    options.url = apiPrefix + options.url;

    let resFormat = null;
    if(options.response)
      resFormat = options.response.toUpperCase();
    else
      resFormat = 'JSON';


    const xhr = new XMLHttpRequest();
    xhr.open(options.method.toUpperCase(), options.url);

    const rawSendData = options.data;
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
              if(options.error)
                return options.error({error: e, xhr: xhr, response: xhr.responseText});
            }
          } else if (resFormat === "TEXT" || resFormat === "RAW"){
            response = xhr.responseText;
          } else {
            //Unrecognised desired format
            if(options.error)
              return options.error({error: "Unrecognised response format", xhr: xhr, response: xhr.responseText});
          }
          if(options.success)
            options.success(response);
        } else {
          if(options.error)
            options.error({error: xhr.status, xhr: xhr, response: null});
        }
      }
    }
  }
};
