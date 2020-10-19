function animate(obj, target, callback) {
    // console.log(callback);  callback = function(){}

    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值
        // 改为整数， 不要出现小数问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        } else {
            // 把每次加 1 这个步长改为一个慢慢变小的值
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15);
}