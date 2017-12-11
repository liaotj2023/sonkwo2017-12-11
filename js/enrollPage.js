$(function(){
	//搜索框
	$('.searchBtn').click(function(){
		$('.searchBtn').css('background-color','#ececec')
		$('.searchInp').stop().animate({'left':0},500)
	})
	var flag = null;
	//验证用户名
	$('#username').focus(function(){
		$('#userSp').html('请输入正确格式的手机号');
		$('#userSp').css({'background':'#2f5a90','color':'#fff'});
		$('#userSp').slideDown(100);
	})
	$('#username').blur(function(){
		if($('#username').val() == ""){
			$('#userSp').html("账号不能为空！");
			$('#userSp').css({'background':'#ee4a4a','color':'#fff'});
			flag = false;
		}else if(!/^1[3|5|7|8][0-9]\d{4,8}$/.test($('#username').val())){
			$('#userSp').html("手机号格式不正确！");
			$('#userSp').css({'background':'#ee4a4a','color':'#fff'});
			flag = false;
		}else{
			$('#userSp').html("");
			$('#userSp').slideUp(100);
			flag = true;
		}
		if($('#youInp').val()==""||$('#pass').val()==""||$('#que').val()==""||$('#duanInp').val()==""){
			flag = false;
		}else{
			flag = true;
		}
	})
	//验证邮箱
	$('#youInp').focus(function(){
		$('#youSp').slideDown(100);
		$('#youSp').html('请输入正确格式的邮箱');
		$('#youSp').css({'background':'#2f5a90','color':'#fff'});
	})
	$('#youInp').blur(function(){
		if($('#youInp').val() == ""){
			$('#youSp').html("账号不能为空！");
			$('#youSp').css({'background':'#ee4a4a','color':'#fff'});
			flag = false;
		}else if(!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($('#youInp').val())){
			$('#youSp').html("邮箱格式不正确！");
			$('#youSp').css({'background':'#ee4a4a','color':'#fff'});
			flag = false;
		}else{
			$('#youSp').slideUp(100);
			$('#youSp').html("");
			flag = true;
		}
		if($('#username').val()==""||$('#pass').val()==""||$('#que').val()==""||$('#duanInp').val()==""){
			flag = false;
		}else{
			flag = true;
		}
	})
//	//验证密码
	$('#pass').focus(function(){
		$('#paSp').slideDown(100);
		$('#paSp').html('请输入正确格式的邮箱');
		$('#paSp').css({'background':'#2f5a90','color':'#fff'});
	})
	$('#pass').blur(function(){
		if($('#pass').val() == ""){
			$('#paSp').html("密码不能为空！");
			$('#paSp').css({'background':'#ee4a4a','color':'#fff'});
			flag = false;
		}else if(!/^[a-zA-Z0-9_-]{8,20}$/.test($('#pass').val())){
			$('#paSp').html("密码格式不正确！");
			$('#paSp').css({'background':'#ee4a4a','color':'#fff'});
			flag = false;
		}else{
			$('#paSp').slideUp(100);
			$('#paSp').html("");
			flag = true;
		}
		if($('#username').val()==""||$('#youInp').val()==""||$('#que').val()==""||$('#duanInp').val()==""){
			flag = false;
		}else{
			flag = true;
		}
	})
//	//确认密码
	$('#que').focus(function(){
		$('#queSp').slideDown(100);
		$('#queSp').html('请再次输入密码');
		$('#queSp').css({'background':'#2f5a90','color':'#fff'});
	})
	$('#que').blur(function(){
//		alert(111)
		if($('#que').val() == ""){
			$('#queSp').html("确认密码不能为空！");
			$('#queSp').css({'background':'#ee4a4a','color':'#fff'});
		}else if($('#que').val() != $('#pass').val()){
			$('#queSp').html("两次密码不一样，请重新确认！");
			$('#queSp').css({'background':'#ee4a4a','color':'#fff'});
		}else{
			$('#queSp').slideUp(100);
			$('#queSp').html("");
			flag = true;
		}
		if($('#username').val()==""||$('#youInp').val()==""||$('#pass').val()==""||$('#duanInp').val()==""){
			flag = false;
		}else{
			flag = true;
		}
	})

	//验证码倒计时
	var t = 60;
	var timer = null;
	function tim(){
		t--;
		if(t != 0){
			$('#duanBtn').html("获取验证码倒计时：  " + t +" s");
			$('#duanBtn').attr('disabled','disabled');
		}else{
			$('#duanBtn').html("重新获取验证码");
			$('#duanBtn').attr('disabled',false);
			clearInterval(timer);
		}
	}
	$('#duanBtn').click(function(){
		t = 60;
		$('#duanBtn').html("获取验证码倒计时：  " + t +" s");
		$('#duanBtn').attr('disabled','disabled');
		timer = setInterval(tim,1000);
	})
	//提交
	$('#enrollBtn').click(function(){
		if(flag){
			var local = window.localStorage;
			local.username = $('#username').val();
			local.pass = $('#pass').val();
			window.location.href = "loginPage.html";
		}else{
			alert('注册失败！');
		}
	})

})
