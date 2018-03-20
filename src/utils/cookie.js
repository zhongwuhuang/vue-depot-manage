//设置cookie
const set = function(name,value,iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);

	document.cookie=name+'='+encodeURI(value)+';expires='+oDate.toUTCString();//expires表示存储的时间,toUTCString()表示根据世界时间，把 Date 对象转换为字符串。
};
//读取cookie
const get = function(name){
	var arr1=document.cookie.split('; ');
	for (var i = 0; i < arr1.length; i++) {
		var arr2=arr1[i].split('=');
		if(arr2[0]==name)
		{
			return decodeURI((arr2[1]));
		}
	}
	return '';//如果没有找到返回空
};
//清除cookie
const remove = function(name){
	set(name,1,-1);//设置过期时间为昨天
};



export default {
  set,
  get,
  remove
}
