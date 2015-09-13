// <reference path="typings/react/react.d.ts" />
//import React = require('react');
/// <reference path="typings/react/react-global.d.ts" />
/// <reference path="treegrid.ts" />

interface TrimonoProps {
    size: string;
};

var TrimonoBox = React.createClass<TrimonoProps, any>({
    getInitialState: function() {
        return {point: [0, 0]};
    },
    render: function() {
        var size = parseInt(this.props.size);
        var strokeWidth = 0.1;
        var boxwidth = size + 2 * strokeWidth;
        var viewBox = [-strokeWidth, -strokeWidth, boxwidth, boxwidth].join(' ');
        var elements = (
            <g stroke="#000" strokeWidth={strokeWidth} fill="#bbb">
            </g>
        );
        var svg = React.createElement("svg",
            {
                viewBox: viewBox,
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink"
            },
            <defs>
                <path id="trimono0" d="M0 0L0 -1L1 -1L1 1L-1 1L-1 0Z" />
                <path id="trimono1" d="M0 0L1 0L1 1L-1 1L-1 -1L0 -1Z" />
                <path id="trimono2" d="M0 0L0 1L-1 1L-1 -1L1 -1L1 0Z" />
                <path id="trimono3" d="M0 0L-1 0L-1 -1L1 -1L1 1L0 1Z" />
            </defs>,
            elements
        );
        console.log(svg);
        console.log(React.renderToStaticMarkup(svg));
        return svg;
    }
});

React.render(
  <TrimonoBox size="32" />,
  document.getElementById('content')
);
