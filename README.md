# Diqueue
A simple performant priority queue which can pop AND shift.

---

* **[Install](#install)**
* **[Usage](#usage)**
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

var qObj = new DiQueue([{ name: 'A', lag: 54 }, { name: 'B', lag: 22 }, { name: 'C' lag: 37 }], (a, b) => {
  return a.lag > b.lag ? a : b;
});

qObj.pop() // returns object { name: 'B', lag: 22 }
qObj.shift() // returns object { name: 'A', lag: 54 }
```

## License

MIT © 2017, Muaz Siddiqui

Inspired by [js-priority-queue](https://github.com/adamhooper/js-priority-queue)
by [Adam Hooper](https://github.com/adamhooper) and [tinyqueue](https://github.com/mourner/tinyqueue) by [Vladimir Agafonkin](https://github.com/mourner).

