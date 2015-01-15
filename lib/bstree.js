/**
 *  Creates a new binary search tree. 
 *  @param {Function} comparator
 *  @constructor
 */
function BSTree (comparator) {
    this._comp = comparator || function (a, b) { return a < b }
    this.length = 0
}

BSTree.prototype = {
    constructor: BSTree,
    /**
     *  Adds the specified element.
     *  @param {*} element
     *  @public
     *  @complexity O(log n), in the worst case: O(n) 
     */
    add: function (element) {
        add.call(this, this, 'root', element)
        this.length++
    },
        
        
    /**
     *  Removes the specified element. If the element does not exist it returns `undefined`. 
     *  Otherwise it return the same element.
     *  @param {*} element
     *  @return {*} 
     *  @public
     *  @complexity O(log n), in the worst case: O(n) 
     */
    remove: function (element) {
        return remove.call(this, this, 'root', element)
    },
        
    /**
     *  Returns the top element of tree relative to comparator.
     *  @return {*} 
     *  @public
     *  @complexity O(log n), in the worst case: O(n) 
     */
    top: function () {
        return this._top && this._top.data
    },
        
    /**
     *  Returns the bottom element of tree relative to comparator.
     *  @return {*} 
     *  @public
     *  @complexity O(log n), in the worst case: O(n) 
     */
    bottom: function () {
        return this._bottom && this._bottom.data
    },
        
    /**
     *  Removes and returns the top element of tree relative to comparator. 
     *  If it does not exist (tree is empty), returns `undefined`
     *  @public
     *  @complexity O(log n), in the worst case: O(n) 
     */
    removeTop: function () {
        return removeExtrem.call(this, 'right')
    },
        
    /**
     *  Removes and returns the bottom element of tree relative to comparator.
     *  If it does not exist (tree is empty), returns `undefined`
     *  @public
     *  @complexity O(log n), in the worst case: O(n) 
     */
    removeBottom: function () {
        return removeExtrem.call(this, 'left')
    },

/**
 *  Traverse each element in order and apply tha `callback` function with thisArg
 *  as the this object of function. Default value of thisArg: BSTree.prototype
 *  @param {Node} parent
 *  @param {String} childName
 *  @param {*} element
 *  @private
 *  @complexity O(log n), in the worst case: O(n)
 */
    forEach: function (callback, thisArg) {
        inOrder.call(this, this.root, callback, thisArg)
    }
}
    
/**
 *  Adds the specified element on parent[childName] node.
 *  @param {Node} parent
 *  @param {String} childName
 *  @param {*} element
 *  @private
 *  @complexity O(log n), in the worst case: O(n) 
 */
function add (parent, childName, element) {
    if (this.root === undefined) { 
        this.root = this._bottom = this._top = {
            data: element,
            parent: this
        }
    } else if (this._comp(element, this._bottom.data)) {
        parent = this._bottom
        this._bottom = parent.left = {
            data: element,
            parent: parent
        }
    } else if (!this._comp(element, this._top.data)) {
        parent = this._top
        this._top = parent.right = {
            data: element,
            parent: parent
        }
    } else {
        var node = parent[childName]
        if (!node) {
            parent[childName] = {
                data: element,
                parent: parent
            }
        } else if (this._comp(element, node.data)) {
            add.call(this, node, 'left' , element)
        } else {
            add.call(this, node, 'right', element)
        }
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
 *  @complexity O(log n), in the worst case: O(n) 
 */
function searchExtrem (node, childName) {
    if (node) {
        while (node[childName]) {
            node = node[childName]
        }
        return node
    }
}
    
/**
 *  Removes and returns the extrem element of tree relative to comparator.
 *  If it does not exist (tree is empty), returns `undefined`
 *  If optionName == 'left', removes and returns the bottom.
 *  If optionName == 'right', removes and returns the top.
 *  @param {'left' | 'right'} childName 
 *  @public
 *  @complexity O(log n), in the worst case: O(n) 
 */
function removeExtrem (optionName) {
    if (this.root) {
        var extrem = searchExtrem(this.root, optionName)
        if (extrem.parent === this) {
            optionName = 'root'
        }
        deleteAndReplace.call(this, extrem.parent, optionName)
        this.length--
        return extrem.data
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
 *  @complexity O(log n), in the worst case: O(n) 
 */
function extrem (optionName) {
    if (optionName === 'left') {
        return searchExtrem(this.root, optionName).data
    } else {
        return undefined
    }
}

/**
 *  delete parent[childName] node and rebuild the tree
 *  @param {Node} parent
 *  @public {'left' | 'right' | 'root'} childName
 *  @complexity O(log n), in the worst case: O(n) 
 */
function deleteAndReplace (parent, childName) {
    var node = parent[childName]
    if (node.right === undefined) {
        parent[childName] = node.left
        if (node.left)
            node.left.parent = parent
    } else {
        var next = searchExtrem(node.right, 'left')
        var child = next.right
        next.left = node.left
        if (next !== node.right) {
            next.parent.left = child
            next.right = node.right
            node.right.parent = next
        } else {
            
        }
        next.parent = parent
        if (node.left)
            node.left.parent = next
        
        parent[childName] = next
        
    }
    
    if (node === this._top)
        this._top = searchExtrem(parent[childName], 'right') || parent
    if (node === this._bottom)
        this._bottom = parent[childName] || parent
}
    
/**
 *  Removes the specified element on parent[childName] node.
 *  @param {Node} parent
 *  @param {String} childName
 *  @param {*} element
 *  @private
 *  @complexity O(log n), in the worst case: O(n)
 */
function remove (parent, childName, element) {
    var node = parent[childName]
    if (node) {
        if        (this._comp(element, node.data)) {
            return remove.call(this, node, 'left', element)
        } else if (this._comp(node.data, element)){
            return remove.call(this, node, 'right', element)
        } else if (element === node.data) {
            deleteAndReplace.call(this, parent, childName)
            this.length--
            return element
        } else {
            return remove.call(this, node, 'right', element)
        }
    }
}

/**
 *  Visit each node in a tree by recursively visiting each node in 
 *  the left and right subtrees in-order and call `callback` function
 *  @param {Node} parent
 *  @param {String} childName
 *  @param {*} element
 *  @private
 *  @complexity O(log n), in the worst case: O(n)
 */
function inOrder(node, callback, thisArg) {
    if (node) {
        inOrder.call(this, node.left , callback, thisArg)
        callback.call(thisArg, node.data)
        inOrder.call(this, node.right, callback, thisArg)        
    }
} 

module.exports = BSTree