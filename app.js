(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _trominobox = require('./trominobox');

var _trominobox2 = _interopRequireDefault(_trominobox);

(function (document, React, ReactDOM) {

    var element = (0, _trominobox2['default'])(React, ReactDOM);

    ReactDOM.render(element, document.getElementById('content'));
})(document, React, ReactDOM);
},{"./trominobox":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports["default"] = function (React, ReactDOM) {

    function indexOfFirstTruthy(arr) {
        for (var k = 0; k < arr.length; k++) {
            if (arr[k]) return k;
        }
        return -1;
    }

    var offsets = [[0, -1], [0, 0], [-1, 0], [-1, -1], [0, -1], [0, 0]];

    var TreeGrid = (function () {
        function TreeGrid(size, x, y) {
            _classCallCheck(this, TreeGrid);

            this.size = size;
            this.root = [];
            this.items = [];
            this._setCell(this.root, this.size, x, y);
        }

        _createClass(TreeGrid, [{
            key: "_setCell",
            value: function _setCell(node, size, x, y) {
                var half = Math.floor(size / 2),
                    index = 0;
                if (x >= half) {
                    index += 1;x -= half;
                }
                if (y >= half) {
                    index = 3 - index;y -= half;
                }
                if (size > 2) {
                    if (!node[index]) node[index] = [];
                    this._setCell(node[index], half, x, y);
                } else node[index] = true;
            }
        }, {
            key: "_fill",
            value: function _fill(node, size, left, top) {
                var _this = this;

                var index = indexOfFirstTruthy(node),
                    half = Math.floor(size / 2);
                offsets.slice(index, index + 3).forEach(function (delta) {
                    _this._setCell(node, size, half + delta[0], half + delta[1]);
                });
                this.items.push([left + half, top + half, index]);
                if (size > 2) {
                    this._fill(node[0], half, left, top);
                    this._fill(node[1], half, left + half, top);
                    this._fill(node[2], half, left + half, top + half);
                    this._fill(node[3], half, left, top + half);
                }
            }
        }, {
            key: "fill",
            value: function fill() {
                this._fill(this.root, this.size, 0, 0);
                return this.items;
            }
        }]);

        return TreeGrid;
    })();

    var TrominoBox = React.createClass({
        displayName: "TrominoBox",

        getInitialState: function getInitialState() {
            return { x: this.props.initX, y: this.props.initY, buttonDown: false };
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextState.x !== this.state.x || nextState.y !== this.state.y;
        },
        checkMouse: function checkMouse(e) {
            var svg = ReactDOM.findDOMNode(this),
                rect = svg.getBoundingClientRect(),
                cellX = Math.floor(this.props.size * (e.clientX - rect.left) / rect.width),
                cellY = Math.floor(this.props.size * (e.clientY - rect.top) / rect.height);
            this.setState({ x: cellX, y: cellY });
        },
        handleMouseButtons: function handleMouseButtons(e) {
            var leftDown = (e.buttons & 1) !== 0;
            this.setState({ buttonDown: leftDown });
            if (leftDown) this.checkMouse(e);
        },
        handleMouseMove: function handleMouseMove(e) {
            if (this.state.buttonDown) this.checkMouse(e);
        },
        render: function render() {
            var strokeWidth = 0.1,
                boxwidth = this.props.size + 2 * strokeWidth,
                viewBox = [-strokeWidth, -strokeWidth, boxwidth, boxwidth].join(' '),
                items = new TreeGrid(this.props.size, this.state.x, this.state.y).fill();
            // #47a447
            return React.createElement(
                "svg",
                { viewBox: viewBox, onMouseDown: this.handleMouseButtons,
                    onMouseUp: this.handleMouseButtons,
                    onMouseMove: this.handleMouseMove },
                React.createElement(
                    "defs",
                    null,
                    React.createElement("path", { id: "tromino0", d: "M0 0L0 -1L1 -1L1 1L-1 1L-1 0Z" }),
                    React.createElement("path", { id: "tromino1", d: "M0 0L1 0L1 1L-1 1L-1 -1L0 -1Z" }),
                    React.createElement("path", { id: "tromino2", d: "M0 0L0 1L-1 1L-1 -1L1 -1L1 0Z" }),
                    React.createElement("path", { id: "tromino3", d: "M0 0L-1 0L-1 -1L1 -1L1 1L0 1Z" })
                ),
                React.createElement(
                    "g",
                    { stroke: "#000", strokeWidth: strokeWidth, fill: "#81D4FA" },
                    items.map(function (item, idx) {
                        return React.createElement("use", { x: item[0], y: item[1],
                            xlinkHref: "#tromino" + item[2], key: idx });
                    })
                )
            );
        }
    });

    var element = React.createElement(TrominoBox, { size: 32, initX: 7, initY: 5 });

    return element;
};

module.exports = exports["default"];
},{}]},{},[1])


//# sourceMappingURL=app.js.map
