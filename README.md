# Diqueue
A performant updatable priority queue which can pop AND shift.

---

* **[Install](#install)**
* **[Usage](#usage)**
* **[API](#api)**
* **[License](#license)**


## Install

```javascript
$ npm install --save diqueue
```

## Usage
```javascript
// An empty priority queue
var q = new DiQueue();

q.push(88);
q.push(12);
q.push(23);

q.pop(); // returns 12
q.shift(); // returns 88

// Initialized with data
var qData = new DiQueue([88, 12, 23, 45, 56]);

qData.length; // returns 5
qData.pop(); // returns 12
qData.length; // returns 4
qData.shift(); // returns 88
qData.length; // returns 3
qData.peekPop(); // returns 23
qData.length; // returns 3 (unchanged)
qData.peekShift(); // returns 56
qData.length; // returns 3 (unchanged)

// Initialized with custom comparator
var qComp = new DiQueue([88, 12, 23, 45, 56], (a, b) => {
  return a < b ? a : b;
});

qComp.pop(); // returns 88
qComp.shift(); // returns 12

var qObj = new DiQueue([{ name: 'A', lag: 54 }, { name: 'B', lag: 22 }, { name: 'C', lag: 37 }], (a, b) => {
  return a.lag > b.lag ? a : b;
});

qObj.pop() // returns object { name: 'B', lag: 22 }
qObj.shift() // returns object { name: 'A', lag: 54 }

var qObj2 = new DiQueue([{ name: 'A', lag: 54 }, { name: 'B', lag: 22 }, { name: 'C', lag: 37 }], (a, b) => {
  return a.lag > b.lag ? a : b;
});

qObj.update('A', { name: 'A', lag: 12 });

qObj.pop(); // returns object { name: 'A', lag: 12 }
qObj.pop(); // returns object { name: 'B', lag: 22 }
qObj.pop(); // returns object { name: 'C', lag: 37 }
```

## API

### constructor(data, compareFn, identityKey)
---

#### data
_**Optional**_
Type: `Array`
Default: `[]`

The array of items to insert into the priority queue.

#### compareFn
_**Optional**_
Type: `Function`
Default: `(a, b) => {
    return a > b ? a : b;
}`

A comparator function to order the elements in the queue.

#### identityKey
_**Optional**_
Type: `String`
Default: `id`

For an updatable queue, the key which is used to identify the object to update.

### push(data)
---

#### data
_**Required**_
Type: `Object`

The item to insert into the priority queue.

### update(idValue, updatedItem)
---

#### idValue
_**Required**_
Type: `Any`

The value used to match the object, which will be updated.

#### updatedItem
_**Required**_
Type: `Object`

The new item which will replace the previous item that matched the given idValue.

## License

MIT © 2017, Muaz Siddiqui

*Inspired by:*
[js-priority-queue](https://github.com/adamhooper/js-priority-queue) by [Adam Hooper](https://github.com/adamhooper)
[tinyqueue](https://github.com/mourner/tinyqueue) by [Vladimir Agafonkin](https://github.com/mourner)
[updatable-priority-queue](https://github.com/bbecquet/updatable-priority-queue) by [Benjamin Becquet](https://github.com/bbecquet)
