function swap(array, i, j) {
    t = array[i]; 
    array[i] = array[j]; 
    array[j] = t;
}

function copy(array) {
    var arr = [];
    for (var i = 0; i < array.length; ++i) {
        arr.push(array[i])
    }
    return arr
}
 
function ipermute(array, n, result) {
    if (n == 1) {
        result.push(copy(array))
    } else {
        for (var i = 0; i < n; i++) {
            ipermute(array, n-1, result)
            var j = n % 2 == 1 ? 0 : i
            swap(array, j, n-1);
        }
    }
}

function permutations (array) {
    var result = []
    ipermute(array, array.length, result)
    return result
}

module.exports = permutations





















function generate(n)
{ 
    var p = [], c = []
    var i, t, M;
    for (i = 1; i <= n; i++)
    { 
        p[i] = i; c[i] = 1; 
    }
    console.log(p);
    for (i = 1; i <= n; )
    {
        if (c[i] < i)
        {
            swap(c, n % 2 ? 1 : n) // c --> p ??
            c[i]++; i = 1;
            console.log(p);
        }
        else c[i++] = 1;
    }
}
