var viewHeight =document.documentElement.clientHeight//获取可视区高度

function inSight(el) {

    return el.getBoundingClientRect().top < viewHeight;

}

function loadImg(el) {

    if (!el.src) {

        el.src = el.dataset.original;

    }

}

function checkImgs() {

    const imgs = document.getElementsByTagName('img');

    Array.from(imgs).forEach(el => {

        if (inSight(el)) {

            loadImg(el);

        }

    })

}

window.addEventListener('scroll', checkImgs, false);



window.onload = function () {
    var container = document.getElementById('container');
    var list = document.getElementById('back');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var index = 1;
    var len = 5;
    var animated = false;
    var interval = 2750;
    var timer;         


    function animate (offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset/(time/inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function (){
            if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {  //优化
                list.style.left = parseInt(list.style.left) + speed + 'px';  
                setTimeout(go, inteval);
            }
            else {
                list.style.left = left + 'px';                      //控制翻页
                if(left>-200){
                    list.style.left = -550 * len + 'px';
                }
                if(left<(-600 * len)) {
                    list.style.left = '-550px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {                                  //改变class
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    function play() {                                   //轮播图播放
        timer = setTimeout(function () {
            if (animated) {
            return;
        }
        if (index == 4) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-550);
        showButton();
            play();
        }, interval);
    }

    function stop() {                                   //暂停播放
        clearTimeout(timer);
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (animated) {
                return;
            }
            if(this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -550 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();
window.onload = checkImgs;

}