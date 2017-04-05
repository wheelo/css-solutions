# transmission
[原生js判断css3动画(transition)结束](http://www.cnblogs.com/surfaces/p/4324044.html)


## Welcome to hack this document
Here is the first Hack:
```
var arr = [5, 1, 10, 16, 3, -10];

/*
function sort(arr) {
    for(var m = 0; m < arr.length; m++) {
        var min = arr[m];
        var k = m;
        for(var n = m+1; n < arr.length; n++) {
            if (arr[n] < min) {
                min = arr[n];
                k = n;
            }
            if (n == (arr.length-1)) {
                arr[k] = arr[m];
                arr[m] = min;
            }
        }
    }
    return arr;
}
*/

/*
function sort(arr) {
    for(var m = 0; m < arr.length; m++) {
        var temp;
        for(var n = m+1; n < arr.length; n++) {
            if (arr[n] < arr[m]) {
                temp =  arr[m];
                arr[m] = arr[n];
                arr[n] = temp;
            }
        }
    }
    return arr;
}
*/

function sort(arr){
    if(arr.length<=1){return arr;}
    var pivotIndex=Math.floor(arr.length/2);
    var pivot=arr.splice(pivotIndex,1)[0];
    var left=[];
    var right=[];

    for(var i=0;i<arr.length;i++){
        if(arr[i]<=pivot){
            left.push(arr[i]);
        }
        else{
            right.push(arr[i]);
        }
    }
    return sort(left).concat([pivot],sort(right));
}


console.log(sort(arr));

```
