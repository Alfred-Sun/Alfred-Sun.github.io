//console.log('This would be the main JS file.');

// 严格模式
"use strict";
/*
@email:          hopekayo@gmail.com
@description:    钛媒体js开发版
@time:           2014-7-28 4:01 PM
*/

var Tmt = window.Tmt || {}; //全局命名空间
// ajax url
Tmt.api={
    nav_scrollable                 : '/ajax', //get 动态加载导航栏目
    get_more_search_result         : '/', //get 加载更多搜索结果
    get_more_message               : '', //post  加载更多消息
    default_api                    : '/ajax', //get
    save_post_draft                : '/ajax?_m=learn&_c=SavePostDraft',  //保存草稿
    send_massage                   : '/notification/send'
};

/*
//插件管理
Tmt.plugins = function(){
    //用in.js 异步加载模块
    var LoadFile = function(name,url,type,rely){In.add(name,{path:url,type:type,charset:'utf-8',rely:rely});};
    var Ready = function(module,callback){In.ready(module,callback);}
    var PATH = "/wp-content/themes/bvtmt/static/js/vendor/";

    //circles-master
    LoadFile("circles-master",PATH+"circles.min.js",'js');
    LoadFile("autosize",PATH+"jquery.autosize.min.js",'js')
    return {
        ready:Ready
    }
}();*/

//全局功能
Tmt.global = function($form){
    // 全局搜索
    function globalSearch($form){
        $form.submit(function(){
            var txt = $.trim($(this).find('input').val());
            if(txt){
                window.location.href = '/search?t=post&q='+txt;
            }
            return false;
        })
    }

    //跳转到某处
    var animateGoto = function(postion,callback){
        $("body,html").animate({"scrollTop":postion},800,callback || function(){});
    }

    var scrollTopDown=function(){
        var html='<div class="scroll-top-down"><div class="js-scroll-top" title="返回顶部"><i class="icon-arr-up"></i></div>';
        if($("#comment").length>0){
            html += '<div class="js-scroll-comment" title="查看评论"><i class="icon-publish"></i></div>'
        }
        html += '<div class="js-scroll-down" title="转到底部"><i class="icon-arr-down"></i></div></div>';
        $("footer").append(html);
        var $top_button     = $(".js-scroll-top"),
            $down_button    = $(".js-scroll-down"),
            $comment_button = $(".js-scroll-comment");
        $top_button.click(function(){
            Tmt.global.animateGoto(0)
        });
        $down_button.click(function(){
            Tmt.global.animateGoto($("#footer").position().top)
        });
        $comment_button.click(function(){
            Tmt.global.animateGoto($("#comment").position().top)
        });
    }

    //检测登录
    var check_login = function(){
        var $pop_up_login_bg = $('.pop-up-login-bg');
        var $pop_up_login = $('.pop-up-login').on('click','.close',function(){
            $pop_up_login.hide();
            $pop_up_login_bg.hide();
        });
        if(USER_ID == "0"){
            var init_status = false;
            $pop_up_login.show();
            $pop_up_login_bg.show();
            if(init_status === false){
                $pop_up_login.css({
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    marginTop: -$pop_up_login.height()/2,
                    marginLeft: -$pop_up_login.width()/2
                });
                init_status = true;
            }
            return false;
        }else{
            return true;
        }
    }
    //验证邮箱
    var is_email = function(str_email){
        var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if(emailReg.test(str_email)){
            return true;
        }else{
            return false;
        }
    }
    //验证手机号
    var is_tel   = function(str_tel){
        if(/^1[3578][0-9]{9}$/g.test(str_tel) ){
            return true;
        }else{
            return false;
        }
    }
    //判断为空
    var is_full  = function($form){
        var pass = false;
        $form.find('select').each(function(){
            if($(this).find('option:selected').val()=="请选择"){
                pass = true;
                return false;//跳出each
            }
        });
        $form.find("input:not(input[type=\"hidden\"]):not('.can_empty'),textarea").each(function(){
            if(this.value === '') {
                $(this).focus();
                pass = true;
                return false;//跳出each
            }
        });
        return pass;
    }

    // 全局提示
    var showPageMsg = function(status, msg) {
        var time = setTimeout(function(){
            // $('.global-tip').remove();
        },500000000);
        $('body').on('click', '.global-tip>.inner>.close', function() {
            $('.global-tip').remove();
            clearTimeout(time);
        });
        $('.global-tip').remove();
        $('body').append('<div class="global-tip global-' + status + '"><div class="inner"><div class="txt">' + msg + '</div><span class="close icon-close"></span></div></div>');
        var width = $(".global-tip").outerWidth();
        if(width <= 470){
            $(".global-tip").find(".txt").css("width","428px");
        }
        $('.global-tip').css("margin-left","-"+$(".global-tip").outerWidth()/2+"px").removeClass("fn-hide");
    }
    //初始化 select
    function set_select(){
        var operate_select = {
            "substitute": function($select){
                var html = "<div class='dropdown-part'>";
                $.each($select.children(), function(option_i, option_n){
                    var id = $(option_n).val();
                    var default_text = $(option_n).html();
                    if($select.find("option:selected").length>0){
                        default_text = $select.find("option:selected").text();
                    }
                    if(option_i==0){
                        var button = "<span class='dropdown-btn'><span class='text'>"+
                                        default_text+"</span><i class='icon-arr-down'></i></span><ul class='dropdown-menu' role='menu' >";
                        html+=button;
                    }
                   html += "<li id='"+id+"'>"+ $(option_n).html()+"</li>";
                });
                html+="</ul>";
                $()
                $select.after(html); //替换成div.dropdown
                $select.css("display", "none"); //隐藏select 不可以remove 提交表单时候还要用
            }
        }
        var select_num = $('select').length;
        for(var count=0; count<select_num; count++){
            operate_select.substitute($('select').eq(count));
        }
        $(".dropdown-btn").click(function(event) {
            $(".dropdown-menu").hide();
            $(this).next(".dropdown-menu").slideDown();
        });
        $(document).click(function(event) {
            var s = $(event.target);
                if(!s.parents("div").eq(0).hasClass('dropdown-part')){
                    $(".dropdown-menu").slideUp();
                }
        });
        $(".dropdown-menu li").on('click', function(){
            var id  = $(this).attr("id").split(" ")[0];  //求报道value有空格 取第一个
            $(this).parents(".dropdown-menu").slideUp();
            $(this).parents(".dropdown-menu").prev(".dropdown-btn").find(".text").html($(this).text());
            $(this).parents(".dropdown-part").prev("select").find("option:selected").attr("selected",false);
            $(this).parents(".dropdown-part").prev("select").find("option[value^="+id+"]").attr("selected",true);
        });
    }
    // 自定义提示框
    function custom_Alert(txt){
        $("#system-tip").find(".item-txt").html(txt);
        $("#system-tip").popup("show");
    }
    // 自定义确认框
        function custom_Confirm(txt){
        $("#system-confirm-tip").find(".item-txt").html(txt);
        $("#system-confirm-tip").popup("show");
    }
    return{
        is_full         :   is_full,
        is_tel          :   is_tel,
        is_email        :   is_email,
        check_login     :   check_login,
        globalSearch    :   globalSearch,
        showPageMsg     :   showPageMsg,
        animateGoto     :   animateGoto,
        scrollTopDown   :   scrollTopDown,
        custom_Alert    :   custom_Alert,
        custom_Confirm  :   custom_Confirm,
        set_select      :   set_select
        }
}();
//导航栏下拉滚动
Tmt.nav_dropdown = function(){
    var $dropdonwn_part = "",
        $now_nav_id     = "",
        $page           = 3,
        $now_page       = 1;
    //异步加载栏目
    var change = function(cat_id,callback){
        var parms={
                    _m      : "learn",
                    _c      : "asyn_load_post",
                    _t      : "2",
                    _p      : $now_page+1,
                    cat_id  : cat_id
        };
        var callback = callback || function(){};
        $.get(Tmt.api.nav_scrollable,parms,function(data){
            var post        = data.post,
                list_length = post.length,
                page_html = "";
            switch(list_length){
                case 0 :    //page_html = "";
                            $dropdonwn_part.find(".cat_"+$now_nav_id).find(".next").addClass('disable');
                            break;
                case 1 : case 2 : case 3 :
                            for(var i in post){
                                page_html += '<div class="part"><a href="'+post[i].url+'" class="pic"><img src="'+post[i].thumbnal_url+'" width="200" height="160"></a><a href="'+post[i].url+'" class="tit">'+post[i].post_title+'</a></div>';
                            }
                            break;
                default :   break;
            }
            // $dropdonwn_part.find(".show.cat_"+cat_id).find(".page:eq("+($now_page-1)+")").html(page_html);
            $dropdonwn_part.find(".show.cat_"+cat_id).find(".page:eq("+($now_page)+")").html(page_html);
            callback(post);
        },'json')

    }
    //解析xml
    var load = function(){
        var dropdown_html='<section class="dropdown_list">';
        $.get("/wp-content/themes/bvtmt/data/column.xml",function(data){
            var columns =$(data).find("column");
            columns.each(function(){
                var code=$(this).find("column_slug").text(),
                    cat_id=$(this).children("column_ID").text(),
                    child_column=$(this).find("sub_column"),
                    post = $(this).children("post");
                dropdown_html   +=  '<div class="nav-dropdown '+code+'">'
                                +'     <div class="content clear">'
                                +'       <div class="nav fl">'
                                +'         <ul class="list">'
                                +'           <li class="part current all" id="'+cat_id+'"><a href> <span class="point">· </span>全部</a></li>';
                child_column.each(function(){
                    dropdown_html += '<li class="part" id="'+$(this).find("column_ID").text()+'"><a href> <span class="point">· </span>'+$(this).find("column_name").text()+'</a></li>';
                })
                dropdown_html   += '</ul></div>';
                dropdown_html   += '<div class="show fr all cat_'+cat_id+'">'
                                +'      <div id="scrollable" class="scrollable">'
                                +'       <div class="items">'
                                +'        <div class="page fl">';
                post.each(function(){

                dropdown_html   += '<div class="part"><a href="/'+$(this).find("ID").text()+'.html" class="pic"><img src="'+$(this).find("thumbnal_url").text()+'" width="200" height="160"></a><a "/'+$(this).find("ID").text()+'.html" class="tit">'+$(this).find("post_title").text()+'</a></div>'

                })
                dropdown_html   += '</div>'
                                +'        <div class="page fl">'
                                +'          <div class="part"></div>'+
                                '          <div class="part"></div>'+
                                '          <div class="part"></div>'
                                +'        </div>'
                                +'        <div class="page fl">'
                                +'          <div class="part"></div>'
                                +'          <div class="part"></div>'
                                +'          <div class="part"></div>'
                                +'        </div>'
                                +'      </div>'
                                +'  </div>'
                                +'   <a class="prev left browse fl disable"><i class="icon-arr-left"></i></a>'
                                +'   <a class="next browse right fr"><i class="icon-arr-right"></i></a>'
                                +' </div>';
                child_column.each(function(){
                    var child_post=$(this).find("post");
                    dropdown_html   +=  '<div class="show frcat_'+$(this).find("column_ID").text()+'">'
                                    +'      <div id="scrollable" class="scrollable">'
                                    +'        <div class="items">'
                                    +'          <div class="page fl">';
                    child_post.each(function(){

                    dropdown_html   += '<div class="part"><a href="/'+$(this).find("ID").text()+'.html" class="pic"><img src="'+$(this).find("thumbnal_url").text()+'" width="200" height="160"></a><a "/'+$(this).find("ID").text()+'.html" class="tit">'+$(this).find("post_title").text()+'</a></div>'

                    })
                    dropdown_html   += '</div>'
                                    +'        <div class="page fl">'
                                    +'          <div class="part"></div>'
                                    +'          <div class="part"></div>'
                                    +'          <div class="part"></div>'
                                    +'        </div>'
                                    +'        <div class="page fl">'
                                    +'          <div class="part"></div>'
                                    +'          <div class="part"></div>'
                                    +'          <div class="part"></div>'
                                    +'        </div>'
                                    +'      </div>'
                                    +'  </div>'
                                    +'   <a class="prev left browse fl disable"><i class="icon-arr-left"></i></a>'
                                    +'   <a class="next browse right fr"><i class="icon-arr-right"></i></a>'
                                    +' </div>';
                })
                dropdown_html += '</div></div>'
            })
            dropdown_html+="</section>"
            $("body").append(dropdown_html);
            bound();
        },"xml");
    }
    //绑定滚动 加载效果
    var bound = function(){
        var $current_column = $("ul.class li.current"),
            out_time        = "",
            hover_time      = "";
        var reset_gap=function(){
            $("ul.class li.gap").find(".line").css("background","#ed5427");
            $("ul.class li.gap").css("width","1px");
            $("ul.class li.current a").css("padding","0 25px");
            $("ul.class li.current").prev("li.gap").css("display","none");
            $("ul.class li.current").next("li.gap").css("display","none");
            $("ul.class li.select").prev("li.gap").css("width","0px");
            $("ul.class li.select").next("li.gap").css("width","0px");
        }
        reset_gap();
        $("ul.class li").hover(function(){
            if($(this).hasClass("disable")){
                return;
            }
            if($(this).prev("li").hasClass('current')){
                $(this).find("a").css("padding-left","24px")
            }
            if($(this).next("li").hasClass('current')){
                $(this).find("a").css("padding-right","24px")
            }
            $(this).prev("li.gap").css("width","0px");
            $(this).next("li.gap").css("width","0px");
            if(!$(this).hasClass('select')){
                var nav_class = $(this).attr("class")||"";
                $now_page =1;
                if($(this).hasClass('current')){
                    $(this).removeClass('current');
                    nav_class = $(this).attr("class").slice("");
                    $(this).addClass('current');
                }
                $dropdonwn_part=$(".nav-dropdown."+nav_class);
                $now_nav_id = $(this).attr("id");
                $(".nav-dropdown").hide();
                $dropdonwn_part.find(".prev").addClass('disable');
                $dropdonwn_part.find(".next").removeClass('disable');
                $dropdonwn_part.find(".show.all").find(".items").css("left","0px");
                hover_time=setTimeout(function(){
                    $dropdonwn_part.show();
                    if(!$(this).hasClass('tag') && $(".nav-dropdown."+nav_class).find(".nav").css("height")){
                        var margin_top= -($(".nav-dropdown."+nav_class).find(".nav").css("height").toString().split("px")[0])/2-25;
                        $(".nav-dropdown."+nav_class).find(".nav").css("margin-top",margin_top+"px");
                    }
                },300);
                $("ul.class .select").removeClass('select');
                $(this).addClass('select');
            }
            reset_gap();
        })
        $(".nav-dropdown .nav li").hover(function(){
            $(this).parents(".nav-dropdown").find(".current").removeClass('current');
            $(this).addClass('current');
            $now_page = 1;
            $(this).parents(".nav-dropdown").find(".show").hide();
            $(this).parents(".nav-dropdown").find(".show").find(".prev").addClass('disable');
            $now_nav_id = $(this).attr("id");
            $(this).parents(".nav-dropdown").find(".cat_"+$now_nav_id).find(".next").removeClass('disable');
            $(this).parents(".nav-dropdown").find(".cat_"+$now_nav_id).find(".items").css("left","0px");
            $(this).parents(".nav-dropdown").find(".cat_"+$now_nav_id).show();
            return false;
        })
        $("ul.class").mouseout(function(event){
            var s = event.toElement || event.relatedTarget;
            if(!(this).contains(s)){
                clearTimeout(hover_time);
                out_time=setTimeout(function(){
                    $(".nav-dropdown").hide();
                    $("ul.class .select").removeClass('select');
                    $("ul.class li.disable").removeClass('disable');
                    reset_gap();
                },300);
            }
        });
        $(".nav-dropdown").mouseover(function(){
            clearTimeout(out_time);
        });
        $(".nav-dropdown").mouseout(function(event){
            var s = event.toElement || event.relatedTarget;
            if (!(this).contains(s)) {
                $(".nav-dropdown").hide();
                $("ul.class .select").removeClass('select');
                reset_gap();
            }
        })
        $(".nav-dropdown").find(".prev").click(function(){
            if(!$(this).hasClass('disable')){
                $dropdonwn_part.find(".show.cat_"+$now_nav_id).find(".items").animate({left: '+=666px'}, 700);
                $now_page-=1;
                if ($now_page===1) {
                     $(this).addClass('disable');
                }
                if ($now_page<$page) {
                    $(this).parents(".show").find(".next").removeClass('disable');
                }
            }
        })
        $(".nav-dropdown").find(".next").click(function(){
            var self = this;
            if(!$(this).hasClass('disable')){



                // $dropdonwn_part.find(".show.cat_"+$now_nav_id).find(".items").animate({left: '-=666px'}, 700);
                // if($dropdonwn_part.find(".show.cat_"+$now_nav_id).find(".page:eq("+$now_page+")").text()===""){
                //     change($now_nav_id)
                // }

                change($now_nav_id,function(post){
                    var len = post.length;
                    if(len > 0 ){
                        $dropdonwn_part.find(".show.cat_"+$now_nav_id).find(".items").animate({left: '-=666px'}, 700);
                        $now_page+=1;
                        if ($now_page===$page) {
                            $(self).addClass('disable');
                        }
                        if ($now_page>1) {
                            $(self).parents(".show").find(".prev").removeClass('disable');
                        }
                    }else{
                        $(self).addClass('disable');
                    }
                });
                // if($dropdonwn_part.find(".show.cat_"+$now_nav_id).find(".page:eq("+$now_page+")").text()===""){
                // }



                // $now_page+=1;
                // if ($now_page===$page) {
                //     $(this).addClass('disable');
                // }
                // if ($now_page>1) {
                //     $(this).parents(".show").find(".prev").removeClass('disable');
                // }
            }
        })

        // $("#scrollable-tag").scrollable({
        //     prevPage:'.prev',//跳转到上一页
        //     nextPage:'.next',//跳转到下一页
        //     speed: 700,
        //     circular: false
        // });
    }


    // 我要投稿判断
    var draft = function(){

        function handle(){
            if(!Tmt.global.check_login()){
                return false;
            }
        }

        $(".head-2 .submit").on("click",handle);
    }
    draft();

    return {
        bound: bound
        // load : load
    }
}();

