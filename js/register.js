window.addEventListener('load', function () {
    var regtel = /^1[3|4|5|7|8|9]\d{9}$/;
    var regmsg = /^\d{6}$/;
    // 手机号
    function Tel(a, b) {
        a.addEventListener('blur', function () {
            b.style.display = 'inline-block';
            if (regtel.test(this.value)) {
                b.className = 'success';
                b.innerHTML = '<i class="success_icon"></i> 手机号格式正确';
            } else {
                b.className = 'error';
                b.innerHTML = '<i class="error_icon"></i> 手机号码格式不正确，请重新输入';
            }
        });
    }
    var tel = document.querySelector('#shouji');
    var message = document.querySelector('#message_shouji');

    Tel(tel, message);

    // 短信验证码
    function Message(a, b) {
        a.addEventListener('blur', function () {
            b.style.display = 'inline-block';
            if (regmsg.test(this.value)) {
                b.className = 'success';
                b.innerHTML = '<i class="success_icon"></i> 短信验证码输入正确';
            } else {
                b.className = 'error';
                b.innerHTML = '<i class="error_icon"></i> 短信验证码不正确，请重新输入';
            }
        });
    }
    var yanzheng = document.querySelector('#yanzheng');
    var message = document.querySelector('#message_yanzheng');

    Message(yanzheng, message);

    // 登录密码
    function Password(a, b, c, d, e) {
        a.addEventListener('keyup', function () {
            for (var i = 0; i < c.length; i++) {
                c[i].className = 'bai';
            }
            b.style.display = 'inline-block';
            if (this.value.length < 5 && this.value.length >= 0) {
                b.className = 'error';
                b.innerHTML = '<i class="error_icon"></i> 密码强度太弱';
                c[0].className = 'ruo';
            } else if (this.value.length < 8 && this.value.length >= 5) {
                b.className = 'success';
                b.innerHTML = '<i class="success_icon"></i> 密码强度中';
                c[1].className = 'zhong';
            } else {
                b.className = 'success';
                b.innerHTML = '<i class="success_icon"></i> 密码强度强';
                c[2].className = 'qiang';
            }
        });

        // 确认密码
        d.addEventListener('blur', function () {
            e.style.display = 'inline-block';
            if (this.value === a.value && this.value.length != 0) {
                e.className = 'success';
                e.innerHTML = '<i class="success_icon"></i> 两次输入密码一致';
            } else {
                e.className = 'error';
                e.innerHTML = '<i class="error_icon"></i> 两次输入密码不一致';
            }
        });
    }
    var pwd = document.querySelector('#mima');
    var message = document.querySelector('#message_mima');
    var qiangdu = document.querySelectorAll('.bai');

    var queren = document.querySelector('#queren');
    var message_queren = document.querySelector('#message_queren');

    Password(pwd, message, qiangdu, queren, message_queren);
});