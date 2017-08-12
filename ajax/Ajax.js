//封装的Ajax程序

var $ = {
	//兼容IE5、6
	getXHR: function(){
		var request;
		if(XMLHttpRequest){
			request = new XMLHttpRequest;
		}else{
			request = new ActiveXObject("Microsoft.XMLHttp");
		}
		return request;
	},
	//将数据转换为name=jack&age=18的格式
	serialize: function(data){
		var newData = '';
		for(key in data){
			newData += key + '=' + data[key] + '&';
		}
		//将最后的&符号去掉
		return newData.slice(0,-1);
	},
	ajax: function(params){
		var xhr = this.getXHR();

		//获取数据
		type = params.type || 'get';
		url = params.url || location.pathname;
		data = this.serialize(params.data);

		//get方式请求
		if(type == 'get'){
			url = url + '?' + data;
			data = null;
		}
		xhr.open(type,url);
		//post方式请求
		if(type == 'post'){
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		}
		xhr.send(data);

		//监听事件返回
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var result = xhr.responseText;
				var contentType = xhr.getResponseHeader('Content-Type');
				//判断返回数据是不是Json类型
				if(contentType.indexOf('json') != -1){
					result = JSON.parse(result);
				}
				params.success(result);
			}else{
				params.error('Request Error!');
			}
		}
	}
}