// 搜索相关
Tmt.search = function(){
    function loadMore(){
        var rows =  $(".result-article .rows").html() || 0,
            keywords   =  $(".mod-tit .tit .keyword").html(),
            map        =  $(".sidebar li.current").attr("id"),
            $button    =  $(".load-more .btn");
        var offset     =  0,
            limit      =  10;
        if(rows<11){
            $button.css("display","none");
        }
        //搜索结果加载更多
        function loadMoreSearchResult(offset,callback){
            var parms = {
                            q         :   keywords,
                            searchapi :   "post",
                            limit     :   10,
                            offset    :   offset,
                            token     :   "tmtpost",
                            f         :   map.substr(7, map.length) === "all" ? "_all" : map.substr(7, map.length)
                        };
            $button.addClass('disabled').html('正在加载');
            $.get(Tmt.api.get_more_search_result,parms,function(data){
                var items       = data.items,
                    html        = "",
                    tag_length  = 0,
                    cat_length  = 0;
                for(var i in items ){
                    items[i].category ? cat_length = items[i].category.length : cat_length = 0;
                    items[i].tag ? tag_length = items[i].tag.length : tag_length = 0;
                    html+='<li class="article"><div class="show"><a target="_blank" href="'+items[i].link+'" class="tit">'+items[i].post_title+'</a>'
                        +'<p class="info"><a target="_blank" href="" class="author">'+items[i].author+'</a><span class="point">•</span><span class="time">'+items[i].post_time+'</span>';
                    if(cat_length>0){
                        html+='<span class="point">•</span><span class="column">'
                        for(var j in items[i].category){
                            j != cat_length-1 ? html+=items[i].category[j].cat_name+"，" : html+=items[i].category[j].cat_name;
                        }
                        html+='</span>';
                    }
                    html+='<span class="point">•</span><span><a target="_blank" href="'+items[i].link+'#article-comment">'+items[i].comment_count+' 条评论</a></span></p>'
                        +'<p class="part">'+items[i].post_excerpt+'</p>'
                        +'<span class="like"><i class="icon-praise"></i><span>'+(items[i].like ? items[i].like : 0)+' 赞</span></span>';
                    if(tag_length!=0){
                        html +='<div class="tags"><i class="icon-bookmark"></i><ul>';
                        for(var j in items[i].tag){
                            j !=  tag_length-1 ? html+='<li class="tag"><a href="/tag/'+items[i].tag[j].tag_slug+'">'+items[i].tag[j].tag_name+'</a>，</li>':html+='<li class="tag"><a href="/tag/'+items[i].tag[j].tag_slug+'">'+items[i].tag[j].tag_name+'</a></li>';
                        }
                        html+='</ul></div>';
                    }
                    html+='</div></li>'
                }
                $(".result-article .mod-article-list").append(html);
                callback();
            },"json");
        }
        //绑定点击加载更多按钮
        function handle(){
            offset +=limit;
            if(offset>rows){
                $button.html("没有更多了");
            }else{
                if((offset+limit)>rows){
                    loadMoreSearchResult(offset,function(){
                        $button.html("没有更多了");
                        $button.one("click",handle)
                    });
                }else{
                    loadMoreSearchResult(offset,function(){
                        $button.removeClass('disabled').html('加载更多');
                        $button.one("click",handle)
                    });
                }
            }
        }
        $button.one("click",handle);
    }
    var init = function(){
        loadMore();
    }
    return {
        init: init
    }
}();

