import make_element from './trominobox';
import React from 'react';
import ReactDOM from 'react-dom';

const element = make_element(React, ReactDOM);

ReactDOM.render(element, document.getElementById('tromino-fig'));
