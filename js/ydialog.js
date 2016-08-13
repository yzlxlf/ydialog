/**
 * Created by yuzhenlong on 2016/7/27.
 * 简易的弹出框插件
 */
$(function($){

    var DEFAULTS = {
        width:600,
        height:450,
        title:"",
        titleClass:"",
        body:"<div></div>",
        confirmBtnTitle:"确定",
        confirmBtnClass:"",
        closeBtnTitle:"关闭",
        closeBtnClass:"",
        top:"20%",
        left:"35%",
        border: "1px",
        display:"none"
    };

    var shadow = "<div class='yshadow'></div>";

    var content = "<div id='ycontent'></div>";

    $.fn.ydialog = function(options){

        var target = $(this);
        var $content = $(content);

        var newCss = $.extend(DEFAULTS,options);
        var $shadow = $(shadow);
        var shadowCss = {
            "display": "none",
            "position": "absolute",
            "background-color": "black",
            "opacity": "0.3",
            "top":"0%",
            "left":"0%",
            "width": "100%",
            "height": "100%",
            "z-index": "1001"
        };
        if(newCss.display != "none"){
            shadowCss.display = newCss.display;
        }
        $shadow.css(shadowCss);

        var dialog = {
            "width":newCss.width,
            "height":newCss.height,
            "top":newCss.top,
            "left":newCss.left,
            "display":"block",
            "position":"absolute",
            "z-index":1002,
            "border":"1px solid grey",
            "border-radius":"5px",
            "background-color":"white"

        };
        $content.css(dialog);
        if($(target).find("div[id=ycontent]").html() != null && $(target).find("div[id=ycontent]").html() != ""){
            $(target).find("div[id=ycontent]").remove();
            $(target).find("div[class=yshadow]").remove();
        }

        var head = "<div class='yhead' style='border-bottom: solid 1px rgb(221,221,221);height: 50px;line-height: 50px;padding-left: 40px;font-family: 黑体;font-size: large;cursor: move'></div>";
        var body = "<div class='ybody' style='height: 350px'></div>";
        var bottom = "<div class='ybottom' style='border-top: solid;border-top-width: 1px;border-top-color: rgb(221,221,221);height: 50px;padding: 10px'>" +
            "<button class='btn btn-primary' col='confirm'></button><button class='btn btn-danger' col='closeX'></button></div>";
        $content.append(head + $(body).append(newCss.body)[0].outerHTML + bottom);

        target.append($content[0].outerHTML + $shadow[0].outerHTML);
        $(target).find("div[class=yhead]").html(newCss.title);

        $(target).find("button").each(function(i, item){
            $(item).css({
                "float":"right",
            });
            //确认按钮
            if(i == 1){
                $(item).css({
                    "margin-right":"20px"
                });
            }else{
                $(item).css({
                    "margin-right":"10px"
                });
            }
        });
        $(target).find("button[col=confirm]").html(newCss.confirmBtnTitle);
        $(target).find("button[col=closeX]").html(newCss.closeBtnTitle);


        var offsetX = 0;
        var offsetY = 0;
        var pf = false;

        //可以拖动
        $(".yhead").mousedown(function(event){
            offsetX = event.pageX - $("#ycontent").offset().left;
            offsetY = event.pageY - $("#ycontent").offset().top;
            pf = true;
            $(document).mousemove(function(event){
                if(pf){
                    var x = event.pageX - offsetX;
                    var y = event.pageY - offsetY;
                    $("#ycontent").css({
                        "left":x,
                        "top":y
                    });
                }else{
                    return;
                }
            }).mouseup(function(){
                pf = false;
            });
        });

        $(target).find("button[col=closeX]").click(function(){
            $(".yshadow,#ycontent").css({
                "display":"none"
            });
        });
    };
});