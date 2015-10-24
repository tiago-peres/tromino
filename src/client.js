import make_element from './trominobox';

(function (document, React, ReactDOM) {

    let element = make_element(React, ReactDOM);

    ReactDOM.render(element, document.getElementById('content'));

})(document, React, ReactDOM);
