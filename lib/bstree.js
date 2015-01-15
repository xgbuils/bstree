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
        return this._top && this._top.data
    },
        
    /**
     *  Returns the bottom element of tree relative to comparator.
     *  @return {*} 
     *  @public
     *  @complexity O(log n), at the worst case: O(n) 
     */
    bottom: function () {
        return this._bottom && this._bottom.data
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
 *  @complexity O(log n), at the worst case: O(n) 
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
 *  @complexity O(log n), at the worst case: O(n) 
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
 *  @complexity O(log n), at the worst case: O(n) 
 */
function extrem (optionName) {
    if (optionName === 'left') {
        return searchExtrem(this.root, optionName).data
    } else {
        return undefined
    }
}

function maybeReplaceExtrem(node, a, b) {
    //console.log(node.data + ' diu ueeeeeeee ' + this.length)
    //console.log('a: ' + a + ' ' + this._extrem[a].data)
    if        (this.length === 1) {
        this._extrem = {}
    } else if (this._extrem[a] === node) {
        if (node[b]) {
            this._extrem[a] = searchExtrem(node[b], a)
        } else {
            this._extrem[a] = node.parent
        }
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
    //console.log(node.data, 'node data')
    if (node.right === undefined) {
        //console.log('eii')
        parent[childName] = node.left
        if (node.left)
            node.left.parent = parent
        
    } else {
        //console.log(node.right.left, 'blilili')
        var rightFewest = searchExtrem(node.right, 'left')
        //console.log(rightFewest, 'blilili')
        //console.log(rightFewest.data, 'oeoeoe')
        //console.log(parent.data, 'pareeeeent')
        var child = rightFewest.right
        rightFewest.left = node.left
        if (rightFewest !== node.right) {
            rightFewest.parent.left = child
            rightFewest.right = node.right
            node.right.parent = rightFewest
        } else {
            
        }
        rightFewest.parent = parent
        if (node.left)
            node.left.parent = rightFewest
        
        /*node.right.parent =*/ parent[childName] = rightFewest
        
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
            //console.log('uuuuu')
            deleteAndReplace.call(this, parent, childName)
            this.length--
            return element
        } else {
            return remove.call(this, node, 'right', element)
        }
    }
}

module.exports = BSTree
/*
var util = require('util')

console.debug = function (obj) {
    console.log(util.inspect(obj, false, null))
}

var tree = new BSTree(function (a, b) {
    return a.a < b.a
})

var array = [{a:'albert', b:true}, {a:'fran', b:true}, {a:'albert', b:false}, {a:'frank', b:true}]

array.forEach(tree.add, tree)
console.log('top', tree.top())
console.log('bottom', tree.bottom())
console.log(tree.remove(array[1]))
console.log('eliminat fran')
console.log('top', tree.top())
console.log('bottom', tree.bottom())
//console.debug(tree.root)

console.log(tree.remove(array[0]))
console.log('top', tree.top())
console.log('bottom', tree.bottom())
console.debug(tree.root)

console.log(tree.remove(array[2]))
console.log('top', tree.top())
console.log('bottom', tree.bottom())
console.debug(tree.root)*/