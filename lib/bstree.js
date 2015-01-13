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
     *  @complexity O(log n), at the worst case: O(n) 
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
     *  @complexity O(log n), at the worst case: O(n) 
     */
    remove: function (element) {
        return remove.call(this, this, 'root', element)
    },
        
    /**
     *  Returns the top element of tree relative to comparator.
     *  @return {*} 
     *  @public
     *  @complexity O(log n), at the worst case: O(n) 
     */
    top: function () {
        return extrem.call(this, 'right')
    },
        
    /**
     *  Returns the bottom element of tree relative to comparator.
     *  @return {*} 
     *  @public
     *  @complexity O(log n), at the worst case: O(n) 
     */
    bottom: function () {
        return extrem.call(this, 'left')
    },
        
    /**
     *  Removes and returns the top element of tree relative to comparator. 
     *  If it does not exist (tree is empty), returns `undefined`
     *  @public
     *  @complexity O(log n), at the worst case: O(n) 
     */
    removeTop: function () {
        return removeExtrem.call(this, 'right')
    },
        
    /**
     *  Removes and returns the bottom element of tree relative to comparator.
     *  If it does not exist (tree is empty), returns `undefined`
     *  @public
     *  @complexity O(log n), at the worst case: O(n) 
     */
    removeBottom: function () {
        return removeExtrem.call(this, 'left')
    }
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
            data: element,
            parent: parent
        }
    } else if (this._comp(element, node.data)) {
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
    while (node[childName]) {
        node = node[childName]
    }
    return node
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
        var extrem = searchExtrem(this.root, optionName)
        if (extrem.parent === this) {
            optionName = 'root'
        }
        deleteAndReplace(extrem.parent, optionName)
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
 *  @complexity O(log n), at the worst case: O(n) 
 */
function extrem (optionName) {
    if (this.root) {
        return searchExtrem(this.root, optionName).data
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
        node = parent[childName] = node.right
    } else if (node.right === undefined) {
        node = parent[childName] = node.left
    } else {
        var rightFewest = searchExtrem(node.right, 'left')
        node.data = rightFewest.data
        parent = rightFewest.parent
        
        if (parent === node) {
            parent.right = rightFewest.right
        } else {
            parent.left  = rightFewest.right
        }
        node = rightFewest.right
        rightFewest.parent = parent
    }

    if (node)
        node.parent = parent
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
        if        (this._comp(element, node.data)) {
            return remove.call(this, node, 'left', element)
        } else if (this._comp(node.data, element)){
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

