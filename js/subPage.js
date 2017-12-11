$(function(){
	//搜索框
	$('.searchBtn').click(function(){
		$('.searchBtn').css('background-color','#ececec')
		$('.searchInp').stop().animate({'left':0},500)
	})
	//获取数据
	$.ajax({
		type:"GET",
		url:"file/sonkwo.json",
		async:true,
		dataType: "json",
		data: {
			
		},
		success: function(result){
//			console.log(typeof result);
			var loc = decodeURI(location.href);//获取url
			var urlArr = loc.split("?")[1];//
			var imgId = urlArr.split("=")[1];//
//			console.log(imgId);
			var ajax = result[imgId];
			//上面购买信息
			$('.buyBox h5').html(ajax["name"]);
			$('.buyBox .gameImg img').attr({'src':ajax["buybig"],'id':imgId});
			$('.buyBox #typeTitle').html(ajax["typeTitle"]);
			$('.buyBox #gameJian').html(ajax["gameJian"]);
			$('.buyBox #price').html(ajax["price"]);
			//详情介绍
			//截图视频
			for(var j=0;j<ajax["tushi"].length;j++){
				$('#picWarp h3').append('<span>'+ ajax["tushi"][j]["showTitle"] +'<i></i></span>');
			}
			$('#picWarp h3 span i').eq(0).show();
//			
			for(var i=0;i<ajax["tushi"][0]["tabArr"].length;i++){
				$('#rightImgWarp ul').append("<li><i></i><img src=" + ajax["tushi"][0]["tabArr"][i] + " /><div class='imgmen'></div>");
			}
			$('#rightImgWarp ul li').eq(0).children('.imgmen').hide().parent().siblings().children('.imgmen').show();
			$('#rightImgWarp ul li').eq(0).addClass('active').siblings().removeClass('active');
			$('#leftShow img').attr('src',ajax["tushi"][0]["tabArr"][0]);
//			$('#leftShow').html('<img src='+ ajax["tushi"][0]["tabArr"][0] + '/>')
			$('#rightImgWarp ul li').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('#leftShow img').attr('src',ajax["tushi"][0]["tabArr"][$(this).index()]);
				$(this).children('.imgmen').hide().parent().siblings().children('.imgmen').show();
			})
//			//上下换图
			var num = 0;
			var lenLi = $('#rightImgWarp ul li').length;
			$('#topTab').click(function(){
				num--;
				rightTabImg();
			})
			$('#bottomTab').click(function(){
				num++;
				rightTabImg();
			})
			function rightTabImg(){
				if(num<0){
					num = 0;
				}
				if(num>Math.floor(lenLi/4)){
					num = Math.floor(lenLi/4);
				}
				$('#rightImgWarp ul').stop().animate({'top':-$('#rightImgWarp').height()*num});
			}
//			
//			//切换截图
			$("#picWarp h3 span").eq(0).click(function(){
				$(this).children('i').show().parent().siblings().children('i').hide();
				$('#leftShow').html('<img src='+ ajax["tushi"][0]["tabArr"][0] + '/>');
				$('#rightImgWarp ul').html("");
				for(var i=0;i<ajax["tushi"][0]["tabArr"].length;i++){
					$('#rightImgWarp ul').append("<li><i></i><img src=" + ajax["tushi"][0]["tabArr"][i] + " /><div class='imgmen'></div>");
				}
				$('#rightImgWarp ul li').eq(0).children('.imgmen').hide().parent().siblings().children('.imgmen').show();
				$('#rightImgWarp ul li').eq(0).addClass('active').siblings().removeClass('active');
	//			$('#leftShow img').attr('src',ajax["tushi"][0]["tabArr"][0]);
//				$('#leftShow').html('<img src='+ ajax["tushi"][0]["tabArr"][0] + '/>')
				$('#rightImgWarp ul li').click(function(){
					$(this).addClass('active').siblings().removeClass('active');
					$('#leftShow img').attr('src',ajax["tushi"][0]["tabArr"][$(this).index()]);
					$(this).children('.imgmen').hide().parent().siblings().children('.imgmen').show();
				})
			})
			//切换视频
			$("#picWarp h3 span").eq(1).click(function(){
				$(this).children('i').show().parent().siblings().children('i').hide();
//				$('#leftShow img').hide();
				$('#leftShow').html('<iframe allowtransparency="true" frameborder="0" width="640" height="498" scrolling="no" src='+ ajax["tushi"][1]["ifrSrc"][0]+ '></iframe>');
				$('#rightImgWarp ul').html("");
				for(var i=0;i<ajax["tushi"][1]["tabArr"].length;i++){
					$('#rightImgWarp ul').append("<li><i></i><img src=" + ajax["tushi"][1]["tabArr"][i] + " /><div class='imgmen'></div>");
				}
				$('#rightImgWarp ul li').eq(0).children('.imgmen').hide().parent().siblings().children('.imgmen').show();
				$('#rightImgWarp ul li').eq(0).addClass('active').siblings().removeClass('active');
				
				$('#rightImgWarp ul li').click(function(){
					$(this).addClass('active').siblings().removeClass('active');
					$('#leftShow iframe').attr('src',ajax["tushi"][1]["ifrSrc"][$(this).index()]);
					$(this).children('.imgmen').hide().parent().siblings().children('.imgmen').show();
				})
				
			})
			
			for(var i=0;i<ajax["xianjie"].length;i++){
				$('#detailed').append("<p>" + ajax["xianjie"][i] + "</p>");
			}
			for(var i=0;i<ajax["peizhi"].length;i++){
				$("#compinfo").append("<p></p>");
				for(x in ajax["peizhi"][i]){
					$('#compinfo p').eq(i).append("<span class='compSp'>" + x + "</span>");
					$('#compinfo p').eq(i).append("<span>" + ajax["peizhi"][i][x] + "</span>");
				}
			}
			//右边
			for(var i=0;i<ajax["rightInfo"].length;i++){
				$("#rightInfo ul").append("<li></li>");
				for(x in ajax["rightInfo"][i]){
					$('#rightInfo ul li').eq(i).append("<span class='spanLeft'>" + x + "</span>");
					$('#rightInfo ul li').eq(i).append("<span class='spanRight'>" + ajax["rightInfo"][i][x] + "</span>");
				}
			}
			//猜你喜欢
			for(var i=0;i<ajax["cai"].length;i++){
				$("#like").append("<p></p>");
				$("#like p").append("<img src=" + ajax["cai"][i]+ " " + "id=" + (i+1) + ">");
//				console.log(ajax["cai"][i]);
			}
			//评分
			$('#eveaFen').html(ajax["pinfen"]);
			//评星
			var wid1 = Math.floor(Math.random()*120);
			var wid2 = Math.floor(Math.random()*120);
			var wid3 = Math.floor(Math.random()*120);
			var wid4 = Math.floor(Math.random()*120);
			var wid5 = Math.floor(Math.random()*120);
			//比例
			var bi1 = Math.round((wid1/(wid1+wid2+wid3+wid4+wid5))*100);
			var bi2 = Math.round((wid2/(wid1+wid2+wid3+wid4+wid5))*100);
			var bi3 = Math.round((wid3/(wid1+wid2+wid3+wid4+wid5))*100);
			var bi4 = Math.round((wid4/(wid1+wid2+wid3+wid4+wid5))*100);
			var bi5 = Math.round((wid5/(wid1+wid2+wid3+wid4+wid5))*100);
//			console.log(bi1);
			$('#fiveXing').width(wid5);
			$('#fourXing').width(wid4);
			$('#threeXing').width(wid3);
			$('#twoXing').width(wid2);
			$('#oneXing').width(wid1);
			$("#fiveBili").html(bi5+"%");
			$("#fourBili").html(bi4+"%");
			$("#threeBili").html(bi3+"%");
			$("#twoBili").html(bi2+"%");
			$("#oneBili").html(bi1+"%");
			
			//立即购买
			$("#buyBtn").click(function(){
				alert("恭喜您，购买成功！")
			})
			//购物车
			$("#shoeBtn").click(function(){
				var imgid = $(this).parent().parent().parent().children('.gameImg').children('img').attr('id');
				localStorage.setItem("imgId",imgid);
			})
			$("#like p").click(function(){
				location.href = "subpage.html?id=" + $(this).find("img").attr('id');
			})
		}
	});
})
