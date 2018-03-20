import Mock from 'mockjs'

var timestamp = new Date().getTime()

var timestamp1 = timestamp-Math.floor(Math.random()*(3800000-70000)+70000)
var timestamp2 = timestamp-Math.floor(Math.random()*(3800000-70000)+70000)
var timestamp3 = timestamp-Math.floor(Math.random()*(3800000-70000)+70000)
var timestamp4 = timestamp-Math.floor(Math.random()*(3800000-70000)+70000)
// 申请列表
Mock.mock('/list/info','get',{
    "list|5-10": [
      {
        'name|1': '@cname',
        'date|1': [timestamp1,timestamp2,timestamp3,timestamp4],
        'goods|1':['笔记本','电脑','抽纸','器件','油性笔','鼠标'],
        'status|1':[0,1,2,3],
      }
    ]
})

// 申请列表
Mock.mock('/list/goods','get',{
    "list|50-100": [
      {
        'goods|1':['笔记本','电脑','抽纸','器件','油性笔','鼠标'],
        'classify|1':['电子元器件','传感器','专用设备','办公用品','日用电器','书籍材料'],
        'brand|1':['晨光','耐克','阿迪','安踏'],
        'model|1':['A','B','C','D','E','F'],
        'unit|1':['个/把/本/套','包','箱','千克'],
        'num|1': [45,72,88,654,37,4,737,123,385],
      }
    ]
})
Mock.mock('/goods/info','get',{
    "list|1-10": [
      {
        'date|1': [timestamp1,timestamp2,timestamp3,timestamp4],
        'goods|1':['笔记本','电脑','抽纸','器件','油性笔','鼠标'],
        'status|1':[0,1,2],
      }
    ]
})

// 登录
Mock.mock('/user/login', 'post', function(opts){
  const _param = JSON.parse(opts.body);
  if(_param.username == 'admin'){
    return {
      "rols":"adminadminadminadminadminadminadminadmin",
      "code": 0,
      "message": "正常",
      "data": {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6WyJST0xFX0FETUlOIl0sImlzcyI6Imh0dHA6Ly93d3cuZWNvLWlvdC5jb20vIiwiaWF0IjoxNTIxMDA5MDQyLCJleHAiOjE1MjEwMTI2NDJ9.ilk39yslHq1VAB-MxqCZlZ3RK5tbOHVktQc2q_Ty-_ppRziSfZHaFDj5PPIM3PQSUUvB4VICdKvq2L5yRdMZvA",
        "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6WyJST0xFX1JFRlJFU0hfVE9LRU4iXSwiaXNzIjoiaHR0cDovL3d3dy5lY28taW90LmNvbS8iLCJqdGkiOiI0NDEzYmFjNi0yMWIxLTRmZGEtYjQyOS00MTYxNzRkNzdlMjIiLCJpYXQiOjE1MjEwMDkwNDIsImV4cCI6MTUyMTA0NTA0Mn0.GzNvJ_Bvz5NJkMcFH1juTAN_9--oQ69suFf3Qua2R5TM9VRHlWSosQ8dxrC-_x1hFJeEPxG_rn1s-lOkWGjMiQ"
      }
    }
  }else if(_param.username == 'user'){
    return {
      "rols":"useruseruseruseruseruseruser",
      "code": 0,
      "message": "正常",
      "data": {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwic2NvcGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJodHRwOi8vd3d3LmVjby1pb3QuY29tLyIsImlhdCI6MTUyMTAxNjE1NiwiZXhwIjoxNTIxMDE5NzU2fQ.mTCni3S3WcFQsO5L1xrYu3pdgr15GrU6B0Mr3nXC504REft4XdMBnaUehKu9waD5WypGkmOeiw7ixiRIfDP3kQ",
        "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwic2NvcGVzIjpbIlJPTEVfUkVGUkVTSF9UT0tFTiJdLCJpc3MiOiJodHRwOi8vd3d3LmVjby1pb3QuY29tLyIsImp0aSI6ImQ4NTNiYTRkLTRiNzYtNDc4Mi04ZDc4LTgxMzZjODQ5ZDFkMyIsImlhdCI6MTUyMTAxNjE1NiwiZXhwIjoxNTIxMDUyMTU2fQ.0cKs6Nz9m_DcqKKtAzbpIsXzWQRzzIBEP9aj5Ueg_x4ADyInbQdFjeateJVwC7_eo_qUjhlFk32Npir823pJyw"
      }
    }
  }
});
// 申请登出
Mock.mock('/user/logout', 'post', {
  "操作":"登出登出登出登出登出登出",
  "code": 0,
  "message": "正常",
  "data": null
});
