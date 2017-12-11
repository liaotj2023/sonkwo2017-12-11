var searchInp = document.getElementById('searchInp');
searchInp.oninput= function(){
	var inpval = searchInp.value;
	var script = document.createElement('script');
	script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+inpval+"&cb=fun";
	$('head').append(script)
	
}
function fun(result){
	var arr = result["s"];
	$('.searchBox ul').html("")
	for(var i=0;i<arr.length;i++){
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.href = 'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd='+arr[i];
		a.innerHTML = arr[i];
		li.appendChild(a);
		$('.searchBox ul').append(li)
	}
}

$(function(){
	//登录
	if(sessionStorage.username){
		$('.regis').html("退出登录");
		$('.login').html("个人中心");
	}else{
		$('.regis').html("注册");
		$('.login').html("登录");
	}
	$('.regis').click(function(){
		if($('.regis').html() == "退出登录"){
			$('.regis').html("注册");
			$('.login').html("登录");
		}else if($('.regis').html() == "注册"){
			location.href = 'enrollPage.html';
		}
	})
	$('.login').click(function(){
		if($('.login').html() == "登录"){
			location.href = "loginPage.html";
		}
	})
	//搜索框
	var seaKai = 0;
	$('.searchBtn').click(function(){
		seaKai++;
		if(seaKai == 1){
			$('.searchBtn').css('background-color','#ececec');
			$('.searchInp').stop().animate({'left':0},500);
		}else if($('#searchInp').val() != ""){
			if(/\S/.test($('#searchInp').val())){
				location.href = 'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd='+$('#searchInp').val();
			}
		}
	})
	//键盘按下enter键搜索
	$(window).keydown(function(){
		if($('#searchInp').val() != ""){
			if(/\S/.test($('#searchInp').val())){
				location.href = 'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd='+$('#searchInp').val();
			}
		}
	})
	//游戏分类
	$('#menu>li').click(function(){
		$(this).children('.submenu').slideDown();
		$(this).siblings().children('.submenu').slideUp();
	})
	
	//轮播图
	var num = 0;
	var timer = 0;
	var kai = true;//点击开关
	var liWidth = $('#imgBox li').width();//li宽
	var spanWidth = $('#slider').width();//span滑块宽
	$("#imgBox").css('width',665*$("#imgBox li").length);
	var len = $("#imgBox li").length;//li的长度
	//轮播函数
	function move(){
		if(num < 0){
			num = len-1;
		}
		if(num>len-1){
			num = 0;
		}
		$('#imgBox').stop().animate({'left':-num*liWidth},800);
		$('#slider').stop().animate({'left':num*spanWidth},800);
	}
	//左按钮切换
	$('#leftBtn').click(function(){
		if(kai){
			num--;
			move();
			kai = false;
			setTimeout(function(){
				kai = true;//800毫秒内num只加1或减1
			},800)
		}
	})
	//右按钮切换
	$('#rightBtn').click(function(){
		if(kai){
			num++;
			move();
			kai = false;
			setTimeout(function(){
				kai = true;
			},800)
		}
	})
	//自动轮播
	timer = setInterval(function(){
		num++;
		move();
	},3000)
	//清除定时器
	$('#banner').hover(function(){
		clearInterval(timer);
	},function(){
		clearInterval(timer);
		timer = setInterval(function(){
			num++;
			move();
		},3000)
		
	})
	//拖动滑块
	var staX=0,staY=0;
	var maxX = $("#sliderBox").width()-$("#slider").width();//滑块可移动最大范围
	var maxboxX = $("#imgBox").width()-$("#imgBox li").width();//图片ul可移动最大范围
	//按下拖动
	$('#slider').on('mousedown',function(event){
		var ev = event||window.event;
		staLeft = $("#slider").position().left;//按下时滑块位置
		staX = ev.clientX;//按下时鼠标位置
		$(document).on('mousemove',sliderMove);//鼠标移动事件
	})
	//抬起清除
	$('#banner').on('mouseup',function(event){
		$(document).off('mousemove',sliderMove);//
		$('#imgBox').stop().animate({'left':-num*liWidth},500);
		$('#slider').stop().animate({'left':num*spanWidth},500);
	})
	//离开清除
	$('#banner').on('mouselive',function(event){
		$(document).off('mousemove',sliderMove);
		$('#imgBox').stop().animate({'left':-num*liWidth},500);
		$('#slider').stop().animate({'left':num*spanWidth},500);
	})
	
	function sliderMove(event){
		var ev = event||window.event;
		endLeft =  ev.clientX - staX + staLeft;
		if(endLeft < 0){
			endLeft = 0;
		}else if(endLeft > maxX){
			endLeft = maxX;
		}
		$('#imgBox').css('left',-endLeft*maxboxX/maxX);
		$('#slider').css('left',endLeft);
		num = Math.round(endLeft/$("#slider").width());
	}
	
	//点击切换
	$("#sliderBox").click(function(event){
		var ev = event||window.event;
		var mouseX = ev.clientX;
		var sliderBoxLeft  = $("#sliderBox").offset().left;
		var mouseLeft = mouseX - sliderBoxLeft;
		num = Math.floor(mouseLeft/$("#slider").width());
		$('#imgBox').stop().animate({'left':-num*liWidth},500);
		$('#slider').stop().animate({'left':num*spanWidth},500);
	})
	
	//右边tab切换
	var cloneRightImg = $("#tabImgWarp li").eq(0).clone();
	$('#tabImgWarp').append(cloneRightImg);
	var rightLen = $("#tabImgWarp li").length;
	var rightImgNum = 0;
	$("#tabImgWarp").width($('#tabImgWarp li').width()*rightLen);
	$('#pageNum').html(1)
	//左切换
	$("#leftTabBtn").click(function(){
		rightImgNum--;
		rightTab();
	})
	//右切换
	$("#rightTabBtn").click(function(){
		rightImgNum++;
		rightTab();
	})
	//切换函数
	function rightTab(){
		if(rightImgNum<0){
			rightImgNum = rightLen - 2;
			$('#tabImgWarp li').eq(rightLen-1).show().siblings().hide();
		}
		if(rightImgNum>rightLen-1){
			rightImgNum = 1;
			$('#tabImgWarp li').eq(0).show().siblings().hide();
		}
		$('#tabImgWarp li').eq(rightImgNum).fadeIn(500).siblings().fadeOut(200);
		if(rightImgNum>rightLen-2){
			$('#pageNum').html(1);
		}else{
			$('#pageNum').html(rightImgNum+1);
		}
	}
	
	//更多游戏tab切换
	$('.moreTop button').click(function(){
		$(this).addClass('actMore').siblings().removeClass('actMore');
		$('#bot ul').eq($(this).index()).show().siblings().hide();
	})
	
	//精品推荐
	$('.recoGame li').hover(function(){
		$(this).children('div').stop().animate({'top':0},500);
	},function(){
		$(this).children('div').stop().animate({'top':222},500);
	})
	//最新上架
	$('.shelGame li').hover(function(){
		$(this).children('div').stop().animate({'top':0},500);
	},function(){
		$(this).children('div').stop().animate({'top':130},500);
	})
	//社区热门
	$('.cutGame li').hover(function(){
		$(this).children('.cutMenban').fadeIn();
	},function(){
		$(this).children('.cutMenban').fadeOut();
	})
	//跳子页
	$('.recoGame li').click(function(){
		var ev = event||window.event;
		var tar = ev.target||ev.srcElement;
		if(tar.nodeName.toLowerCase() != "span"){
			location.href = "subpage.html?id=" + $(this).find("img").attr('id');
		}
	})
	$('#tabImgWarp li').click(function(){
		location.href = "subpage.html?id=" + $(this).find("img").attr('id');
	})
	$('.newShelves .shelGame li').click(function(){
		var ev = event||window.event;
		var tar = ev.target||ev.srcElement;
		if(tar.nodeName.toLowerCase() != "span"){
			location.href = "subpage.html?id=" + $(this).find("img").attr('id');
		}
	})
	$('.cutHot .cutGame li').click(function(){
		var ev = event||window.event;
		var tar = ev.target||ev.srcElement;
		if(tar.nodeName.toLowerCase() != "span"){
			location.href = "subpage.html?id=" + $(this).find("img").attr('id');
		}
	})
	$('#bot ul li').click(function(){
		location.href = "subpage.html?id=" + $(this).find("img").attr('id');
	})
	$('.moreRight ul li').click(function(){
		location.href = "subpage.html?id=" + $(this).find("img").attr('id');
	})
	//购物车
	$('.carSp').click(function(){
		var imgId = $(this).parent().parent().parent().children('img').attr('id');
		localStorage.setItem("imgId",imgId);
	})
})

