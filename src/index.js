import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }
if (process.env.NODE_ENV === 'production') {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.text = "window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {}";
  document.querySelector("head").append(s);
}

ReactDOM.render(<App/>, document.getElementById('root'));