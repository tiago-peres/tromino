/// <reference path="typings/react/react-global.d.ts" />
/// <reference path="treegrid.ts" />

interface TrominoProps {
    size: number;
}

interface TrominoState {
    x: number;
    y: number;
    buttonDown: boolean;
}

function trominoItems(size: number, x: number, y: number) {
    var grid = new Trominos.TreeGrid(size, x, y);
    grid.fill();
    return grid.getItems();
}

let TrominoBox = React.createClass<TrominoProps, TrominoState>({
    getInitialState: function() {
        return {x: 0, y: 0, buttonDown: false};
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.buttonDown && (nextState.x !== this.state.x || nextState.y !== this.state.y);
    },
    checkMouse: function(e) {
        let svg = this.getDOMNode(),
            rect = svg.getBoundingClientRect(),
            cellX = Math.floor(this.props.size * (e.clientX - rect.left) / rect.width),
            cellY = Math.floor(this.props.size * (e.clientY - rect.top) / rect.height);
        this.setState({x: cellX, y: cellY});
    },
    handleMouseButtons: function(e) {
        let leftDown = (e.buttons & 1) !== 0;
        this.setState({buttonDown: leftDown});
        if (leftDown)
            this.checkMouse(e);
    },
    handleMouseMove: function(e) {
        if (this.state.buttonDown)
            this.checkMouse(e);
    },
    render: function() {
        let strokeWidth = 0.1,
            boxwidth = this.props.size + 2 * strokeWidth,
            viewBox = [-strokeWidth, -strokeWidth, boxwidth, boxwidth].join(' '),
            items = trominoItems(this.props.size, this.state.x, this.state.y);
        return (
            <svg viewBox={viewBox} onMouseDown={this.handleMouseButtons}
             onMouseUp={this.handleMouseButtons}
             onMouseMove={this.handleMouseMove}>
                <defs>
                    <path id="tromino0" d="M0 0L0 -1L1 -1L1 1L-1 1L-1 0Z" />
                    <path id="tromino1" d="M0 0L1 0L1 1L-1 1L-1 -1L0 -1Z" />
                    <path id="tromino2" d="M0 0L0 1L-1 1L-1 -1L1 -1L1 0Z" />
                    <path id="tromino3" d="M0 0L-1 0L-1 -1L1 -1L1 1L0 1Z" />
                </defs>
                <g stroke="#000" strokeWidth={strokeWidth} fill="#bbb">
                    {items.map((item, idx) => React.createElement("use", {
                        x: item[0],
                        y: item[1],
                        xlinkHref: "#tromino" + item[2],
                        key: idx
                    }))}
                </g>
            </svg>
        );
    }
});

React.render(
  <TrominoBox size={32} />,
  document.getElementById('content')
);
