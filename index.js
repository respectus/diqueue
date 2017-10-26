const DEFAULT_COMPARE = (a, b) => {
    return a > b ? a : b;
};

const DEFAULT_ID_KEY = 'id';

/*
 *  A minimal implmentation of a priority q inspired by js-priority-queue by Adam Hooper.
 */
class DiQueue {
    constructor(data, compareFn, identityKey) {
        this.data = data || [];
        this.length = this.data.length;
        this.compareFn = compareFn || DEFAULT_COMPARE;
        this.identityKey = identityKey || DEFAULT_ID_KEY;

        if (this.length > 0) {
            for (var i = (this.length >> 1) - 1; i >= 0; i--) {
                this._down(i);
            }
        }
    }

    _down(index) {
        var halfLength = this.length >> 1;
        var item = this.data[index];
        var right, left, best;
        while (index < halfLength) {
            left = (index << 1) + 1;
            right = left + 1;
            best = this.data[left];

            if (right < this.length && this.compareFn(this.data[right], best) === best) {
                left = right;
                best = this.data[right];
            }
            if (this.compareFn(best, item) === best) break;

            this.data[index] = best;
            index = left;
        }

        this.data[index] = item;
    }

    _findElementIndex(value) {
        var l = this.data.length;
        for (var i = 0; i < l; i++) {
            if (this.data[i][this.identityKey] === value) {
                return i;
            }
        }
        return -1;
    }

    _up(index) {
        var item = this.data[index];
        var parent, current;
        while (index > 0) {
            parent = (index - 1) >> 1;
            current = this.data[parent];
            if (this.compareFn(item, current) === item) break;
            this.data[index] = current;
            index = parent;
        }

        this.data[index] = item;
    }

    peekPop() { return this.data[0]; }

    peekShift() { return this.data.reduce(this.compareFn); }

    pop() {
        if (!this.length) return null;

        var first = this.data[0];
        this.length--;

        if (this.length > 0) {
            this.data[0] = this.data[this.length];
            this._down(0);
        }
        this.data.pop();

        return first;
    }

    push(data) {
        this.data.push(data);
        this._up(this.length);
        this.length++;
    }

    shift() {
        if (!this.length) return null;

        var last = this.data.reduce(this.compareFn);
        this.length--;

        if (this.length > 0) this.data.splice(this.data.indexOf(last), 1);

        return last;
    }

    update(idValue, updatedItem) {
        var index = this._findElementIndex(idValue);
        if (index === -1) { this.push(updatedItem); return; }
        var prevItem = this.data[index];
        this.data[index] = updatedItem;
        if (this.compareFn(prevItem, updatedItem) === updatedItem) {
            this._up(index);
        } else {
            this._down(index);
        }
    }
}

module.exports = DiQueue;
