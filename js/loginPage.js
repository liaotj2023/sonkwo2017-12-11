$(function(){
	//搜索框
	$('.searchBtn').click(function(){
		$('.searchBtn').css('background-color','#ececec')
		$('.searchInp').stop().animate({'left':0},500)
	})
	var flag = null;
	$('#userInp').focus(function(){
		$('#userSp').html("请输入有效的手机号！");
		$('#userSp').css('color','#2666B5');
	});
	$('#userInp').blur(function(){
		if($('#userInp').val() == ""){
			$('#userSp').html("账号不能为空！");
			$('#userSp').css('color','red');
			flag = false;
		}else if(!/^1[3|5|7|8][0-9]\d{4,8}$/.test($('#userInp').val())){
			$('#userSp').html("手机号格式不正确！");
			$('#userSp').css('color','red');
			flag = false;
		}else{
			$('#userSp').html("");
			flag = true;
		}
	})
	
	$('#passInp').focus(function(){
		$('#passSp').html("密码为8-20位字符！");
		$('#passSp').css('color','#2666B5');
	});
	$('#passInp').blur(function(){
		if($('#passInp').val() == ""){
			$('#passSp').html("密码不能为空！");
			$('#passSp').css('color','red');
			flag = false;
		}else if(!/^[a-zA-Z0-9_-]{8,20}$/.test($('#passInp').val())){
			$('#passSp').html("密码为8-20位字符！");
			$('#passSp').css('color','red');
			flag = false;
		}else{
			$('#passSp').html("");
			flag = true;
		}
	})
	$("#loginBtn").click(function(){
		var local = window.localStorage;
		if($('#userInp').val()!=local.getItem("username") || $('#passInp').val()!=local.getItem("pass")){
			$("#btnSp").html('账号或者密码错误！');
			$('#btnSp').css('color','red');
		}else{
			location.href = "index.html";
			sessionStorage.username = $('#userInp').val();
		}
	})
})
