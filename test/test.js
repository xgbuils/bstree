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
        expect(bst._comparator('jano', 'valentina')).to.be(true);
      });

      it('returns false when a == b', function() {
        expect(bst._comparator('jano', 'jano')).to.be(false);
      });

      it('returns false number when a > b', function() {
        expect(bst._comparator('jano', 'fran')).to.be(false);
      });
    });

    context('given numbers', function() {
      it('returns true when a < b', function() {
        expect(bst._comparator(10, 1000)).to.be(true);
      });

      it('returns false a == b', function() {
        expect(bst._comparator(10, 10)).to.be(false);
      });

      it('returns false when a > b', function() {
        expect(bst._comparator(10, 1)).to.be(false);
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
        expect(tree[0].bottom()).to.be('fran');
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
/*
          expect(tree[0].remove('jano')).to.be('jano')
          expect(tree[0].top()).to.be('zombie')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(6);

          expect(tree[0].remove('valentina')).to.be('valentina')
          expect(tree[0].top()).to.be('zombie')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(5);
*/
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
/*
          expect(tree[0].remove('jano')).to.be('jano')
          expect(tree[0].top()).to.be('zombie')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(6);

          expect(tree[0].remove('valentina')).to.be('valentina')
          expect(tree[0].top()).to.be('zombie')
          expect(tree[0].bottom()).to.be('albert')
          expect(tree[0].length).to.be(5);
*/
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
});