// 用户相关
Tmt.user = (function(){
    function loadMoreMessage(type){
        var $button = $(".load-more .btn"),
            rows    = $(".message-total").val(),
            limit   = 10,
            offset  = 0;
        function post(offset,callback){
            var parms = {
                            limit  : limit,
                            offset : offset
                        }
            $button.addClass('disabled').html('正在加载');
            $.post(Tmt.api.get_more_message,parms,function(data,status){
                if(status==="success"){
                    var html="";
                    for (var i in data ){
                        if(data[i].msgfrom==="钛媒体TMTpost"){
                            data[i].msgfrom="系统";
                        }
                        html += '<li class="clear">'+data[i].icon+'<div class="right">'
                             +  '<p class="who"> <span class="name keyword">'+data[i].msgfrom+'</span><span>发送给 </span><span class="name keyword">'+data[i].msgto+'</span><span class="time">'+data[i].currenttime+'</span></p>'
                             +  '<p class="comment-cont">'+data[i].content+'</p>';
                        type==="sys" ? "" : html +='<p class="info"><i class="icon-comment"></i><a href="./notification/private?id='+data[i].who+'">共<span class="total">'+data[i].totalnum+'</span>条消息</a><i class="icon-forward"></i><a href="./notification/private?id='+data[i].who+'">回复</a></p>';
                        html +=  '</div></li>';
                    }
                }
                $(".my-message .list").append(html)
                callback();
            },'json')
        }
        function handle(){
            offset +=limit;
            if(offset>rows){
                $button.html("没有更多了");
            }else{
                if((offset+limit)>rows){
                    post(offset,function(){
                        $button.html("没有更多了");
                        $button.one("click",handle)
                    });
                }else{
                    post(offset,function(){
                        $button.removeClass('disabled').html('加载更多');
                        $button.one("click",handle)
                    });
                }
            }
        }
        $button.one("click",handle)
    }
    function loadMoreFeed() {
    }
    return {
        loadMoreMessage: loadMoreMessage,
        loadMoreFeed: loadMoreFeed
    }
})();

// 申请报道
Tmt.report = function(){
    var  post_num  = 0;
    $(".report .ua").val("pc");
    var handle = function(){
        var $form     = $(".pages .page3"),
            $form_all = $(".pages form");
        $(".pages input[type='radio']:eq(1)").click();
        $form_all.submit(function(){
            $('.global-tip').remove();
            var str_email = $.trim($form.find("input[name='contact_email']").val()),
                str_tel   = $.trim($form.find("input[name='contact_mobile']").val());
            if(Tmt.global.is_full($form)){
                Tmt.global.showPageMsg("error","你还没有填写完整");
                return false;
            }else if(!Tmt.global.is_tel(str_tel)){
                Tmt.global.showPageMsg("error","填写的手机号码格式有误");
                return false;
            }else if(!Tmt.global.is_email(str_email)){
                Tmt.global.showPageMsg("error","填写的邮箱格式有误");
                return false;
            }else{
                post_num +=1
                // return true;
                post_num <=1 ? post($form_all) : "";
                return false;
            }
        });
    }
    var post = function($form){
        var parms="",
            $input    = $form.find("input:not('input[type=radio],input[type='checkbox'],input[type='submit']'),textarea"),
            $radio    = $form.find("input[type=radio]:checked"),
            $select   = $form.find('select'),
            ua        = $form.find('.ua').val();
        for(var i = 0; i < $input.length; i++){
            var $ipt  = $input.eq(i),
                name  = $ipt.attr("name"),
                val   = $.trim($ipt.val());
            parms += name + "=" + val + "&";
            }
        for(var i = 0; i < $select.length; i++ ){
            var $sel  = $select.eq(i),
                name  = $sel.attr("name"),
                val   = $sel.find('option:selected').val();
            parms += name + "=" + val + "&";
        }
        for(var i = 0; i < $radio.length; i++){
            var $rad = $radio.eq(i),
                name = $rad.attr("name"),
                val  = $.trim($rad.val());
            parms += name + "=" + val + "&";
        }
        parms += "_wpcf7_is_ajax_call=1";

        $.post("",parms,function(data){
            post_num = 0;
            if(data.mailSent){
                $(".step-list li.current").removeClass("current").next().addClass('current');
                $('.current-page').removeClass('current-page');
                $('.page4').addClass("current-page");
            }else if(!data.mailSent){
                if(data.code="10010"){
                    Tmt.global.showPageMsg("error",data.msg);
                }else{
                    Tmt.global.showPageMsg("error","系统无法发送邮箱。");
                }
            }
        },'json')
    }
    var init = function(){
        $(".js-next").click(function(){
            if(Tmt.global.check_login()){
                $('.global-tip').remove();
                var $old_page = $(this).parents(".current-page");
                var $form     = $(".pages .page2");
                if($old_page.hasClass('page2')){
                    if(Tmt.global.is_full($form)){
                        Tmt.global.showPageMsg("error","你还没有填写完整");
                    }else{
                        $old_page.removeClass('current-page').next().addClass('current-page');
                        $(".step-list li.current").removeClass("current").next("li").addClass('current');
                    }
                    Tmt.global.animateGoto(0);
                }else{
                    Tmt.global.animateGoto(0);
                    $(".step-list li.current").removeClass("current").next("li").addClass('current');
                    if($old_page.hasClass('page1')){
                        $old_page.removeClass('current-page').next().find("[class^=page]").eq(0).addClass('current-page');
                    }else if($old_page.hasClass('page3')){
                        $old_page.removeClass('current-page').parents(".wpcf7").next().addClass('current-page');
                    }
                }
            }
        });
        $(".js-prev").click(function(event) {
            $('.global-tip').remove();
            var $old_page = $(this).parents(".current-page");
            $(".step-list li.current").removeClass("current").prev().addClass('current');
            if($old_page.hasClass('page2')){
                $old_page.removeClass('current-page').parents(".wpcf7").prev().addClass('current-page');
            }else if($old_page.hasClass('page3')){
                $old_page.removeClass('current-page').prev().addClass('current-page');
            }
        });
        handle();
        set_radio();
    }
    var set_radio = function(){
                var operate_radio = {
            "substitute": function($radio){
                var html ="<span class='v-radio "
                $radio.prop("checked") ? html += "current" : "";
                html +="'><span class='point'></span>";
                $radio.after(html); //替换成div.dropdown
                $radio.css("display", "none"); //隐藏select 不可以remove 提交表单时候还要用
            }
        }
        var radio_num = $('input[type="radio"]').length;
        for(var count=0; count<radio_num; count++){
            operate_radio.substitute($('input[type="radio"]').eq(count));
        }
        $("label.is-radio").click(function(){
            $(".v-radio").removeClass('current')
            console.log($(".v-radio"))
            $(this).find(".v-radio").addClass('current')
        })
    }
    return {
        init : init
    }
}();

