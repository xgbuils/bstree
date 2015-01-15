var BSTree  = require('../')
var expect  = require('expect.js')
var permutations = require('./permutations.js')

var util = require('util')

console.debug = function (obj) {
    console.log(util.inspect(obj, { showHidden: true, depth: null }));
}

function BSTGenerator (array) {
  return permutations(array).map(function (perm) {
    var bst = new BSTree()
    for(var i = 0; i < perm.length; ++i) {
      bst.add(perm[i])
    }
    return [bst, perm]
  })
}

describe('BSTree()', function() {
  it('returns an new empty BSTree', function() {
    expect(new BSTree()).to.be.a(BSTree);
  });

  it('accepts a comparator function', function() {
    var queue = new BSTree(function(a, b) {
      return a > b;
    });

    expect(queue).to.be.a(BSTree);
  });

  describe('check default comparator', function() {
    var bst = new BSTree()
    context('given strings', function() {
      it('returns true when a < b', function() {
        expect(bst._comp('jano', 'valentina')).to.be(true);
      });

      it('returns false when a == b', function() {
        expect(bst._comp('jano', 'jano')).to.be(false);
      });

      it('returns false number when a > b', function() {
        expect(bst._comp('jano', 'fran')).to.be(false);
      });
    });

    context('given numbers', function() {
      it('returns true when a < b', function() {
        expect(bst._comp(10, 1000)).to.be(true);
      });

      it('returns false a == b', function() {
        expect(bst._comp(10, 10)).to.be(false);
      });

      it('returns false when a > b', function() {
        expect(bst._comp(10, 1)).to.be(false);
      });
    });
  });

  describe('#length', function() {
    it('length === 0 when the binary search tree is empty', function() {
      var bst = new BSTree();
      expect(bst.length).to.be(0);
    });

    it('#length === 1 when a element is added one element in empty binary search tree', function() {
      var bst = new BSTree();
      bst.add('jano');
      expect(bst.length).to.be(1);
    });

    it('#length === 4 when a element is added four elements in empty binary search tree', function() {
      var trees = BSTGenerator(['jano' ,'valentina' ,'zombie' ,'fran' ]);
      trees.forEach(function (tree) {
        expect(tree[0].length).to.be(4);
      })      
    });
  });

  describe('#top()', function() {
    context('given empty binary search tree', function() {
      it('returns undefined when the top element is required', function() {
        var bst = new BSTree();
        expect(bst.top()).to.be(undefined);
      });
    });

    context('given binary search tree which has been added three elements', function() {
      var trees = BSTGenerator(['jano' ,'valentina' ,'zombie']);
      trees.forEach(function (tree, index) {
        it('order of elements addition: ' + tree[1].join(','), function() {
          expect(tree[0].top()).to.be('zombie')
          expect(tree[0].length).to.be(3)
        })
      })
    })
  });

  describe('#bottom()', function() {
    context('given empty binary search tree', function() {
      it('returns undefined when the bottom element is required', function() {
        var bst = new BSTree();
        expect(bst.bottom()).to.be(undefined);
      });
    });

    context('given binary search tree which has been added three elements', function() {
      var trees = BSTGenerator(['jano' ,'valentina' ,'zombie']);
      trees.forEach(function (tree, index) {
        it('order of elements addition: ' + tree[1].join(', '), function() {
          expect(tree[0].bottom()).to.be('jano')
          expect(tree[0].length).to.be(3)
        })
      })
    })
  });


  describe('#add()', function() {
    it('adds an element at the binary search tree', function() {
      var bst = new BSTree();
      bst.add('jano');
      bst.add('valentina');
      bst.add('jano');
      expect(bst.bottom()).to.be('jano');
      expect(bst.top()).to.be('valentina');
      expect(bst.length).to.be(3);
    });

    it('works with custom comparators', function() {
      var bst = new BSTree(function(a, b) {
        return a.priority > b.priority;
      });

      bst.add({ priority: 100 });
      bst.add({ priority: -1 });
      bst.add({ priority: 0 });
      bst.add({ priority: 5 });
      expect(bst.bottom()).to.be.eql({ priority: 100 });
      expect(bst.top()).to.be.eql({ priority: -1 });
      expect(bst.length).to.be(4);
    });
  });

  describe('#remove()', function() {
    it('returns undefined when the queue is empty', function() {
      var bst = new BSTree();
      expect(bst.remove(5)).to.be(undefined);
    });

    context('remove elements', function() {
      it('order of elements addition: albert, fran', function () {
        var tree = new BSTree()
        ;['albert', 'fran'].forEach(tree.add, tree)
        expect(tree.remove('fran')).to.be('fran')
        expect(tree.top()).to.be('albert')
        expect(tree.bottom()).to.be('albert')
      })

      it('order of elements addition: albert, fran, zombie', function () {
        var tree = new BSTree()
        ;['albert', 'fran', 'zombie'].forEach(tree.add, tree)
        expect(tree.remove('zombie')).to.be('zombie')
        expect(tree.top()).to.be('fran')
        expect(tree.bottom()).to.be('albert')
      })

      it('order of elements addition: zombie, fran, albert', function () {
        var tree = new BSTree()
        ;['zombie', 'fran', 'albert'].forEach(tree.add, tree)
        expect(tree.remove('albert')).to.be('albert')
        expect(tree.top()).to.be('zombie')
        expect(tree.bottom()).to.be('fran')
      })

      it('order of elements addition: albert, fran, zombie', function () {
        var tree = new BSTree()
        ;['albert', 'fran', 'zombie'].forEach(tree.add, tree)
        expect(tree.remove('albert')).to.be('albert')
        expect(tree.top()).to.be('zombie')
        expect(tree.bottom()).to.be('fran')
      })

      it('order of elements addition: zombie, fran, albert', function () {
        var tree = new BSTree()
        ;['zombie', 'fran', 'albert'].forEach(tree.add, tree)
        expect(tree.remove('zombie')).to.be('zombie')
        expect(tree.top()).to.be('fran')
        expect(tree.bottom()).to.be('albert')
      })

      it('order of elements addition: valentina, frank, zombie', function () {
        var tree = new BSTree()
        ;['valentina', 'frank', 'zombie'].forEach(tree.add, tree)
        expect(tree.remove('valentina')).to.be('valentina')
        expect(tree.top()).to.be('zombie')
        expect(tree.bottom()).to.be('frank')
        expect(tree.length).to.be(2);

        expect(tree.remove('zombie')).to.be('zombie')
        expect(tree.top()).to.be('frank')
        expect(tree.bottom()).to.be('frank')
        expect(tree.length).to.be(1)
      })

      it('order of elements addition: zombie, albert, frank', function () {
        var tree = new BSTree()
        ;['zombie', 'albert', 'frank'].forEach(tree.add, tree)
        expect(tree.remove('zombie')).to.be('zombie')
        expect(tree.top()).to.be('frank')
        expect(tree.bottom()).to.be('albert')
        expect(tree.length).to.be(2);
      })

      it('order of elements addition: albert, frank, albert', function () {
        var tree = new BSTree()
        ;['albert', 'frank', 'albert'].forEach(tree.add, tree)
        expect(tree.remove('albert')).to.be('albert')
        expect(tree.top()).to.be('frank')
        expect(tree.bottom()).to.be('albert')
        expect(tree.length).to.be(2);

        expect(tree.remove('albert')).to.be('albert')
        expect(tree.top()).to.be('frank')
        expect(tree.bottom()).to.be('frank')
        expect(tree.length).to.be(1);
      })

      it('order of elements addition: albert, fran, albert, frank', function () {
        var tree = new BSTree()
        ;['albert', 'fran', 'albert', 'frank'].forEach(tree.add, tree)
        expect(tree.remove('fran')).to.be('fran')
        expect(tree.top()).to.be('frank')
        expect(tree.bottom()).to.be('albert')
        expect(tree.length).to.be(3);

        expect(tree.remove('albert')).to.be('albert')
        expect(tree.top()).to.be('frank')
        expect(tree.bottom()).to.be('albert')
        expect(tree.length).to.be(2);

        expect(tree.remove('albert')).to.be('albert')
        expect(tree.top()).to.be('frank')
        expect(tree.bottom()).to.be('frank')
        expect(tree.length).to.be(1);
      })
      



      var trees = new BSTGenerator([
        'albert',
        'albert',
      //  'jano',
        'fran',
        'frank',
      //  'valentina',
        'zombie'
      ]);
      trees.forEach(function (tree) {
        it('order of elements addition: ' + tree[1].join(', '), function() {

//          expect(tree[0].remove('jano')).to.be('jano')
//          expect(tree[0].top()).to.be('zombie')
//          expect(tree[0].bottom()).to.be('albert')
//          expect(tree[0].length).to.be(6);
//
//          expect(tree[0].remove('valentina')).to.be('valentina')
//          expect(tree[0].top()).to.be('zombie')
//          expect(tree[0].bottom()).to.be('albert')
//          expect(tree[0].length).to.be(5);

          expect(tree[0].remove('zombie')).to.be('zombie')
          expect(tree[0].top()).to.be('frank')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(4)

          expect(tree[0].remove('fran')).to.be('fran')
          expect(tree[0].top()).to.be('frank')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(3)

          expect(tree[0].remove('albert')).to.be('albert')
          expect(tree[0].top()).to.be('frank')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(2);

          expect(tree[0].remove('albert')).to.be('albert')
          expect(tree[0].top()).to.be('frank')
          expect(tree[0].bottom()).to.be('frank')
          expect(tree[0].length).to.be(1);

          expect(tree[0].remove('frank')).to.be('frank')
          expect(tree[0].top()).to.be(undefined)
          expect(tree[0].bottom()).to.be(undefined)
          expect(tree[0].length).to.be(0);
        })
      })
    });
  })


  describe('#removeTop() & #removeBottom()', function() {
    it('returns undefined when the queue is empty', function() {
      var bst = new BSTree();
      expect(bst.remove(5)).to.be(undefined);
    });

    context('removes top and bottom elements alternatively', function() {
      var trees = new BSTGenerator([
        'albert',
        'albert',
      //  'jano',
        'fran',
        'frank',
      //  'valentina',
        'zombie'
      ]);
      trees.forEach(function (tree) {
        it('order of elements addition: ' + tree[1].join(', '), function() {

//          expect(tree[0].remove('jano')).to.be('jano')
//          expect(tree[0].top()).to.be('zombie')
//          expect(tree[0].bottom()).to.be('albert')
//          expect(tree[0].length).to.be(6);
//
//          expect(tree[0].remove('valentina')).to.be('valentina')
//          expect(tree[0].top()).to.be('zombie')
//          expect(tree[0].bottom()).to.be('albert')
//          expect(tree[0].length).to.be(5);

          expect(tree[0].removeTop()).to.be('zombie')
          expect(tree[0].top()).to.be('frank')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(4)

          expect(tree[0].removeBottom()).to.be('albert')
          expect(tree[0].top()).to.be('frank')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(3)

          expect(tree[0].removeTop()).to.be('frank')
          expect(tree[0].top()).to.be('fran')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(2);

          expect(tree[0].removeBottom()).to.be('albert')
          expect(tree[0].top()).to.be('fran')
          expect(tree[0].bottom()).to.be('fran')
          expect(tree[0].length).to.be(1);

          expect(tree[0].removeTop()).to.be('fran')
          expect(tree[0].top()).to.be(undefined)
          expect(tree[0].bottom()).to.be(undefined)
          expect(tree[0].length).to.be(0);
        })
      })
    });

    // test with custom comparator
  });

/*
  describe('#forEach()', function() {
    it('traverses elements in order', function() {
      var tree = new BSTree();
      [2, 3, 1, 4, 1].forEach(tree.add, tree)

      var sorted_array = []
      tree.forEach(sorted_array.push, sorted_array)
      expect(sorted_array).to.be.eql([1,1,2,3,4])
    });
  });*/
});
