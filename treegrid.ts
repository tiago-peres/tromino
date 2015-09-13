module Trimonos {

    function indexOfFirstTruthy(arr: any[]) {
        for (var k = 0; k < arr.length; k++) {
            if (arr[k])
                return k;
        }
        return -1;
    }

    export class TreeGrid {
        size: number;
        root: any;
        items: any;
        static offsets = [[0, -1], [0, 0], [-1, 0], [-1, -1], [0, -1], [0, 0]];
        constructor(size, x, y) {
            this.size = size;
            this.root = [];
            this.items = [];
            this._setCell(this.root, this.size, x, y);
        }
        _setCell(node, size, x, y) {
            var half = Math.floor(size/2), index = 0;
            if (x >= half) { index += 1; x -= half; }
            if (y >= half) { index = 3 - index; y -= half; }
            if (size > 2) {
                if (!node[index])
                    node[index] = [];
                this._setCell(node[index], half, x, y)
            } else
                node[index] = true;
        }
        _fill(node, size, left, top) {
            var index = indexOfFirstTruthy(node), half = Math.floor(size/2);
            TreeGrid.offsets.slice(index, index + 3).forEach((delta) => {
                this._setCell(node, size, half + delta[0], half + delta[1]);
            });
            this.items.push([left + half, top + half, index]);
            if (size > 2) {
                this._fill(node[0], half, left,        top       );
                this._fill(node[1], half, left + half, top       );
                this._fill(node[2], half, left + half, top + half);
                this._fill(node[3], half, left,        top + half);
            }
        }
        fill() {
            this._fill(this.root, this.size, 0, 0);
        }
        debug() {
            //console.log(this.root);
            console.log(this.items);
        }
        getItems() {
            return this.items;
        }
        toSVG() {
            var strokewidth = 0.1;
            var boxwidth = this.size + 2*strokewidth;
            var res = '<svg viewBox="-0.1 -0.1 ' + boxwidth + ' ' + boxwidth + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
            res += '<defs>';
            res += '<path id="trimono0" d="M0 0L0 -1L1 -1L1 1L-1 1L-1 0Z" />';
            res += '<path id="trimono1" d="M0 0L1 0L1 1L-1 1L-1 -1L0 -1Z" />';
            res += '<path id="trimono2" d="M0 0L0 1L-1 1L-1 -1L1 -1L1 0Z" />';
            res += '<path id="trimono3" d="M0 0L-1 0L-1 -1L1 -1L1 1L0 1Z" />';
            res += '</defs>';
            res += '<g stroke="#000" stroke-width="' + strokewidth + '" fill="#bbb">';
            this.items.forEach((item) => {
                res += '<use x="' + item[0] + '" y="' + item[1] + '" xlink:href="#trimono' + item[2] + '" />';
            });
            res += '</g>';
            res += '</svg>';
            return res;
        }
    }
}
