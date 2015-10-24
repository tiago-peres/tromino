import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import make_element from './app';

let element = make_element(React, ReactDOM);

console.log(ReactDOMServer.renderToStaticMarkup(element));