//文章相关
Tmt.article = function(){
    var  p_id = $(".mod-comment .post-id").text();
    var setCheckbox = function(){
        var $checkbox = $(".mod-comment").find("input[type=checkbox]"),
            $checked  = $checkbox.attr("checked"),
            $label    = $(".mod-comment .submit label");
            var is    = true;
            $label.on("click",function(){
                $(this).toggleClass("current");
            })
    }
    var loadMore = function(){
        var $button     = $(".load-more .btn"),
            rows        = $(".mod-comment .total").text(),
            _p          = 1,
            is_admin    = IS_ADMIN==="1" ? true : false;
        rows = rows.slice(1,rows.length-1);
        function get(){
            var parms = {
                            _m     : "learn",
                            _c     : "load_more_comment",
                            p_id   : p_id,
                            _p     : _p
                        };
            $button.addClass('disabled').html('正在加载');
            $.get(Tmt.api.default_api,parms,function(data){
                var comm_length = data.comments.length;
                if(comm_length!=0){
                    var items       = data.comments,
                        html        = "";
                    for(var i in items){
                        html += '<li class="clear"><a href="';
                        items[i].url ? html += items[i].url : html += "javascript：void(0)";
                        html +='">'+items[i].avatar
                             +  '</a><div class="right" id="'+items[i].comment_ID+'">'
                             +  '<p class="who"><span class="name keyword"><a  href="';
                        items[i].url ? html += items[i].url : html += "javascript：void(0)";
                        html +='">'+items[i].comment_author+'</a></span><span class="time">'+items[i].comment_date+'</span>';
                        is_admin ? html += '<span class="set-top fr"><a class="js-top" href="">置顶</a><span class="line">|</span><a class="js-del" href="">删除</a></span>' : "";
                        html += '</p><p class="comment-cont">'+items[i].comment_content+'</p>'
                             +  '<p class="info"><span class = "js-reply"><i class="icon-forward"></i>回复</span><span class="js-praise"><i class="icon-praise"></i><span class="total"> '+items[i].like_total+'</span> 次赞</p></div>';
                        if(items[i].child){
                            var child=items[i].child;
                            for(var j in child){
                                html += '<div class="child-comment"><i class="icon-reply"></i><a href="';
                                child[j].url ? html += child[j].url : html += "javascript：void(0)";
                                html +='">'+child[j].avatar
                                     +  '</a><div class="right" id="'+child[j].comment_ID+'">'
                                     +  '<p class="who"><span class="name keyword"><a  href="';
                                child[j].url ? html += child[j].url : html += "javascript：void(0)";
                                html += '">'+child[j].comment_author+' </a></span><span>回复了</span><span class="name keyword"><a href="';
                                items[i].url ? html += items[i].url : html += "javascript：void(0)";
                                html += '"> '+items[i].comment_author+'</a></span><span class="time">'+child[j].comment_date+'</span>';
                                is_admin ? html += '<span class="set-top fr"><a class="js-del" href="">删除</a></span>' : "";
                                html += '</p><p class="comment-cont">'+child[j].comment_content+'</p>'
                                     +  '<p class="info"><span class = "js-reply"><i class="icon-forward"></i>回复</span><span class="js-praise"><i class="icon-praise"></i><span class="total"> '+child[j].like_total+'</span> 次赞</p></div>'
                                if(child[j].child){
                                    var t_child=child[j].child;
                                    for(var k in t_child){
                                        html += '<div class="child-comment"><i class="icon-reply"></i><a href="';
                                        t_child[k].url ? html += t_child[k].url : html += "javascript：void(0)";
                                        html +='">'+t_child[k].avatar
                                             +  '</a><div class="right" id="'+t_child[k].comment_ID+'">'
                                             +  '<p class="who"><a  href="';
                                        t_child[k].url ? html += t_child[k].url : html += "javascript：void(0)";
                                        html += '">'+t_child[k].comment_author+' </a></span><span>回复了</span><span class="name keyword"><a href="';
                                        child[j].url ? html += child[j].url : html += "javascript：void(0)";
                                        html += '"> '+child[j].comment_author+'</a></span><span class="time">'+child[j].comment_date+'</span>';
                                        is_admin ? html += '<span class="set-top fr"><a class="js-del" href="">删除</a></span>' : "";
                                        html += '</p><p class="comment-cont">'+t_child[k].comment_content+'</p>'
                                             +  '<p class="info"><span class = "js-reply"><i class="icon-forward"></i>回复</span><span class="js-praise"><i class="icon-praise"></i><span class="total"> '+t_child[k].like_total+'</span> 次赞</p></div></div>';
                                    }
                                }
                                        html += '</div>';
                            }
                        }
                        html += '</li>'
                    }

                    $(".mod-comment .list").append(html)
                    $button.removeClass('disabled').html('加载更多');
                    $button.one("click",handle);
                    comm_length<15 ? $button.html('没有更多了').remove():"";
                }else{
                    $button.html('没有更多了').remove();
                }
            },'json')
        }
        function handle(){
            _p+=1;
            get();
        }
        $button.one("click",handle)
    }
    var del = function(){
        $(".mod-comment ").on("click",".js-del",function(){
            var id = $(this).parents(".right").attr("id"),
                $this = $(this);
            Tmt.global.custom_Confirm("确定要删除这条评论？");
            $("#system-confirm-tip .js-confirm").one("click",function(){
                $this.parents(".right").parent(".child-comment, li").fadeOut();
                handle(id);
            });
            return false;
        });
        function handle(c_id){
            var parms={
                _m   : "learn",
                _c   : "comment_ajax",
                act  : "del",
                c_id : c_id
            }
            $.get(Tmt.api.default_api,parms);
        }
    }
    var unTop = function(){
        $(".mod-comment").on("click",".js-un-top",function(){
            var id = $(this).parents(".right").attr("id");
            $(this).text("置顶").removeClass("js-un-top").addClass('js-top');
            $(this).parents(".right").find(".hot").remove();
            handle(id);
            return false;
        });
        function handle(c_id){
            var parms={
                _m   : "learn",
                _c   : "comment_ajax",
                act  : "unTop",
                c_id : c_id
            }
            $.get(Tmt.api.default_api,parms);
        }
    }
    var setTop = function(){
        $(".mod-comment").on("click",".js-top",function(){
            $(this).text("取消置顶").removeClass("js-top").addClass('js-un-top');
            var id = $(this).parents(".right").attr("id"),
                html ="";
            $("#"+id).parents("li").fadeOut(function(){
                $("#"+id).parents("li").find(".time").eq(0).after('<span class="hot">有钛度</span>');
                $("#"+id).parents("li").find(".reply-part").remove();
                html = '<li class="clear" style="display:none">'+$("#"+id).parents("li").html()+'</li>';
                $("#"+id).parents("li").remove();
                $(".mod-comment .list").prepend(html);
                Tmt.global.animateGoto($(".mod-comment").position().top,function(){
                    $("#"+id).parents("li").fadeIn();
                });

            });
            handle(id);
            return false;
        });
        function handle(c_id){
            var parms={
                _m   : "learn",
                _c   : "comment_ajax",
                act  : "setTop",
                c_id : c_id
            }
            $.get(Tmt.api.default_api,parms);
        }
    }
    var praise = function(){
        $(".mod-comment").on("click",".js-praise",function(){
            if(!$(this).hasClass('disable')){
                $(this).addClass('disable');
                var id     = $(this).parents(".right").attr("id"),
                    $total = $(this).find(".total"),
                    num     = parseInt($total.text());
                var parms={
                    _m   : "learn",
                    _c   : "comment_ajax",
                    act  : "zan",
                    c_id : id
                }
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data.code===10031){
                        $total.text(" "+(num+1));
                    }else{
                        Tmt.global.custom_Alert(data.msg)
                    }
                },"json");
                return false;
            }
        });
    }
    var comment = function(){
        var $button   = $(".mod-comment .submit .btn"),
            value     = "",
            html      = "",
            is_admin    = IS_ADMIN==="1" ? true : false;
        $(".mod-comment textarea").focus(Tmt.global.check_login);
        var handle = function(){
            if(Tmt.global.check_login()){
                value = $.trim($(".mod-comment textarea").val());
                if(value===""){
                    Tmt.global.custom_Alert("请先填写评论内容");
                    $button.one("click",handle);
                }else{
                    var is_share_sina   = $(".label-sina").hasClass('current') ? true : false,
                        is_share_tecent = $(".label-tecent").hasClass('current') ? true : false,
                        from            = $(".share-txt").attr("from"),
                        mid             = "";
                        if(is_share_sina&&is_share_tecent){
                            mid = "1,2"
                        }else{
                            if(is_share_sina){
                                mid = "1";
                            }
                            if(is_share_tecent){
                                mid = "2";
                            }
                        }
                    var parms = {
                        _m          : "learn",
                        _c          : "comment_ajax",
                        act         : "comment",
                        parent_id   : 0,
                        p_id        : p_id,
                        comm_conent : value,
                        from        : from,
                        mid         : mid
                    }
                    $.get(Tmt.api.default_api,parms,function(data){
                        if(data.code===1){
                            html='<li class="clear">'
                                +   data.avatar
                                +       '<div class="right" id="'+data.comment_id+'">'
                                +       '<p class="who"><span class="name keyword">'+data.user_name+'</span><span class="time">刚刚</span>';
                                is_admin ? html += '<span class="set-top fr"><a class="js-top" href="">置顶</a><span class="line">|</span><a class="js-del" href="">删除</a></span>' : "";
                            html += '</p><p class="comment-cont">'+value+'</p>'
                                +       '<p class="info"><span class = "js-reply"><i class="icon-forward"></i> 回复</span><span class="js-praise"><i class="icon-praise"></i><span class="total"> 0</span> 次赞</span></p>'
                                +   '</div>'
                                + '</li>'
                            $(".mod-comment .list").prepend(html);
                            $(".mod-comment textarea").val("");
                        }
                        if(data.code===10026){
                            Tmt.global.custom_Alert(data.msg)
                        }
                    $button.one("click",handle);
                    },"json");
                }
            }
        }
        $button.one("click",handle);
    }
    var reply = function(){
        function post($now_comment,child_level,who,value,html){
            var parent_id = child_level >= 2 ? $now_comment.parents(".child-comment").eq(1).find(".right").attr("id") : $now_comment.attr("id"),
                p_id      = $(".mod-comment .post-id").text(),
                parms     = {
                                _m          : "learn",
                                _c          : "comment_ajax",
                                act         : "comment",
                                parent_id   : parent_id,
                                p_id        : p_id,
                                comm_conent : value
                            }
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data.code===1){
                        html='<div class="child-comment"><i class="icon-reply"></i>'
                            +   data.avatar
                            +       '<div class="right" id="'+data.comment_id+'">'
                            +       '<p class="who"><span class="name keyword">'+data.user_name+'</span><span>回复了</span><span class="name keyword">'+who+'</span><span class="time">刚刚</span><span class="set-top fr"><a class="js-del" href="">删除</a></span></p>'
                            +       '<p class="comment-cont">'+value+'</p>'
                            +       '<p class="info"><span class = "js-reply"><i class="icon-forward"></i> 回复</span><span class="js-praise"><i class="icon-praise"></i><span class="total">0</span> 次赞</span></p>'
                            +   '</div>'
                            + '</li>';
                        child_level >=2 ? $now_comment.parents(".child-comment").eq(1).append(html) : $now_comment.after(html);
                        $now_comment.find(".reply-part").remove();
                    }
                    if(data.code===10026){
                        Tmt.global.custom_Alert(data.msg)
                        $now_comment.find(".reply-part .btn").removeClass('disable');
                    }
                },"json");
            }
        function handle(){
            if(Tmt.global.check_login()){
                var $now_comment=$(this).parents(".right"),
                    who         = $now_comment.find(".name").eq(0).text(),
                    child_level = $now_comment.parents(".child-comment").length,
                    html        = '<div class="reply-part clear"><textarea placeholder="回复 '+who+'" class="reply-input" rows="1"></textarea><div class="button fr"><span class="cancel">取消</span><button class="btn btn-long">评论</button></div></div>';
                $now_comment.find(".reply-part").length===0 ? $now_comment.append(html) : $now_comment.find(".reply-part").remove();
                Tmt.plugins.ready("autosize",function(){
                    $('textarea.reply-input').autosize({append:false});
                });
                $now_comment.find("textarea").focus();
                $now_comment.find(".reply-part .cancel").click(function(){
                    $(this).parents(".reply-part").remove();
                });
                $now_comment.find(".reply-part .btn").on("click",function(){
                    var value = $.trim($now_comment.find("textarea").val());
                    if(value===""){
                        Tmt.global.custom_Alert("请先填写回复内容");
                    }else if(!$(this).hasClass('disable')){
                        $(this).addClass('disable');
                        post($now_comment,child_level,who,value,html);
                    }
                });
            }
        }
        $(".mod-comment").on("click",".js-reply",handle);
    }
    var setLike = function(){
        function handle(){

            var parms   =   {
                                _m       : "learn",
                                _c       : "like_post_action",
                                pid      : p_id,
                                is_like  : $(this).hasClass("current") ? "false" : "true"
                            },
                $this    =  $(this),
                like_num =  parseInt($(this).find(".num").text());
            if($this.hasClass('current')){
                return ;
            }
            $.get(Tmt.api.default_api,parms,function(data){
                if(data.code===1){
                    $this.toggleClass('current');
                    $this.hasClass("current") ? $this.find(".num").text(like_num+1) : $this.find(".num").text(like_num-1);
                }else if(data.code===10029){
                    // Tmt.global.custom_Alert(data.msg);
                }
            },'json');
        }
        $(".js-operate .js-like").on("click",handle);
    }
    var setCollect = function(){
        function handle(){
            if(Tmt.global.check_login()){
                var parms={
                            _m  : "learn",
                            _c  : "colloct_post",
                            pid : p_id,
                            act : $(this).hasClass("current") ? "delete"  : "add"
                    },
                $this = $(this),
                coll_num =  parseInt($(this).find(".num").text());
                if($this.hasClass('disable')){
                    return ;
                }
                $this.addClass('disable');
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data.code===10044||data.code===10043){
                        $this.toggleClass('current');
                        $this.removeClass('disable')
                        $this.hasClass("current") ? $this.find(".num").text(coll_num+1) : $this.find(".num").text(coll_num-1)
                    }else if(data.code===10042){
                        Tmt.global.custom_Alert(data.msg);
                    }else{

                    }
                },'json');
            }
        }
        $(".js-operate .js-collect").on("click",handle);
    }
    var share = function(){
        var $button = $(".js-operate .js-share");
            $button.click(function(){
                $(".pop-panel").addClass('active');
            });
            $(document).click(function(event){
                if(!$(event.target).hasClass('js-share')){
                    $(".pop-panel").removeClass('active');
                }
            })
    }
    var scrollFav = function(){
        var $fav = $(".cont .reminder");
        $(window).scroll(function(){
            var top = $(this).scrollTop(),
                f_t  = $fav.offset().top - 600;
            if(top >= f_t){
                $(".js-operate").removeClass("js-operate-out");
            }else{
                $(".js-operate").addClass("js-operate-out");
            }
        })
    }
    var init = function(){
        loadMore();
        del();
        setTop();
        unTop();
        praise();
        comment();
        reply();
        setLike();
        setCollect();
        share();
        scrollFav();
    }
    return{
        setCheckbox: setCheckbox(),
        loadMore   : loadMore,
        init       : init
    }
}();

// 我的收藏
Tmt.my_article = function(){
    var del_bookmark = function(){
        function handle(){
            var id = $(this).parents("li.article").attr("id").substr(3);
            var parms= {
                _m  : "learn",
                _c  : "colloct_post",
                pid : id,
                act : "delete"
            }
            Tmt.global.custom_Confirm("确定要删除这篇收藏文章？");
            $("#system-confirm-tip .js-confirm").one("click",function(){
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data){
                        $("#id_"+id).fadeOut().remove();
                    }
                });
            });
        }
        $(".has-border-bottonm").on("click",".del-article",handle);
    }
    var del_article = function(){
        function handle(){
            var id = $(this).parents("li.article").attr("id").substr(3);
            var parms= {
                _m        : "learn",
                _c        : "delete_post_draft",
                post_guid : id,
                type      : $(".reject").hasClass('current') ? "reject" : "draft"
            }
            Tmt.global.custom_Confirm("确定要删除这篇文章吗？");
            $("#system-confirm-tip .js-confirm").one("click",function(){
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data){
                        $("#id_"+id).fadeOut().remove();
                    }
                });
            });
        }
        $(".has-border-bottonm").on("click",".del-article",handle);
    }
    return{
        del_bookmark : del_bookmark,
        del_article  : del_article
    }
}();

