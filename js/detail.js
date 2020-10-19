window.addEventListener('load', function () {
    // tab栏切换
    function Tab(a, b) {
        for (var i = 0; i < a.length; i++) {
            a[i].setAttribute('index', i);
            a[i].addEventListener('click', function () {
                for (var i = 0; i < a.length; i++) {
                    a[i].className = '';
                }
                this.className = 'current';

                for (var i = 0; i < b.length; i++) {
                    b[i].style.display = '';
                }
                var index = this.getAttribute('index');
                b[index].style.display = 'block';
            });
        }
    }
    var lis = document.querySelector('.detail_tab_list').querySelectorAll('li');
    var items = document.querySelectorAll('.item');
    Tab(lis, items);

    // 选择按钮
    function getchoose(a) {
        for (var i = 0; i < a.length; i++) {
            a[i].addEventListener('click', function () {
                for (var i = 0; i < a.length; i++) {
                    a[i].className = '';
                }
                this.className = 'current';
            });
        }

    }
    var color = document.querySelector('.choose_color').querySelectorAll('a');
    var version = document.querySelector('.choose_version').querySelectorAll('a');
    var capacity = document.querySelector('.choose_capacity').querySelectorAll('a');
    var type = document.querySelector('.choose_type').querySelectorAll('a');
    var tao = document.querySelector('.choose_tao').querySelectorAll('a');

    getchoose(color);
    getchoose(version);
    getchoose(capacity);
    getchoose(type);
    getchoose(tao);

    // 放大镜
    function fangda(a, b, c, d) {
        // 1.当鼠标经过 preview_img 就显示和隐藏 mask 和 big
        a.addEventListener('mouseover', function () {
            b.style.display = 'block';
            c.style.display = 'block';
        });
        a.addEventListener('mouseout', function () {
            b.style.display = 'none';
            c.style.display = 'none';
        });
        // 2.鼠标移动的时候，让黄色盒子跟着鼠标来走
        a.addEventListener('mousemove', function (e) {
            // 先计算出鼠标在盒子内的坐标
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            // 让鼠标在盒子中间  盒子大小可能会变化
            var maskX = x - b.offsetWidth / 2;
            var maskY = y - b.offsetHeight / 2;
            // 如果 x 坐标小于了0，就让它停在0的位置
            // if (maskX <= 0) {
            //     maskX = 0;
            // } else if (maskX >= this.offsetWidth - mask.offsetWidth) {
            //     maskX = this.offsetWidth - mask.offsetWidth;
            // }

            // 遮挡层最大的移动距离
            var maskxMax = this.offsetWidth - b.offsetWidth;
            var maskyMax = this.offsetHeight - b.offsetHeight;
            maskX = maskX <= 0 ? 0 : (maskX >= maskxMax ? maskxMax : maskX)
            // 如果 y 坐标小于了0，就让它停在0的位置
            // if (maskY <= 0) {
            //     maskY = 0;
            // } else if (maskY >= this.offsetHeight - mask.offsetHeight) {
            //     maskY = this.offsetHeight - mask.offsetHeight;
            // }
            maskY = maskY <= 0 ? 0 : (maskY >= maskyMax ? maskyMax : maskY)
            b.style.left = maskX + 'px';
            b.style.top = maskY + 'px';

            // 大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
            // 大图片最大移动距离
            var bigxMax = d.offsetWidth - c.offsetWidth;
            var bigyMax = d.offsetHeight - c.offsetHeight;
            // 大图片移动距离
            var bigx = maskX * bigxMax / maskxMax;
            var bigy = maskY * bigyMax / maskyMax;

            d.style.left = -bigx + 'px';
            d.style.top = -bigy + 'px';
        });
    }
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigImg = document.querySelector('.bigImg');

    fangda(preview_img, mask, big, bigImg);
});

// 求大图片的移动距离公式：
// 遮挡层移动距离 / 遮挡层最大移动距离 = 大图片移动距离 / 大图片最大移动距离
// 大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离