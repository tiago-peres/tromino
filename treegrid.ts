module Trominos {

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
    }
}