//作者相关
Tmt.author = function(){
    //加载circle插件
    var initCircle= function(){
        Tmt.plugins.ready("circles-master",function(){
            for(var i = 1; i<5; i++){
                Circles.create({
                    id:         "circles-"+i,
                    value:      $("#circles-"+i).attr("data-percent"),
                    radius:     50,
                    width:      3,
                    colors:     ["#d8d8d8","#fd6639"]
                });
            }
            $("#canvas").css("visibility","visible");
                var num = [],
                st_num = [],
                timer  = []
                num[1]    = $(".js-num-1").attr("data-num");
                st_num[1] = 0;
                timer[1]  = setInterval(function(){
                    if(st_num[1]<num[1]){
                        st_num[1]+=1
                        $(".js-num-"+1).text(st_num[1]);
                    }else{
                        clearInterval(timer[1])
                    }
                },10);
                num[2]    = $(".js-num-2").attr("data-num");
                st_num[2] = 0;
                timer[2]  = setInterval(function(){
                    if(st_num[2]<num[2]){
                        st_num[2]+=1
                        $(".js-num-"+2).text(st_num[2]);
                    }else{
                        clearInterval(timer[2])
                    }
                },10);
                num[3]    = $(".js-num-3").attr("data-num");
                st_num[3] = 0;
                timer[3]  = setInterval(function(){
                    if(st_num[3]<num[3]){
                        st_num[3]+=1
                        $(".js-num-"+3).text(st_num[3]);
                    }else{
                        clearInterval(timer[3])
                    }
                },10);
                num[4]    = $(".js-num-4").attr("data-num");
                st_num[4] = 0;
                timer[4]  = setInterval(function(){
                    if(st_num[4]<num[4]){
                        st_num[4]+=1
                        $(".js-num-"+4).text(st_num[4]);
                    }else{
                        clearInterval(timer[4])
                    }
                },10);
        })
    }
    var attention =function(){
        $(document).on('click', '.js-attention', function(e) {
            if(Tmt.global.check_login()){
                var $this = $(this),
                    action = "",
                    id = $this.attr('id');
                if($this.hasClass('btn')){
                    $this.toggleClass('btn-gray');
                }
                $this.toggleClass("current")
                if($this.hasClass('current')){
                    $this.html('取消关注');
                    action="follow";
                }else{
                    $this.hasClass('focus') ? $this.html('关注') : $this.html('<span class="add">+</span> 关注');
                    action="delete";
                }
                $.get('/ajax',{
                        _m          : 'zone',
                        _c          : 'togglefollowuser',
                        action      : action,
                        follower_id : id
                });
                e.preventDefault();
            }
            return false;
        });
    }
    var listAttention =function(){
        $(document).on('click', '.js-attention', function(e) {
            if(Tmt.global.check_login()){
                var $this = $(this),
                    action = "",
                    id = $this.attr('id');
                $this.toggleClass('current');
                if($this.hasClass('current')){
                    $this.html('取消关注');
                    action="follow";
                }else{
                    $this.html('<span class="add">+</span>关注');
                    action="delete";
                }
                $.get('/ajax',{
                        _m          : 'zone',
                        _c          : 'togglefollowuser',
                        action      : action,
                        follower_id : id
                },'json');
                e.preventDefault();
            }
            return false;
        });
    }
    var vote = function(){
        $(".author_vote").click(function(){
            if(Tmt.global.check_login()){
                if($(this).hasClass('current')){
                    return;
                }
                var vote_obj = $(this).attr("trace") || "",
                    $obj = $(this);
                $.get(Tmt.api.default_api, {
                    _m : "author",
                    _c : "vote_author",
                    vote_obj:vote_obj
                },
                function (data){
                    if(data.status===1) {
                        $obj.prev().find(".num").html(data.vote_num);
                        $obj.addClass("current").text("已投票");
                    }else{
                        Tmt.global.custom_Alert(data.msg);
                    }
                },"json");
            }
          });
    }
    var setStar = function(){
        var $button = $(".set-star");
        var handle = function(){

            if($(this).hasClass('disable')){
                return
            }
            if(Tmt.global.check_login()){
                $(this).addClass('disable');
                var vote_obj = $(this).attr("id"),
                    $total   = $(this).find(".star-num"),
                    num      = parseInt($total.text());
                var parms    = {
                                _m       : "author",
                                _c       : "vote_author",
                                vote_obj : vote_obj
                            }
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data.status===1){
                        $total.text(num+1);
                    }else{
                        Tmt.global.custom_Alert(data.msg)
                    }
                },"json");
                return false;
            }
        }
        $button.click(handle);
    }
    var work_in = function(){
        var $button = $(".js-work-in")
        var handle  = function(){
            if($(this).hasClass('disable')){
                return;
            }
            if(Tmt.global.check_login()){
                $(this).addClass('disable');
                var atc   = $(this).hasClass('current') ? "delete_action" : "add_action",
                    id    = $(this).attr("id"),
                    parms = {
                    _m   : "tag",
                    _c   : atc,
                    c_id : id
                }
                $button.toggleClass("current");
                if($button.hasClass('current')){
                    $button.html("取消任职");
                }else{
                    $button.html("曾在此任职");
                }
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data.status===1){
                        $button.removeClass('disable')
                    }else{
                        Tmt.global.custom_Alert(data.msg);
                    }
                },"json")
            }
        }

        $button.on("click",handle);
    }
    var ranking = function(){
        var $select = $("ul.order-by"),
            time    = "";
        var handle = function(){
            $select.slideUp('fast');
            if(!$(this).hasClass("current")){
                var order_by = $(this).attr("id"),
                    sel_text = $(this).text();
                    order_by = order_by.slice(3,order_by.length);
                var parms={
                    _m  : "author",
                    _c  : "author_sort",
                    s_t : order_by
                }
                $select.find("li.current").removeClass("current")
                $(".order-list li.current").removeClass("current");
                $(this).addClass('current');
                $(".top-l .select").html(sel_text+'<i class="icon-arr-down"></i>')
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data){
                        var html="";
                        for(var i in data){
                            html += '<li class="author clear"><a target="_blank" href="/author/'+data[i].info[0].user_login+'" class="pic verified-photo-40 fl">'+data[i].avatar;
                            if(data[i].authentication!=null){
                                html += '<i class="icon-vip-'+data[i].authentication+'"></i><i class="icon-vip-backgroud"></i>';
                            }
                            html +=  '</a><ul class="num"><li class="num-coin">'+data[i].coin+'</li><li class="num-article">'+data[i].posts+'</li><li class="num-top">'+data[i].top+'</li><li class="num-fans">'+data[i].fans+'</li><li class="num-comment">'+data[i].comm_num+'</li></ul></li>';
                        }
                        $(".order-list").find("li.by-"+order_by).addClass('current');
                        $(".ranking-author .author-list").empty().append(html);
                    }
                },"json");
            }
            return false;
        }
        $(".top-l .select").hover(function(){
            $select.slideDown('fast');
        });
        $select.hover(function(){
            clearTimeout(time);
        })
        $(".top-l .select, ul.order-by").mouseout(function(){
            var s = event.toElement || event.relatedTarget;
            if(!(this).contains(s)){
                time =setTimeout(function(){
                    $select.slideUp('fast');
                },300)
            }
        });
        $select.find("li:not('.select')").click(handle)
    }
    var sendMassage = function(){
        var $button      = $("#send_alert .js-send"),
            id           = $(".send_alert_open").attr("id"),
            $input       = $("#send_alert textarea"),
            $name        = $("#send_alert").find(".name"),
            $error_msg   = $("#send_alert .error-msg"),
            old_name     = $name.text(),
            author_name  = $(".author-intro .name").text(),
            to_name      = "";
        var handle  = function(){
            var content = $.trim($("#send_alert textarea").val()),
                parms={
                _m   : "author",
                _c   : "notification",
                main : content,
                to   : id
            }
            if($.trim($input.val())===""){
                $error_msg.html('<i class="icon-error"></i>请输入内容');
            }else{
                $.post(Tmt.api.default_api,parms,function(data){
                    if(data.status===1){
                        $(".send_alert_close:eq(0)").click()
                        Tmt.global.showPageMsg("success","发送成功")
                        Tmt.global.animateGoto(0)
                        $input.val("");
                    }
                    if(data.error_code===10004){
                        $error_msg.html('<i class="icon-error"></i>请发送有意义的内容');
                    }
                },"json")
            }
            return false
        }
        $(".send_alert_close").click(function(){
            $name.text(old_name);
            $error_msg.html("");
        });
        var select_handle = function(){
            to_name = $(this).parents("li").find(".name");
            if(to_name.length===1||($.trim(to_name.eq(1).text())===$.trim($(".head-1 .name").text()))){
                to_name = to_name.eq(0).text();
            }else{
                to_name = to_name.eq(1).text();
            }
            if(Tmt.global.check_login()){
                if($name.text()!=to_name&&to_name!=""){
                    $name.text(to_name);
                }
                id = ($(this).attr("id"));
                $(".send_alert_open").unbind();
                $("#send_alert").popup({transition: 'all 0.3s'});
                $(".send_alert_open").click()
                $(".send_alert_open").unbind();
                $(".send_alert_open").click(select_handle);
            }
            return false;
        }
        $(".send_alert_open").click(select_handle);
        $button.click(handle);
    }
    var init= function(){
        initCircle();
        attention();
        vote();
        setStar();
        ranking();
        sendMassage();
    };
    //by Arianrhod
    var loadMore = function(){
        var offset = 10;
        var $people_list = $('.peopel-list');
        var $load_more = $('.load-more');
        var pre_html = $load_more.html();
        var sum = parseInt($people_list.data('sum'),10);
        $load_more.click(function(){
            if($load_more.hasClass('disabled')){
                return;
            }

            $load_more.addClass('disabled').children().html('正在加载');
            $.ajax({
                url: location.pathname,
                data: {
                    offset: offset
                }
            }).done(function(html){
                $people_list.append(html);
                offset += 10;
                console.log($people_list.children().length, sum);
                if($people_list.children().length >= sum || !html){
                    $load_more.hide();
                }
            }).always(function(){
                $load_more.removeClass('disabled').html(pre_html);
            });
        });
    };
    return  {
                init          : init,
                attention     : attention,
                work_in       : work_in,
                sendMassage   : sendMassage,
                setStar       : setStar,
                listAttention : listAttention,
                loadMore: loadMore
            }
}();

Tmt.tags = function(){
    var $li_tag    = $("ul.tag-list li.tag"),
        $pop_panel = "",
        time       = "";
    var attention = function(){
        var handle = function(){
            if($pop_panel.hasClass('disable')){
                return;
            }
            if(Tmt.global.check_login()){
                $pop_panel.addClass('disable');
                var id = $pop_panel.attr("id");
                var parms = {
                    _m      : "tag",
                    _c      : "rss_tag",
                    term_id : id
                }
                $pop_panel.toggleClass('current');
                $pop_panel.parents("li.tag").toggleClass('current')
                if($pop_panel.hasClass('current')){
                    $pop_panel.text("取消订阅");
                }else{
                    parms.action = "delete";
                    $pop_panel.text("订阅标签");
                }
                $.get(Tmt.api.default_api,parms,function(data){
                    $pop_panel.removeClass('disable');
                },"json")
            }
        }
        $li_tag.find(".js-tag-attention").hover(function(){
            $pop_panel=$(this).parents("li.tag").find(".pop-panel");
            $li_tag.find(".active").removeClass('active')
            $pop_panel.addClass('active');
            $pop_panel.unbind("click")
            $pop_panel.on("click",handle);
        });
        $(document).click(function(event){
            if(!$(event.target).hasClass('pop-panel')){
                $(".pop-panel").removeClass('active');
            }
        })
        $li_tag.mouseout(function(){
            var s = event.toElement || event.relatedTarget,
                $this = $(this);
            if(!(this).contains(s)){
                time = setTimeout(function(){
                    $this.find(".pop-panel").removeClass('active');
                }, 300);
            }
        });
        $li_tag.find(".pop-panel").mouseover(function(){
            clearTimeout(time);
        })
    }
    return {
        attention :　attention
    }
}();

