import jwt from 'jwt-simple'
import Cookies from 'js-cookie'

// 保存roles
const roles = function(){
  if(Cookies.get('Admin-Token')){
    let decoded = jwt.decode(Cookies.get('Admin-Token'),'9FE9DF13C0C959EF',true,'HS512')
    let roles = decoded.scopes
    return roles
  }else{
    return
  }
}

// 时间换成几分钟前
const getDateDiff = function(dateTimeStamp){
  let UnixToDate = function(unixTime, isFull) {
    let time = new Date(unixTime);
    let ymdhis = "";
    function toTwo(n){
      if(n<10){
        return '0'+n;
      }else{
        return ''+n;
      }
    };
    ymdhis += time.getFullYear() + "/";
    ymdhis += (toTwo(time.getMonth()+1)) + "/";
    ymdhis += toTwo(time.getDate());
    if (isFull === true){
      ymdhis += "  " + toTwo(time.getHours()) + ":";
      ymdhis += toTwo(time.getMinutes()) + ":";
      ymdhis += toTwo(time.getSeconds());
    }
    return ymdhis;
  }
  let minute = 1000 * 60;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if(diffValue < 0){
    return;
  }
  let minC =diffValue/minute;
  let result
  if(minC<1){
    result = "刚刚";
  }else if(minC>=1&&minC<=59){
    result = ""+ parseInt(minC) +"分钟前";
  }else{
    result = UnixToDate(dateTimeStamp,true)
  }
  return result;
}


export default {
  roles,
  getDateDiff,
}
