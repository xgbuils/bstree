(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
  The entry point.
  @module bstree
**/
console.log('hello world')
if (exports) {
	console.log('node')
    module.exports = require('./lib/bstree.js')
} else {
	console.log('browser')
	window.BSTree = require('./lib/bstree.js')
}

},{"./lib/bstree.js":2}],2:[function(require,module,exports){
/**
 *  Creates a new binary search tree. 
 *  @param {Function} comparator
 *  @constructor
 */
function BSTree (comparator) {
    this._comparator = comparator || function (a, b) { return a < b }
    this.length = 0
}

/**
 *  Adds the specified element.
 *  @param {*} element
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
BSTree.prototype.add = function (element) {
    add.call(this, this, 'root', element)
    this.length++
}


/**
 *  Removes the specified element. If the element does not exist it returns `undefined`. 
 *  Otherwise it return the same element.
 *  @param {*} element
 *  @return {*} 
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
BSTree.prototype.remove = function (element) {
    return remove.call(this, this, 'root', element)
}

/**
 *  Returns the top element of tree relative to comparator.
 *  @return {*} 
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
BSTree.prototype.top = function () {
    return extrem.call(this, 'right')
}

/**
 *  Returns the bottom element of tree relative to comparator.
 *  @return {*} 
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
BSTree.prototype.bottom = function () {
    return extrem.call(this, 'left')
}

/**
 *  Removes and returns the top element of tree relative to comparator. 
 *  If it does not exist (tree is empty), returns `undefined`
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
BSTree.prototype.removeTop = function () {
    return removeExtrem.call(this, 'right')
}

/**
 *  Removes and returns the bottom element of tree relative to comparator.
 *  If it does not exist (tree is empty), returns `undefined`
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
BSTree.prototype.removeBottom = function () {
    return removeExtrem.call(this, 'left')
}

/**
 *  Adds the specified element on parent[childName] node.
 *  @param {Node} parent
 *  @param {String} childName
 *  @param {*} element
 *  @private
 *  @complexity O(log n), at the worst case: O(n) 
 */
function add (parent, childName, element) {
    var node = parent[childName]
    if (!node) {
        parent[childName] = {
            data: element
        }
    } else if (this._comparator(element, node.data)) {
        add.call(this, node, 'left' , element)
    } else {
        add.call(this, node, 'right', element)
    }
}

/**
 *  Given a node of tree, returns array with the lowest sucesor (childName === 'left') or 
 *  greatest sucesor (childName === 'right') and parent of sucesor. When sucesor is
 *  same node passed by parameter, parent is undefined
 *  @param {Node} node
 *  @param {'left' | 'right'} childName 
 *  @returns {Array}
 *  @private
 *  @complexity O(log n), at the worst case: O(n) 
 */
function searchExtrem (node, childName) {
    var parent
    while (node[childName]) {
        parent = node
        node = node[childName]
    }
    return [node, parent]
}

/**
 *  Removes and returns the extrem element of tree relative to comparator.
 *  If it does not exist (tree is empty), returns `undefined`
 *  If optionName == 'left', removes and returns the bottom.
 *  If optionName == 'right', removes and returns the top.
 *  @param {'left' | 'right'} childName 
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
function removeExtrem (optionName) {
    if (this.root) {
        var arr = searchExtrem(this.root, optionName)
        var parent = arr[1] || this
        if (arr[1] === undefined)
            optionName = 'root'
        deleteAndReplace(parent, optionName)
        this.length--
        return arr[0].data
    } else {
        return undefined
    }
}


/**
 *  Returns the extrem element of tree relative to comparator.
 *  If it does not exist (tree is empty), returns `undefined`
 *  If optionName == 'left', returns the bottom.
 *  If optionName == 'right', returns the top.
 *  @param {'left' | 'right'} childName 
 *  @public
 *  @complexity O(log n), at the worst case: O(n) 
 */
function extrem (optionName) {
    if (this.root) {
        return searchExtrem(this.root, optionName)[0].data
    } else {
        return undefined
    }
}

/**
 *  delete parent[childName] node and rebuild the tree
 *  @param {Node} parent
 *  @public {'left' | 'right' | 'root'} childName
 *  @complexity O(log n), at the worst case: O(n) 
 */
function deleteAndReplace (parent, childName) {
    var node = parent[childName]
    if        (node.left  === undefined) {
        parent[childName] = node.right
    } else if (node.right === undefined) {
        parent[childName] = node.left
    } else {
        var arr = searchExtrem(node.right, 'left')
        var parentRightFewest = arr[1]
        var rightFewest = parentRightFewest !== undefined ? arr[0] : node.right
        node.data = rightFewest.data
        if (parentRightFewest) {
            parentRightFewest.left = rightFewest.right
        } else {
            node.right = rightFewest.right
        }
    }
}

/**
 *  Removes the specified element on parent[childName] node.
 *  @param {Node} parent
 *  @param {String} childName
 *  @param {*} element
 *  @private
 *  @complexity O(log n), at the worst case: O(n) 
 */
function remove (parent, childName, element) {
    var node = parent[childName]
    if (node) {
        if        (this._comparator(element, node.data)) {
            return remove.call(this, node, 'left', element)
        } else if (this._comparator(node.data, element)){
            return remove.call(this, node, 'right', element)
        } else if (element === node.data) {
            deleteAndReplace(parent, childName)
            this.length--
            return element
        } else {
            return remove.call(this, node, 'right', element)
        }
    }
}

module.exports = BSTree
},{}]},{},[1]);
console.log('hello')