/*
    我要投稿
    by tamamadesu
    2014-08-13 9:27 AM
*/
Tmt.draft = function(){

    var  draft_del_self;  //当前选中的草稿

    // 添加草稿到列表
    var append_draft = function(data){
        if($("input[name='post_id']").val()*1){
            $('#id_'+data.id).find(".title a").html('<span class="d">[草稿]</span> '+data.title);
        }else{
            var html = '<li class="normal" id="id_'+data.id+'" style="display:none">'+
                       '   <h3 class="title"><a href="###"><span class="d">[草稿]</span> '+(data.title ? data.title : "未命名")+'</a></h3>'+
                       '   <div class="detail">'+
                       '     <span class="time">刚刚</span>'+
                       '     <p class="opt">'+
                       '       <a href="###" data-href="/ajax?_m=learn&_c=edit_post_draft&post_guid='+data.id+'" class="edit">编辑</a> | <a href="###" data-href="/ajax?_m=learn&_c=delete_post_draft&post_guid='+data.id+'" class="del delete_draft_open">删除</a>'+
                       '     </p>'+
                       '   </div>'+
                       ' </li>';
            $("input[name='post_id']").val(data.id);
            $(".article .draft-bar").removeClass("fn-hide");
            $(".article .draft-bar ul").prepend(html);
            $(".article .draft-bar ul li:first").slideDown();
        }
    }
    // 保存草稿
    var save_draft = function(){
        tinyMCE.triggerSave();
        var post_id           = $("input[name='post_id']").val(),  //文章ID，如果是新建草稿则留空
            first_publish_tmt = $("input[name='first_publish_tmt']").prop("checked"),  //是否钛媒体首发
            title             = $("input[name='title']").val(),   //文章标题
            post_excerpt      = $.trim($("textarea[name='post_excerpt']").val()),   //文章摘要
            content           = $.trim($("textarea[name='post_article']").val()),   //文章正文
            tgid              = $("select[name='tgid']").val();  //话题ID，如果没有则留空

        if(!title && !post_excerpt && !content){
            return false;
        }

        var parms = {
                        post_id           : post_id,
                        first_publish_tmt : first_publish_tmt,
                        title             : title,
                        post_excerpt      : post_excerpt,
                        content           : content,
                        tgid              : tgid
                    };
        $.post(Tmt.api.save_post_draft,parms,function(data){
            Tmt.global.showPageMsg("success","保存成功！");
            // $(window).unbind("beforeunload");
            Tmt.global.animateGoto(0);
            append_draft({title:title,id:data.ID});
        },"json");
        return false;
    }


    // 提交审核
    var commit_draft = function($){
        $(window).unbind("beforeunload");
        tinyMCE.triggerSave();
        $("textarea[name='content']").val($("textarea[name='post_article']").val());
        $("#draft-form").submit();
    }

    // reset form
    var reset = function(){
        var id         = $(draft_del_self).attr("data-href").split("post_guid=")[1]*1,
            current_id = $("input[name='post_id']").val()*1;
        if(id === current_id){
            $("input[name='post_id']").val('');
            tinyMCE.editors[0].setContent('');
            $("input[name='first_publish_tmt']").prop("checked",false);
            $("input[name='title']").val('');
            $("textarea[name='post_excerpt']").val('');
            $("textarea[name='post_article']").val('');
            $("select[name='tgid']").val(0);
        }
    }

    // 载入草稿
    var load_draft = function($){

        function refill(data){
            var $cont = $(".article .write-content");
            $cont.find('input[name="title"]').val(data.post_title);
            $cont.find('textarea[name="post_excerpt"]').val(data.post_excerpt);
            $cont.find('textarea[name="content"]').val(data.post_content);
            tinyMCE.editors[0].setContent(data.post_content);
            $("input[name='post_id']").val(data.post_guid);

            $("input[name='first_publish_tmt']").prop("checked",data.first_publish_tmt ? true : false);
            $("select[name='tgid']").val(data.tgid);
            if(data.first_publish_tmt){
                $(".write-bar .v-box").addClass('current');
            }else{
                $(".write-bar .v-box").removeClass('current');
            }
            var new_text = $("select[name='tgid']").find("option[value='"+data.tgid+"']").text();
            $("select[name='tgid']").next(".dropdown-part").find(".text").html(new_text);
        }

        $(".article .draft-bar").delegate(".normal .edit","click",function(){
            $(".article .draft-bar li").addClass("normal").removeClass("editing");
            $(".article .draft-bar li").find(".del").addClass("delete_draft_open").unbind();
            $(this).parents("li").addClass("editing").removeClass("normal");
            var href = $(this).attr("data-href");
            $.get(href,function(data){
                refill(data);
                Tmt.global.animateGoto(186);
            },"json");

            $(this).parents("li").find(".del").removeClass("delete_draft_open").bind("click",function(){
                return false;
            });

            return false;
        })
        $(".article .draft-bar").delegate(".normal .del","click",function(){
            draft_del_self = this;
        });

        $("#delete_draft .confrim").click(function(){
            $.get($(draft_del_self).attr("data-href"),function(data){
                $("#delete_draft").popup("hide");
                if(data.code === 1){
                    $(draft_del_self).parents("li").slideUp();
                    Tmt.global.showPageMsg("success","删除成功！");
                    reset();
                }else{
                    Tmt.global.showPageMsg("error","服务器错误！");
                }
                Tmt.global.animateGoto(0);
            },"json");
        })
    }

    // 弹窗相关
    var pop_about = function(){
        $("#commit_draft").popup({transition: 'all 0.3s'});
        $("#delete_draft").popup({transition: 'all 0.3s'});
        $(window).bind("beforeunload",function() {
            tinyMCE.triggerSave();
            $("textarea[name='content']").val($("textarea[name='post_article']").val());

            var title             = $("input[name='title']").val(),   //文章标题
                post_excerpt      = $.trim($("textarea[name='post_excerpt']").val()),   //文章摘要
                content           = $.trim($("textarea[name='content']").val());   //文章正文

            if(title || post_excerpt || content){
                return '您编辑的文章尚未保存，离开会使内容丢失。\n你可以选择保存草稿之后再离开页面。确认离开此页吗？';
            }
        });
    }
    // 初始化
    function init($){
        pop_about();
        load_draft($);
        $(".article .write-bar .save_draft").bind("click",save_draft)
        $("#commit_draft .confrim").click(function(){
            commit_draft($);
        });
    }



    return{
        init:init
    }
}();

// 用戶中心
// Arianrhod
// 2014-08-17
Tmt.dashboard = (function() {
    //by Arianrhod
    function init() {
        var $selected_tags = $('.selected-tags');
        var $all_tags = $('.all-tags');
        var $following_users = $('.following-users');
        var $all_users = $('.all-users');
        var $subscribe_part = $('.subscribe-part');
        var $part_toggle_link = $('.part-toggle-link');


        var $selected_tags_data = $('.selected_tags_data');
        var $selected_authors_data = $('.selected_authors_data');

        var syncTagData = function() {
            var val = [];
            $selected_tags.children().each(function(index, el) {
                val.push(el.id.slice('selected_tag_'.length));
            });
            val = val.join(',');
            $selected_tags_data.val(val);
        };
        var syncAuthorData = function() {
            var val = [];
            $following_users.children().each(function(index, el) {
                val.push($(el).find('.attention')[0].id.slice('following_user_'.length));
            });
            val = val.join(',');
            $selected_authors_data.val(val);
        };


        // by tamamadesu
        // 成功提示信息
        var prot = function($self, txt) {
            $self.find(".success").remove();
            $self.append('<div class="success"><span class="icon-current"></span>&nbsp;' + txt + '</div>')
            var $success = $self.find(".success");
            $success.show();

            setTimeout(function() {
                $success.remove();
            }, 4000);

            refreshPosts();
        };

        var _xhr;
        var refreshPosts = function() {
            if (_xhr) {
                _xhr.abort();
                return;
            }

            _xhr = $.ajax({
                url: '/dashboard/feeds'
            }).done(function(data) {
                var html = $(data).find('.my-content').html();
                if (html) {
                    $('.my-content').html(html);
                    bind();
                }
                _xhr = null;
            });
        };
        //载入更多
        var bind = function() {
            var $button = $(".load-more .btn"),
                rows = $(".js-feed-rows").text(),
                limit = 10,
                rows = rows.slice(1, rows.length - 1);
            var offset = 0;

            function get(offset) {
                var parms = {
                    _m: "zone",
                    _c: "GetUserFeeds",
                    limit: limit,
                    offset: offset
                };
                $button.addClass('disabled').html('正在加载');
                $.get(Tmt.api.default_api, parms, function(data) {
                    var items = data.items,
                        html = "",
                        category = "",
                        cat_length = "";
                    for (var i in items) {
                        category = items[i].category_arr;
                        cat_length = category.length;
                        html += '<li class="clear article">' + '<div class="show"><a target="_blank" href="/' + items[i].ID+ '.html" class="tit">' + items[i].post_title + '</a><p class="info"><a target="_blank" href="/author/' + items[i].user_login + '" class="author">' + items[i].display_name+ '</a><span class="point">•</span><span class="time">' + items[i].post_date + '</span>';
                        html += '<span class="point">•</span><span><a target="_blank" href="/' + items[i].ID + '.html#comment">' + items[i].comment_count + ' 条评论</a></span></p><p class="part">' + items[i].post_excerpt + '</p></div></li>';
                    }
                    $(".my-content .mod-article-list").append(html)
                    $button.removeClass('disabled').html('加载更多');
                    $button.one("click", handle);

                    var max = parseInt($('.js-feed-rows').html().slice(1));
                    var current = $('.mod-article-list').children().length;
                    if (max === current) {
                        $button.addClass('fn-hide');
                    }
                }, 'json');
            }

            function handle() {
                offset += limit;
                if (offset > rows) {
                    $button.html("没有更多了");
                } else {
                    if ((offset + limit) > rows) {
                        $button.html("没有更多了");
                    }
                    get(offset);
                }
            }
            $button.one("click", handle);
        };

        bind();

        //展开和折叠
        $('.part-toggle-link').click(function() {
            $subscribe_part.toggleClass('fn-hide');
            $part_toggle_link.toggleClass('fn-hide');
        });

        //取消订阅标签
        $selected_tags.on('click', '.tag', function(e) {
            var $this = $(this).remove();
            var id = $this.attr('id').slice('selected_tag_'.length);
            $all_tags.children('#all_tag_' + id).removeClass('current fn-hide');
            syncTagData();
            e.preventDefault();
            return false;
        });

        //添加订阅标签
        $all_tags.on('click', '.tag', function(e) {
            var $this = $(this).toggleClass('current fn-hide');
            var id = $this.attr('id').slice('all_tag_'.length);
            if ($this.hasClass('current')) {
                $this.addClass('fn-hide').clone().removeClass('fn-hide').attr('id', ('selected_tag_' + id)).appendTo($selected_tags);
            } else {
                $selected_tags.children('#selected_tag_' + id).click();
            }
            syncTagData();
            e.preventDefault();
            return false;
        });

        //取消关注作者
        $following_users.on('click', '.attention', function(e) {
            var $this = $(this);
            var id = $this.attr('id').slice('following_user_'.length);
            $this.parents('li').first().remove();
            var $tag = $('#all_user_' + id).removeClass('current')
            $tag.parents('li').first().toggleClass('fn-hide');
            if ($tag[0]) {
                $tag.html('关注<span class="add">+</span>');
            }
            syncAuthorData();
            e.preventDefault();
            return false;
        });

        //添加关注作者
        $all_users.on('click', '.attention', function(e) {
            var $this = $(this).toggleClass('current');
            var id = $this.attr('id').slice('all_user_'.length);
            $this.html($this.html().length > 4 ? '取消关注' : '关注<span class="add">+</span>');
            if ($this.hasClass('current')) {
                $this.parents('li').first().clone().appendTo($following_users).find('.attention').attr('id', ('following_user_' + id));
            } else {
                var $tag = $('#following_user_' + id).click();
                $tag.html($tag.html().length > 4 ? '取消关注' : '关注<span class="add">+</span>').parents('li').first().remove();
            }
            $this.parents('li').first().toggleClass('fn-hide');
            syncAuthorData();
            e.preventDefault();
            return false;
        });

        //提交关注标签
        $('.subscribe-part-tags').submit(function(e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.hasClass('disabled')) {
                return false;
            }
            $this.addClass('disabled').find('.btn-more').val('正在保存');
            $.ajax({
                url: $this.attr('action'),
                method: $this.attr('method'),
                data: $this.serialize()
            }).done(function() {
                // Tmt.global.custom_Alert('订阅成功');
                prot($this, '订阅成功');
            }).always(function() {
                $this.removeClass('disabled').find('.btn-more').val('保存');
            });
            e.preventDefault();
            return false;
        });

        //提交关注作者
        $('.subscribe-part-users').submit(function(e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.hasClass('disabled')) {
                return false;
            }
            $this.addClass('disabled').find('.btn-more').val('正在保存');
            $.ajax({
                url: $this.attr('action'),
                method: $this.attr('method'),
                data: $this.serialize()
            }).done(function() {
                // Tmt.global.custom_Alert('订阅成功');
                prot($this, '订阅成功')
            }).always(function() {
                $this.removeClass('disabled').find('.btn-more').val('保存');
            });
            e.preventDefault();
            return false;
        });

    }
    return {
        init: init
    }
})();

