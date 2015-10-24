import make_element from './app';

(function (document, React, ReactDOM) {

    let element = make_element(React, ReactDOM);

    ReactDOM.render(element, document.getElementById('content'));

})(document, React, ReactDOM);
