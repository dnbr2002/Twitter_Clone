var val  = arr.reduce(function (pre,val,idx,array) {
    console.log(pre, val, idx);
    return pre * val;
});

console.log('result:', val);

arr = arr.filter(function (val,idx,array) {
    return val <= 3
})