// 个人标签
// Arianrhod
// 2014-08-17

Tmt.mytag = (function(){
    //by Arianrhod
    function init(){
        var $my_tag = $('#my-tag');
        if (!$my_tag[0]) {
            return;
        }

        var $selected_tags = $('.selected-tags');
        var $all_tags = $('.all-tags');
        var $data = $('#selected-tags-data');
        var $subscribe_part = $('.subscribe-part');

        var sync = function(){
            var ids = [];
            $selected_tags.children().each(function(index, el) {
                var id = el.id.slice('selected_tag_'.length);
                ids.push(id);
            });
            $data.val(ids.join(','));
            $.ajax({
                url: $subscribe_part.attr('action'),
                method: $subscribe_part.attr('method'),
                data: $subscribe_part.serialize()
            });
        };

        $selected_tags.on('click', '.tag', function() {
            var $this = $(this).remove();
            var id = $this.attr('id').slice('selected_tag_'.length);
            $all_tags.children('#all_tag_' + id).removeClass('current fn-hide');
            sync();
        });

        $all_tags.on('click', '.tag', function() {
            var $this = $(this).toggleClass('current fn-hide');
            var id = $this.attr('id').slice('all_tag_'.length);
            if($this.hasClass('current')){
                $this.clone().removeClass('fn-hide').attr('id',('selected_tag_' + id)).appendTo($selected_tags);
            } else {
                $selected_tags.children('#selected_tag_' + id).click();
            }
            sync();
        });
    }
    function subscribe(){
        var $button = $(".js-subscribe");
        var handel  = function(){
            if($button.hasClass('disable')){
                return;
            }
            if(Tmt.global.check_login()){
                $button.addClass('disable');
                var id = $button.attr("id");
                var parms = {
                    _m      : "tag",
                    _c      : "rss_tag",
                    term_id : id
                }
                if($button.hasClass("current")){
                    parms.action = "delete";
                }
                $button.toggleClass("current");
                if($button.hasClass('current')){
                    $button.html("取消订阅")
                }else{
                    $button.html("+ 订阅")
                }
                $.get(Tmt.api.default_api,parms,function(data){
                    $button.removeClass('disable');
                },"json")
            }
        }
        $button.click(handel);
    }
    return {
        init      : init,
        subscribe : subscribe()
    }
})();



//竞拍
Tmt.share = (function() {
    var article_slide = function() {
        $(".slide-down").click(function() {
            var $icon = $(this).find("i");
            $icon.hasClass('icon-arr-down') ? $icon.removeClass('icon-arr-down').addClass('icon-arr-up') : $icon.removeClass('icon-arr-up').addClass('icon-arr-down')
            $(this).parents(".auction-panel,.join").next(".article-list").slideToggle();
        });
    }
    var login_check = function(){
        var $button = $(".js-auction");
        var handle = function(){
            if(USER_ID == "0"){
                if(Tmt.global.check_login()){
                    return true;
                }
                return false;
            }
        }
        $button.click(handle)
    }
    var init = function() {
        article_slide();
        login_check();
    }
    return {
        init: init
    }
})();

//用户中心的加载更多
Tmt.dashboard_loadmore = (function() {
    var init = function() {
        var $button = $('.dashboard-load-more').children();
        if (!$button[0]) {
            return;
        }
        var $list = $('.list').children('ul');
        var offset = 10;
        var ajax_url = $('.data-list').children('.current').children('a').attr('href');
        var sum = $('.data-list').children('.current').find('.sum').html().slice(1);
        if($('.category')){
            sum = $.trim($('.category').find('.current').find('.c-num').text()).slice(2);
        }
        sum = parseInt(sum, 10);

        $button.click(function() {
            if ($button.hasClass('disabled')) {
                return;
            } else {
                $button.addClass('disabled').html('正在加载');
                $.ajax({
                    url: ajax_url,
                    data: {
                        offset: offset,
                        post_status: $button.data('type')
                    }
                }).always(function() {
                    $button.removeClass('disabled').html('加载更多');
                }).done(function(data) {
                    $list.append(data);
                    offset += 10;

                    console.log(offset,sum);

                    if (offset > sum || $('.mod-article-list').children().length % 10 != 0 || !$.trim(data)) {
                        $button.animate({
                            opacity: '0'
                        }, 'normal', function() {
                            $button.css({
                                position: 'relative',
                                left: '-9999px'
                            })
                        });
                    }
                }).fail(function() {
                    Tmt.global.custom_Alert('加载失败');
                });
            }
        });
    };
    return {
        init: init
    };
})();

// 用户订阅
// Arianrhod
// 2014-08-17
Tmt.feed = (function() {
    var deg = 0;
    //by Arianrhod
    function init() {
        var $all_tags = $('.all-tags');
        var $all_users = $('.all-users');
        $('.reflush-tags').click(function(e) {
            var $this = $(this),
                $reflush_icon = $this.find("i"),
                Interval = setInterval(function(){
                    deg  += 180;
                    $reflush_icon.css({"transform":"rotate("+deg+"deg)","-moz-transform":"("+deg+"deg)"});
                }, 100);
            if ($this.data('status') === 'loading') {
                return false;
            }
            if ($this.data('status') === 'loading') {
                return false;
            }
            // $this.data('status', 'loading').html('<i class="icon-reflush"></i><span class="underline">请稍候</span>');
            $all_tags.empty().load('/ajax', {
                _m: 'zone',
                _c: 'randomtag'
            }, function() {
                clearInterval(Interval);
             // $this.data('status', '').html('<i class="icon-reflush"></i><span class="underline">换一批</span>');

                //防止出现重复的
                $all_tags.children().each(function(index, el) {
                    var $el = $(el);
                    var selected_ids = $('.selected_tags_data').val().split(',');
                    var id = $el.attr('id').slice('all_tag_'.length);
                    if($.inArray(id, selected_ids) !== -1){
                        $el.remove();
                    }
                });
            });
            e.preventDefault();
            return false;
        });
        $('.reflush-users').click(function(e) {
            var $this = $(this),
                $reflush_icon = $this.find("i"),
                Interval = setInterval(function(){
                    deg  += 180;
                    $reflush_icon.css({"transform":"rotate("+deg+"deg)","-moz-transform":"("+deg+"deg)"});
                }, 100);
            if ($this.data('status') === 'loading') {
                return false;
            }

            // $this.data('status', 'loading').html('<i class="icon-reflush"></i><span class="underline">请稍候</span>');
            $all_users.empty().load('/ajax', {
                _m: 'zone',
                _c: 'randomuser'
            }, function() {
                // $this.data('status', '').html('<i class="icon-reflush"></i><span class="underline"> 换一批</span>');
                clearInterval(Interval);
                //防止出现重复的
                $all_users.children().each(function(index, el) {
                    var $el = $(el);
                    var selected_ids = $('.selected_authors_data').val().split(',');
                    var id = $el.find('.attention').attr('id').slice('all_user_'.length);
                    if($.inArray(id, selected_ids) !== -1){
                        $el.remove();
                    }
                });
            });
            e.preventDefault();
            return false;
        });

    }
    return {
        init: init
    }
})();

