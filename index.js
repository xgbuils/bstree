function BSTree (comparator) {
    this._comparator = comparator || function (a, b) { return a < b }
    this.length = 0
}

BSTree.prototype.add = function (object) {
    add.call(this, this, 'root', object)
    this.length++
}

BSTree.prototype.remove = function (object) {
    return remove.call(this, this, 'root', object)
}

BSTree.prototype.top = function () {
    return extrem.call(this, 'right')
}

BSTree.prototype.bottom = function () {
    return extrem.call(this, 'left')
}

BSTree.prototype.removeTop = function () {
    return removeExtrem.call(this, 'right')
}

BSTree.prototype.removeBottom = function () {
    return removeExtrem.call(this, 'left')
}

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

function searchExtrem (node, childName) {
    var parent
    while (node[childName]) {
        parent = node
        node = node[childName]
    }
    return [node, parent]
}

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

function extrem (optionName) {
    if (this.root) {
        return searchExtrem(this.root, optionName)[0].data
    } else {
        return undefined
    }
}

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

function remove (parent, childName, element) {
    var node = parent[childName]
    //console.log(node.data)
    if (node) {
        if        (this._comparator(element, node.data)) {
            return remove.call(this, node, 'left', element)
        } else if (this._comparator(node.data, element)){
            return remove.call(this, node, 'right', element)
        } else if (element === node.data) {
            //console.log(node.data)
            deleteAndReplace(parent, childName)
            this.length--
            return element
        } else {
            return remove.call(this, node, 'right', element)
        }
    }
}

var util = require('util')

console.debug = function (obj) {
    console.log(util.inspect(obj, { showHidden: true, depth: null }));
}

var bst = new BSTree()

bst.add('albert')
bst.add('fran')
bst.add('frank')

console.debug(bst.root)

console.log(bst.removeTop('frank'))

console.debug(bst.root)

console.log(bst.removeBottom('albert'))

console.debug(bst.root)

console.log(bst.removeTop('fran'))

console.debug(bst.root)



module.exports = BSTree