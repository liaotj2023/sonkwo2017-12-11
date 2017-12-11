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
		data:{
			
		},
		success: function(result){
			var ajax = result;
			var local = window.localStorage;
			$('#entryUl li:even').css('background','#c9d4d9');//偶数项
			$('#entryUl li:odd').css('background','#d6e4fa');//奇数项
			window.onstorage = function(){
				$("#entryUl").append('<li><p class="inp"><input type="checkbox" name="checkAll" id="checkAll" value="" /></p><p>'+ ajax[local.imgId]["name"]+ '</p><p>'+ajax[local.imgId]["typeTitle"]  + '</p><p>￥<span class="price">'+ ajax[local.imgId]["price"]+ '</span></p><p><img src="img/delate.png"/></p></li>');

				var prices = 0;
				var cuntend = 0;//选择商品个数
				var inplen = $('#entryUl li input').length;
				$('#entryUl li:even').css('background','#c9d4d9');//偶数项
				$('#entryUl li:odd').css('background','#d6e4fa');//奇数项
				//点击全选
				$('#checkAll').click(function(){
					if($('#checkAll').attr('checked')){
						$("#entryUl input").attr('checked',true);
						cuntend = inplen;
					}else{
						$("#entryUl input").attr('checked',false);
						cuntend = 0;
					}
					add();
				})
				//选择列表项
				$('#entryUl li input').click(function(){
					checks();
					add();
				})
				//选择列表项函数
				function checks(){
					var cunt = 0;//计算选中个数
					inplen = $('#entryUl li input').length;
					for(var i=0;i<inplen;i++){
						if($('#entryUl li input').eq(i).attr('checked')){
							cunt++;
						}
					}
					if(cunt == inplen && inplen != 0){
						$("#checkAll").attr('checked',true);
					}else{
						$("#checkAll").attr('checked',false);
					}
					cuntend = cunt;
				}
				//统计函数
				function add(){
					var allPrice = 0;//总价格
					$("#allNum").html(cuntend);//选择个数
					for(var i=0;i<inplen;i++){
						if($('#entryUl li input').eq(i).attr('checked')){
							allPrice += parseFloat($('.price').eq(i).html().split("￥")[1]);
						}
					}
					$("#allmoney").html(allPrice);//总价格
				}
				add();
				//删除商品
				$('#entryUl li img').click(function(){
					$('#entryUl li:even').css('background','#c9d4d9');//偶数项背景
					$('#entryUl li:odd').css('background','#d6e4fa');//奇数项
					$(this).parent().parent().remove();
					cuntend--;
					checks();
					add();
				})

			}
			$('#buyBtn').click(function(){
				var buyflag = confirm("确定购买商品吗？");
				if(buyflag && $("#allNum").html() != "0"){
					alert("恭喜你购买成功！");
					for(var i=0;i<$('#entryUl li input').length;i++){
						if($('#entryUl li input').eq(i).attr('checked')){
							$('#entryUl li input').eq(i).attr('checked',false);
						}
					}
					$("#allNum").html(0);
					$("#allmoney").html(0.00);//总价格
					$("#checkAll").attr('checked',false);
				}else{
					alert("还没选择商品！");
				}
			})
		}
	});
})