// 首页点赞
// Arianrhod
// 2014-09-17
Tmt.index = (function() {
    //by Arianrhod
    var init = function() {
        var setLike = function(id, cb) {
            var parms = {
                    _m: "learn",
                    _c: "like_post_action",
                    pid: id,
                    is_like: $(this).hasClass("current") ? "false" : "true"
                },
                $this = $(this);

            if ($this.hasClass('current')) {
                return;
            }

            $.get(Tmt.api.default_api, parms, function(data) {
                if (data.code === 1) {
                    cb();
                } else if (data.code === 10029) {
                    Tmt.global.custom_Alert(data.msg);
                }
            }, 'json');
        };
        $('.index_top_first .praise').click(function(event) {
            event.preventDefault();
            var id = $(this).data('id');
            var count = parseInt($(this).text(), 10);
            setLike(id,function(){
                $(this).find('a').html(id + 1 + ' 赞');
            });
            return false;
        });
    }

    var hot_article = function(){
        $(".hot-articles .content").mouseover(function(){
            $(this).find(".show").addClass("show-all");
        }).mouseout(function(){
            $(this).find(".show").removeClass("show-all");
        });
    };

    $(".show").on("click",function(event){
        if(event.target.nodeName!="A"){
            window.open($(this).find("a.tit").attr("href"));
        }
    });


    var index_praise = function(){
        var $praise   = $(".index-praise");
        var $total    = $praise.find("a");
        var num       = parseInt($total.text(),10);
        var id        = $praise.attr("data-id");
        function handle(){
            if(!$(this).hasClass('disable')){
                $(this).addClass('disable');
                var parms={
                    _m   : "learn",
                    _c   : "like_post_action",
                    pid  : id,
                    is_like : "true"
                }
                $.get(Tmt.api.default_api,parms,function(data){
                    if(data.code===1){
                        $total.text(num+1 + ' 赞');
                    }else{
                        Tmt.global.custom_Alert(data.msg)
                    }
                },"json");
            }
            return false;
        };
        $praise.on("click",handle);
    };

    var load_more = function(){
        var $list  = $(".recent-article .mod-article-list");
        var $btn   = $(".recent-article .btn-more");
        var offset = 0;
        var html_func  = function(data){

            var category = '';
            var cat_name = '';
            var tag      = '';
            var edit     = '';
            if(data.category.length){
                category = '<a class="type-sign" href="/'+data.category[0].slug+'">'+data.category[0].name+'</a>';
                cat_name = '<span class="point">•</span><span class="column"><a target="_blank" title="'+data.category[0].name+'" href="/'+data.category[0].slug+'">'+data.category[0].name+'</a></span>';
            }

            if(data.tags.length){
                tag = '<div class="tags"><i class="icon-bookmark"></i>'+data.tags+'</div>';
            }

            if(IsShowEdit*1){
                edit = '<span class="point">•</span><span><a target="_blank" href="/wp-admin/post.php?post='+data.ID+'&amp;action=edit">编辑</a></span>'
            }


            return '<li class="clear article">'+
                   '     <div class="pic fl">'+
                   '         <a target="_blank" href="'+data.url+'">'+
                   '             <img src="'+data.thumbnal_url+'" width="200" height="150" alt="'+data.post_title+'">'+
                   '         </a>'+category+
                   '     </div>'+
                   '     <div class="show">'+
                   '         <a target="_blank" href="'+data.url+'" class="tit">'+data.post_title+'</a>'+
                   '         <p class="info">'+
                   '             <a target="_blank" href="'+data.author_url+'" class="author">'+data.post_author_name+'</a>'+
                   '             <span class="point">•</span>'+
                   '             <span class="time">'+data.post_date+'</span>'+cat_name+edit+
                   '             <span class="comment"><a target="_blank" href="'+data.url+'#comment"><i class="icon-comment"></i>'+data.comment_count+'</a></span>'+
                   '         </p>'+
                   '         <p class="abstract">'+data.post_excerpt+'</p>'+tag+
                   '     </div>'+
                   '</li>';
        }

        var parms = {
            _m:"learn",
            _c:"index_recommend_post",
            offset:offset,
            limit:10,
            firstPage:FirstPage
        }
        function handle(){
            $btn.html("加载中...");


            // var str = 'http://192.168.1.61/ajax?_m=learn&_c=index_recommend_post&limit='+parms.limit+'&offset='+parms.offset+'&firstPage='+parms.firstPage+"&callback=?";
            // $.getJSON(str,function(data){
            $.get('/ajax',parms,function(data){
                $btn.html("加载更多");
                if(data.status){
                    var total = data.item_total_rows;
                    var html  = '';
                    $.each(data.items,function(i,item){
                        html += html_func(item);
                    });
                    $list.append(html);
                    parms.offset += parms.limit;
                }else{
                    Tmt.global.custom_Alert(data.msg);
                }
            });
        }


        $btn.on("click",handle);

    };


    return {
        init: init,
        hot_article:hot_article,
        index_praise:index_praise,
        load_more:load_more
    }
})();

//全局提示的关闭也暂时在这处理了吧……
//by Arianrhod
$('body').on('click', '.global-tip>.inner>.close', function() {
    $('.global-tip').remove();
});
if($('.global-tip').length){
    setTimeout(function(){
        $('.global-tip').remove();
    },800000000);
}

//登录注册那块的也暂时放这……
//by Arianrhod
$(function(){
    var $form = $('#register,#find-passsword').children().eq(0).children('form');

    if(!$form[0]){
        return;
    }

    var $submit = $form.find('input[type="submit"]');

    var text = $submit.attr('value');
    var action = $form.children('.action').attr('action');
    var target = 'wp-login.php?action=' + action;
    var $body = $('body');


    $form.submit(function(e) {
        e.preventDefault();
        var $this = $(this);
        if (!$this.hasClass('disabled')) {
            var defered = $.ajax({
                url: '/wp-login.php' + '',
                method: 'POST',
                data: $this.serialize(),
                beforeSend: function() {
                    $this.addClass('disabled');
                    $submit.attr('value', '正在提交……');
                }
            });
            var compelete = function(res) {
                var status, msg;
                var fallback_msg = '<i>噢！出错了……请重试。</i>'
                var res = typeof res === 'string' ? res : res.responseText;
                var error_msg = res.match(/<div id="login_error[\s\S]*<form/i);
                var success_msg = res.match(/<p class="message[\s\S]*<form/i);
                if (error_msg && error_msg[0]) {
                    status = 0;
                    msg = error_msg[0].slice(0, -5);
                } else if (success_msg && success_msg[0]) {
                    status = 1;
                    msg = success_msg[0].slice(0, -5);
                } else {
                    status = 0;
                    msg = fallback_msg;
                }

                msg = $(msg).text();
                msg = msg.slice(0, msg.indexOf('。'));

                Tmt.global.showPageMsg(status ? 'success' : 'error', msg);

                $submit.attr('value', text);
                $this.removeClass('disabled');
            };
            defered.always(compelete);
        }
        return false;
    })
});

//用户修改头像……
//by Arianrhod
$(function(){
    var $user_avatar = $('#user_avatar');

    if(!$user_avatar[0]){
        return;
    }

    var $btn_select_file = $('#btn_select_file');
    var $btn_select_file_data = $('#btn_select_file_data');
    $btn_select_file.click(function(e){
        e.preventDefault();
        $btn_select_file_data.click();
        return false;
    });
    $btn_select_file_data.change(function(){
        var $btn_select_file_data = $(this);

        var filename = $btn_select_file_data.val().toLowerCase();
        var parts = filename.split('.');
        var ext_name = parts[parts.length - 1];
        var file = $btn_select_file_data[0].files[0];
        if (ext_name !== 'jpg' && ext_name !== 'jpeg' && ext_name !== 'png' && ext_name !== 'gif' && ext_name !== 'ico' && ext_name !== 'svg' && ext_name !== 'bmp') {
            Tmt.global.showPageMsg('error', '请选择图片文件！');
            return false;
        } else if (file.size / 1024 / 1024 > 2) {
            Tmt.global.showPageMsg('error', '请选择 2 M 以内的文件！');
            $btn_select_file_data.val('');
            return false;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                var src = reader.result;
                $user_avatar.attr('src', src);
            }
        }
    });
});

$(function(){
    var $verify_form = $('.verify_form'),
        set_time = "";
    if(!$verify_form[0]){
        return;
    }

    $('.upload_id_card').click(function(){
        $('.upload_id_card_data').click();
    });
    $('.upload_business_card').click(function(){
        $('.upload_business_card_data').click();
    });
    $(".uploads .part img").hover(function() {
        var pic_width = $(this).css("width"),
            left      = (172-parseInt($.trim(pic_width,"px")))/2
        $(this).parents(".part").addClass('show-del');
        $(this).parents(".part").find(".photo-shadow").css({"width":pic_width,"left":left+"px"});

    }, function(event) {
        var $this = $(this);
        set_time = setTimeout(function(){
            $this.parents(".part").removeClass('show-del');
        }, 300)
    });
    $(".uploads .part .img-del").hover(function() {
        clearTimeout(set_time);
    });
    $(".uploads .part .img-del").click(function(event) {
        var $part = $(this).parents(".part").removeClass('has-pic').removeClass('show-del');
        // $part.find("img").attr("src","");
    });
    $('.upload_id_card_data,.upload_business_card_data').change(function() {
        var $this = $(this);
        var filename = $this.val().toLowerCase();
        var parts = filename.split('.');
        var ext_name = parts[parts.length - 1];
        var file = $this[0].files[0];
        if (ext_name !== 'jpg' && ext_name !== 'jpeg' && ext_name !== 'png' && ext_name !== 'gif' && ext_name !== 'ico' && ext_name !== 'svg' && ext_name !== 'bmp') {
            Tmt.global.showPageMsg('error', '请选择图片文件！');
            return false;
        } else if (file.size / 1024 / 1024 > 1) {
            Tmt.global.showPageMsg('error', '请选择 1 M 以内的文件！');
            $this.val('');
            return false;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                var src = reader.result;
                $verify_form.find('.uploads img').eq($this.index()).attr('src', src);
                $verify_form.find('.uploads img').eq($this.index()).parents(".part").addClass('has-pic');
            }
        }
    });
});

//绑定社会化媒体
$(function(){
    var $profile_connect = $('#profile_connect');
    var $profile_connect_form = $('#profile_connect_form');

    if(!$profile_connect[0]){
        return;
    }

    $profile_connect.on('click','a',function(){
        var $this = $(this);
        var type = $this.parent().attr('class');
        var name = type === 'qq' ? '腾讯微博' : '新浪微博'
        if ($this.hasClass('finish')){
            Tmt.global.custom_Confirm('您已经绑定了' + name + '同步授权，是否解除？');
            $("#system-confirm-tip .js-confirm").one("click",function(){
                type = 'delete_' + type;
                $profile_connect_form.children('.type').attr('name',type).end().submit();
            });
        } else {
            type = 'add_' + type;
            $profile_connect_form.children('.type').attr('name',type).end().submit();
        }
        return false;
    });
});

//彈出登錄窗口
//by Arianrhod
$(function(){
    var $login_link      = $('.head-1').find('.login_link'),
        $pop_up_login_bg = $('.pop-up-login-bg');
    if(!$login_link[0]){
        return false;
    }

    var $pop_up_login = $('.pop-up-login').on('click','.close',function(){
        $pop_up_login.hide();
        $pop_up_login_bg.hide();
    });
    var init_status = false;

    $login_link.click(function(e){
        e.preventDefault();
        $pop_up_login.show();
        $pop_up_login_bg.show();
        if(init_status === false){
            $pop_up_login.css({
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginTop: -$pop_up_login.height()/2,
                marginLeft: -$pop_up_login.width()/2
            });
            init_status = true;
        }

        return false;
    })
});

/*
Tmt.plugins.ready("autosize",function(){
    $('textarea.comment-input').autosize({append:false});
});


;;(function(){
    if($.trim(ACTION).length){
        if(ACTION == "post"){
            var parms = 'action=read_a_post&obj_id='+COLUMN;
        }else if(ACTION == "category"){
            var parms = 'action=visit_section&note='+COLUMN;
        }else if(ACTION == "home"){
            var parms = 'action=home';
        }
        $.get("/ajax?_m=log&_c=api&"+parms+"&callback=?",function(data){});

        // $.getJSON("http://192.168.1.61/ajax?_m=log&_c=api&"+parms+"&callback=?",function(data){
    }

    // $(document).ajaxComplete(function(xhr,respone,request){
    //         console.log(respone.responseText);
    //         console.log(request.type);
    //         console.log(request.url);
    // })
}()); */