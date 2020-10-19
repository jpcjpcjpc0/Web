window.addEventListener('load', function () {
    // 快捷导航栏-二级导航
    function viewDaoghang(a) {
        for (var i = 0; i < a.length; i += 2) {
            if (i == 2 || i == 8 || i == 10 || i == 12) {
                a[i].addEventListener('mouseover', function () {
                    this.children[1].style.display = 'block';
                });
                a[i].addEventListener('mouseout', function () {
                    this.children[1].style.display = 'none';
                });
            }
        }
    }
    var first_tab = document.querySelector('.first_tab');
    var lis = first_tab.children;

    viewDaoghang(lis);

    // 电梯导航
    function getfixedtool(a, b, c, d) {
        document.addEventListener('scroll', function () {
            if (window.pageYOffset >= b) {
                a.style.position = 'fixed';
                a.style.top = d + 'px';
            } else {
                a.style.position = 'absolute';
                a.style.top = c + 'px';
            }
        });
    }
    var fixedtool = document.querySelector('.fixedtool');
    var main = document.querySelector('.main');
    var navTop = main.offsetTop;
    var beforeTop = fixedtool.offsetTop;
    var fixedtoolTop = beforeTop - navTop;

    getfixedtool(fixedtool, navTop, beforeTop, fixedtoolTop);

    // 返回顶部
    function getDingbu(a, b) {
        document.addEventListener('scroll', function () {
            // 页面被卷去的头部
            // console.log(window.pageYOffset);
            // 当页面被卷去的头部大于等于了500，此时侧边栏改为固定定位
            if (window.pageYOffset >= b) {
                a.style.position = 'fixed';
                a.style.display = 'block';
            } else {
                a.style.display = 'none';
            }
        });
        a.addEventListener('click', function () {
            var top = document.documentElement.scrollTop;
            var timer = setInterval(function () {
                var step = Math.ceil(top / 10);
                if (document.documentElement.scrollTop == 0) {
                    clearInterval(timer);
                } else {
                    document.documentElement.scrollTop = document.documentElement.scrollTop - step;
                }
            }, 20);
        });
    }

    var fanhui = document.querySelector('.fanhui');
    var recom = document.querySelector('.recom');
    // 一定要写到滚动的外面
    var recomTop = recom.offsetTop;

    getDingbu(fanhui, recomTop);




    // 轮播图
    function lunbo() {
        var arrow_l = document.querySelector('.arrow-l');
        var arrow_r = document.querySelector('.arrow-r');
        var focus = document.querySelector('.focus');
        var focusWidth = focus.offsetWidth;

        var ul = focus.querySelector('ul');
        var ol = focus.querySelector('.circle');
        // 1.鼠标经过focus 就显示隐藏左右按钮
        focus.addEventListener('mouseenter', function () {
            arrow_l.style.display = 'block';
            arrow_r.style.display = 'block';
            clearInterval(timer);
            timer = null; //清除定时器变量
        });
        focus.addEventListener('mouseleave', function () {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function () {
                arrow_r.click();
            }, 3000);
        });
        // 2.动态生成小圆圈 有几张图就生成几个小圆圈
        for (var i = 0; i < ul.children.length; i++) {
            var li = document.createElement('li');
            // 记录当前小圆圈的索引号，通过自定义属性来做
            li.setAttribute('index', i);
            // 把li插入到ol里面
            ol.appendChild(li);
            // 4.小圆圈排他思想
            li.addEventListener('click', function () {
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                this.className = 'current';
                // 5.点击小圆圈，移动ul
                // ul的移动距离 = 小圆圈的索引号 * 图片宽度
                var index = this.getAttribute('index');
                animate(ul, -index * focusWidth);
                // 点击li之后 把这个li的索引号给num circle
                num = circle = index;
            });
        }
        // 3.把ol里面的第一个li设置类名为 current
        ol.children[0].className = 'current';
        // 6.克隆第一张图片，放到ul最后面  cloneNode() true深克隆 复制里面的子节点  false浅克隆
        // 写到生成小圆圈的下面
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);

        // 7.点击右侧按钮，图片滚动一张
        // 声明一个变量num， 点击一次， 自增1， 让这个变量 * 图片宽度， 就是ul滚动距离
        var num = 0;
        // circle 控制小圆圈的播放
        var circle = 0;
        // flag节流阀
        var flag = true;
        arrow_r.addEventListener('click', function () {
            if (flag) {
                flag = false; //关闭节流阀
                // 图片无缝滚动原理:
                // 把ul第一个li复制一份，放到ul的最后面
                // 当图片滚动到克隆的最后一张图片时，让ul快速的、不做动画的跳到最左侧 left为0
                // 同时num赋值为0，可以重新开始滚动图片了
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function () {
                    flag = true; //打开节流阀
                });
                // 8.点击右侧按钮,小圆圈跟随变化
                circle++;
                // 图片有5张，小圆圈只有4个，必须加一个判断条件
                // 如果circle == 4, 就重新复原为0
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circleChange();
            }
        });

        // 9.点击左侧按钮，图片滚动一张
        arrow_l.addEventListener('click', function () {
            if (flag) {
                flag = false;
                // 图片无缝滚动原理:
                // 把ul第一个li复制一份，放到ul的最后面
                // 当图片滚动到克隆的最后一张图片时，让ul快速的、不做动画的跳到最左侧 left为0
                // 同时num赋值为0，可以重新开始滚动图片了
                if (num == 0) {
                    num = ul.children.length - 1;
                    ul.style.left = -num * focusWidth + 'px';
                }
                num--;
                animate(ul, -num * focusWidth, function () {
                    flag = true;
                });
                // 8.点击右侧按钮,小圆圈跟随变化
                circle--;
                // 图片有5张，小圆圈只有4个，必须加一个判断条件
                // 如果circle < 0, 小圆圈要改为第4个小圆圈
                // if (circle < 0) {
                //     circle = ol.children.length - 1;
                // }
                circle = circle < 0 ? ol.children.length - 1 : circle;
                circleChange();
            }
        });

        function circleChange() {
            // 排他
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
        // 10.自动播放轮播图
        // 自动播放轮播图，实际就类似于点击了右侧按钮
        // 手动调用右侧按钮点击事件  arrow_r.click()
        var timer = setInterval(function () {
            arrow_r.click();
        }, 3000);
        // 鼠标经过focus就停止定时器  鼠标离开focus就开启定时器
    }
    lunbo();
});