var Trominos;
(function (Trominos) {
    function indexOfFirstTruthy(arr) {
        for (var k = 0; k < arr.length; k++) {
            if (arr[k])
                return k;
        }
        return -1;
    }
    var TreeGrid = (function () {
        function TreeGrid(size, x, y) {
            this.size = size;
            this.root = [];
            this.items = [];
            this._setCell(this.root, this.size, x, y);
        }
        TreeGrid.prototype._setCell = function (node, size, x, y) {
            var half = Math.floor(size / 2), index = 0;
            if (x >= half) {
                index += 1;
                x -= half;
            }
            if (y >= half) {
                index = 3 - index;
                y -= half;
            }
            if (size > 2) {
                if (!node[index])
                    node[index] = [];
                this._setCell(node[index], half, x, y);
            }
            else
                node[index] = true;
        };
        TreeGrid.prototype._fill = function (node, size, left, top) {
            var _this = this;
            var index = indexOfFirstTruthy(node), half = Math.floor(size / 2);
            TreeGrid.offsets.slice(index, index + 3).forEach(function (delta) {
                _this._setCell(node, size, half + delta[0], half + delta[1]);
            });
            this.items.push([left + half, top + half, index]);
            if (size > 2) {
                this._fill(node[0], half, left, top);
                this._fill(node[1], half, left + half, top);
                this._fill(node[2], half, left + half, top + half);
                this._fill(node[3], half, left, top + half);
            }
        };
        TreeGrid.prototype.fill = function () {
            this._fill(this.root, this.size, 0, 0);
        };
        TreeGrid.prototype.debug = function () {
            //console.log(this.root);
            console.log(this.items);
        };
        TreeGrid.prototype.getItems = function () {
            return this.items;
        };
        TreeGrid.offsets = [[0, -1], [0, 0], [-1, 0], [-1, -1], [0, -1], [0, 0]];
        return TreeGrid;
    })();
    Trominos.TreeGrid = TreeGrid;
})(Trominos || (Trominos = {}));
/// <reference path="typings/react/react-global.d.ts" />
/// <reference path="treegrid.ts" />
function trominoItems(size, x, y) {
    var grid = new Trominos.TreeGrid(size, x, y);
    grid.fill();
    return grid.getItems();
}
var TrominoBox = React.createClass({
    getInitialState: function () {
        return { x: 0, y: 0, buttonDown: false };
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return nextState.buttonDown && (nextState.x !== this.state.x || nextState.y !== this.state.y);
    },
    checkMouse: function (e) {
        var svg = this.getDOMNode(), rect = svg.getBoundingClientRect(), cellX = Math.floor(this.props.size * (e.clientX - rect.left) / rect.width), cellY = Math.floor(this.props.size * (e.clientY - rect.top) / rect.height);
        this.setState({ x: cellX, y: cellY });
    },
    handleMouseButtons: function (e) {
        var leftDown = (e.buttons & 1) !== 0;
        this.setState({ buttonDown: leftDown });
        if (leftDown)
            this.checkMouse(e);
    },
    handleMouseMove: function (e) {
        if (this.state.buttonDown)
            this.checkMouse(e);
    },
    render: function () {
        var strokeWidth = 0.1, boxwidth = this.props.size + 2 * strokeWidth, viewBox = [-strokeWidth, -strokeWidth, boxwidth, boxwidth].join(' '), items = trominoItems(this.props.size, this.state.x, this.state.y);
        return (React.createElement("svg", {"viewBox": viewBox, "onMouseDown": this.handleMouseButtons, "onMouseUp": this.handleMouseButtons, "onMouseMove": this.handleMouseMove}, React.createElement("defs", null, React.createElement("path", {"id": "tromino0", d: "M0 0L0 -1L1 -1L1 1L-1 1L-1 0Z"}), React.createElement("path", {"id": "tromino1", d: "M0 0L1 0L1 1L-1 1L-1 -1L0 -1Z"}), React.createElement("path", {"id": "tromino2", d: "M0 0L0 1L-1 1L-1 -1L1 -1L1 0Z"}), React.createElement("path", {"id": "tromino3", d: "M0 0L-1 0L-1 -1L1 -1L1 1L0 1Z"})), React.createElement("g", {"stroke": "#000", "strokeWidth": strokeWidth, "fill": "#bbb"}, items.map(function (item, idx) { return React.createElement("use", {
            x: item[0],
            y: item[1],
            xlinkHref: "#tromino" + item[2],
            key: idx
        }); }))));
    }
});
React.render(React.createElement(TrominoBox, {"size": 32}), document.getElementById('content'));
