import {withRouter} from 'react-router-dom';

export default {
  parseQuery: (qstr) => {
    var query = {};
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[window.decodeURIComponent(b[0])] = window.decodeURIComponent(b[1] || '');
    }
    return query;
  },
  chopOffLast: (url) => {
    return url.substring(0, url.lastIndexOf('/'));
  },
  currentUrl: (props) => {
    return props.history.location.pathname;
  }
}
