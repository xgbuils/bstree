#bstree
A binary search tree implementation for node and browser.

_________

Install
---------
``` bash
npm install bstree
```

Future Example (Now it does not work because package bstree has not been published)
---------

``` javascript
var BSTree = require('bstree');

var tree = new BSTree();

tree.add(2)
tree.add(3)
tree.add(1)

tree.top() // 3
tree.bottom() // 1

tree.removeTop() //3
tree.top() // 2

tree.remove(1) // 1
tree.removeBottom() // 2

```

Test
---------
``` bash
#required: sudo npm install -g grunt-cli
grunt test
```

________

## #constructor(comparator)
---------

### Parameters:
*  **comparator**:
A `function` that takes two arguments that correspond to tree node values. The return of this function is a boolean. If the value returned is true, the first argument is less than the second argument. If the value returned is false, the two arguments are equal or the second argument is greater than the first argument. Defaults to: `function(a, b) { return a < b }`

###Example:
``` javascript
var BSTree = require('bstree')

var tree = new BSTree(function(a, b) {
    return b > a
})

// or

var otherTree = new BSTree()
```

### Algorithm complexity:
Constant


## #add(element)
--------
Adds the given element from the tree.

### Example
``` javascript
var tree = new BSTree();
tree.add(5)
```
### Algorithm complexity:
In the average case: logarithmic in #length
In the worst case: linear in #length

## #bottom()
--------
Returns the minimum value in the tree.

### Example:
``` javascript
var tree = new BSTree()
;[7,3,10,5,1,6,9,8,2].forEach(tree.add, tree)

console.log(tree.bottom()) // 1
```

### Algorithm complexity:
Constant in #length

## #length
--------
property that indicates the number of elements in tree.
### Example:
``` javascript
var tree = new BSTree()
console.log(tree.length) // 0

tree.add('item')
console.log(tree.length) // 1
```


## #top()
--------
Returns the maximum value in the tree.

### Example:
``` javascript
var tree = new BSTree()
;[7,3,10,5,1,6,9,8,2].forEach(tree.add, tree);

console.log(tree.top()) // 10
```
### Algorithm complexity:
Constant in #length

## #remove(element)
--------
Removes the given element from the tree if it exists. Returns `element` if a removal occurred. Returns `undefined` if not.

### Example
``` javascript
var tree = new BSTree()
;[7,3,10,5,1,6,9,8,2].forEach(tree.add, tree);

console.log(tree.remove(8)) // 8

var sorted_array = []
tree.forEach(function (element) { // It is not yet implemented.
  sorted_array.push(element)
})

console.log(sorted_array) // [1, 2, 3, 4, 5, 6, 7, 9, 10]
```
### Algorithm complexity:
In the average case: logarithmic in #length
In the worst case: linear in #length

## #removeBottom()
--------
Removes and returns the bottom element of tree relative to comparator.
If it does not exist (tree is empty), returns `undefined`

###Example:
``` javascript
var tree = BSTree()
;[7,3,10,5,1,6,9,8,2].forEach(tree.add, tree);

console.log(tree.removeBottom()) // 1

var sorted_array = []
tree.forEach(function (element) { // It is not yet implemented.
  sorted_array.push(element)
})

console.log(sorted_array) // [2, 3, 4, 5, 6, 7, 8, 9, 10]
```
### Algorithm complexity:
In the average case: logarithmic in #length
In the worst case: linear in #length

## #removeTop()
--------
Removes and returns the top element of tree relative to comparator.
If it does not exist (tree is empty), returns `undefined`

###Example:
``` javascript
var tree = BSTree()
;[7,3,10,5,1,6,9,8,2].forEach(tree.add, tree);

console.log(tree.removeTop()) // 10

var sorted_array = []
tree.forEach(function (element) { // It is not yet implemented.
  sorted_array.push(element)
})

console.log(sorted_array) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
### Algorithm complexity:
In the average case: logarithmic in #length
In the worst case: linear in #length