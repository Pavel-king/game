$(function () {
    $(".rules").click(function () {
        if ($(".start").is(':visible') || !$(".start").is(':hidden'))
            $(".rule").stop(true, true).fadeIn(100);
    });
    $(".rule a").click(function () {
        $(".rule").stop(true, true).fadeOut(100);
    });
    $(".start").click(function () {
        $(this).stop(true, true).fadeOut(100);
        progressHandler();  //进度条
        startWolfAnimation();   //灰太狼
    });
    $(".over button").click(function () {
        $(".over").stop(true, true).fadeOut(100);
        $(".start").stop(true, true).fadeIn(100);
    });
});

function progressHandler() {
    var timer;
    $(".progress").css('width', 180);
    if (timer)
        clearInterval(timer);
    timer = setInterval(function () {
        var Pwidth = $(".progress").width();
        if (Pwidth <= 0) {
            clearInterval(timer);
            $('.over').stop(true, true).fadeIn(100);
            stopWolfAnimation();
        } else {
            $(".progress").css('width', Pwidth - 3);
        }
    }, 1000);
};
var wolf_timer;
var wolf_index;
var wolf_endIndex;
function startWolfAnimation() {
    var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
    var wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];
    var arrPos = [
        { left: "100px", top: "115px" },
        { left: "20px", top: "160px" },
        { left: "190px", top: "142px" },
        { left: "105px", top: "193px" },
        { left: "19px", top: "221px" },
        { left: "202px", top: "212px" },
        { left: "120px", top: "275px" },
        { left: "30px", top: "295px" },
        { left: "209px", top: "297px" }
    ];
    var $img = $("<img src='' alt='' class='wolf'>");
    var wolf = Math.floor(Math.random()*5) == 0 ? wolf_2 : wolf_1;
    var index = Math.floor(Math.random()*9);
    $img.css({
        position: "absolute",
        left: arrPos[index].left,
        top: arrPos[index].top,
    });
    $(".container").append($img);
    wolf_index = 0;
    wolf_endIndex = 5;
    wolf_timer = setInterval(function(){
        if(wolf_index > wolf_endIndex){
            $img.remove();
            clearInterval(wolf_timer);
            startWolfAnimation();
        }
        $img.attr("src", wolf[wolf_index]);
        wolf_index ++;
    }, 200);
    gameRules($img);
};

function stopWolfAnimation(){
    $(".wolf").remove();
    clearInterval(wolf_timer);
};

function gameRules($img){
    $img.one('click', function(){
        wolf_index = 5;
        wolf_endIndex = 9
        var $src = $img.attr("src");
        var flag = $src.indexOf('h') >= 0;
        var beforeScore = parseInt($(".container>h1").text());
        if(flag){
            $(".container>h1").text(beforeScore + 10 + "");
        }else{
            $(".container>h1").text(beforeScore - 10 + "");
        }
    })
};