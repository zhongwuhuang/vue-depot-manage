<template lang="html">

  <div class="admin" v-if="role === 'ROLE_ADMIN'">
    <fieldset>
      <legend>申领进度</legend>
        <el-table :data="tableData" highlight-current-row border stripe style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column align="center" prop="name" label="申请人" sortable width="auto"></el-table-column>
          <el-table-column align="center" prop="date" label="申请时间" sortable width="auto" :formatter="dateFormat"></el-table-column>
          <el-table-column align="center" prop="status" label="状态" width="auto">
            <template slot-scope="scope">
              <el-tag size="small" type="success" v-if="scope.row.status == 0">已批准</el-tag>
              <el-tag size="small" type="dangerinfo" v-if="scope.row.status == 1">已出库</el-tag>
              <el-tag size="small" type="warning" v-if="scope.row.status == 2">待审核</el-tag>
              <el-tag size="small" type="danger" v-if="scope.row.status == 3">审核不通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="goods" label="物资名称" width="auto"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="getdetail">详情</el-button>
              <el-button size="mini" type="success">批准</el-button>
              <el-button size="mini" type="warning">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
    </fieldset>
    <br>
    <br>
    <fieldset>
      <legend>采购申请</legend>
      <el-card class="box-card">
        <img class="user-logo" src="../../../static/img/img.jpg">
        <div style="display:inline-block;">
          <span class="name">张三</span>
          <br>
          <span class="cont">圆珠笔100根，笔记本100本</span>
        </div>
        <div class="right">
          <span class="time">20分钟前</span>
          <el-button-group>
            <el-button type="success" icon="el-icon-check">批准</el-button>
            <el-button type="warning" icon="el-icon-close">拒绝</el-button>
          </el-button-group>
        </div>
      </el-card>
      <el-card class="box-card">
        <img class="user-logo" src="../../../static/img/img.jpg">
        <div style="display:inline-block;">
          <span class="name">张三</span>
          <br>
          <span class="cont">圆珠笔100根，笔记本100本</span>
        </div>
        <div class="right">
          <span class="time">20分钟前</span>
          <el-button-group>
            <el-button type="success" icon="el-icon-check">批准</el-button>
            <el-button type="warning" icon="el-icon-close">拒绝</el-button>
          </el-button-group>
        </div>
      </el-card>
      <el-card class="box-card">
        <img class="user-logo" src="../../../static/img/img.jpg">
        <div style="display:inline-block;">
          <span class="name">张三</span>
          <br>
          <span class="cont">圆珠笔100根，笔记本100本</span>
        </div>
        <div class="right">
          <span class="time">20分钟前</span>
          <el-button-group>
            <el-button type="success" icon="el-icon-check">批准</el-button>
            <el-button type="warning" icon="el-icon-close">拒绝</el-button>
          </el-button-group>
        </div>
      </el-card>
    </fieldset>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" center fullscreen>
      <span>{{detail}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="user" v-else>
    <fieldset>
      <legend>申领进度</legend>

      <el-card v-for="(item,key) in showList" :key="key" class="box-card" :class="'active' + item.status">
        <span>
          <i class="el-icon-success" v-if="item.status == 0"></i>
          <i class="el-icon-error" v-if="item.status == 1"></i>
          <i class="el-icon-question" v-if="item.status == 2"></i>
          &nbsp;&nbsp;{{item.goods}}
        </span>
        <div class="right">
          <span class="time">{{datefor(item.date)}}</span>
        </div>
      </el-card>
      <div v-if="list.length>3" @click="showAll = !showAll" class="show-more" v-html="word"></div>

    </fieldset>
    <br>
    <fieldset>
      <legend>采购进度</legend>

      <el-card v-for="(item,key) in list" :key="key" class="box-card" :class="'active' + item.status">
        <span>
          <i class="el-icon-success" v-if="item.status == 0"></i>
          <i class="el-icon-error" v-if="item.status == 1"></i>
          <i class="el-icon-question" v-if="item.status == 2"></i>
          &nbsp;&nbsp;{{item.goods}}
        </span>
        <div class="right">
          <span class="time">{{datefor(item.date)}}</span>
        </div>
      </el-card>

    </fieldset>
  </div>

</template>

<script>
  export default {
    data(){
      return {
        // admin信息
        tableData: [],
        centerDialogVisible:false,
        detail:'',
        // user信息
        list:[],
        showAll:false,
      }
    },

    computed:{
      // admin属性
      role(){
        return this.tools.roles()[0]
      },
      // role属性
      showList(){
        if(this.showAll == false){                    //当数据不需要完全显示的时候
          var showList = [];　　　　　　　　　　　　　　　 //定义一个空数组
          if(this.list.length > 3){　　　　　　　//这里我们先显示前三个
            for(var i=0;i<3;i++){
              showList.push(this.list[i])
            }
          }else{
            showList = this.list
          }
          return showList;　　　　　　　　　　　　　　　　 //返回当前数组
        }else{
          return this.list;
        }
      },
      word(){
        if(this.showAll == false){　　　　　　　　　　　//对文字进行处理
          return '<i class="el-icon-arrow-down"></i> 查看所有'
        }else{
          return '<i class="el-icon-arrow-up"></i> 收起'
        }
      },
    },

    methods:{
      getData() {
        const self = this
        this.axios.get('/list/info')
        .then(function (response) {
          self.tableData = response.data.list
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      getData1() {
        const self = this
        this.axios.get('/goods/info')
        .then(function (response) {
          self.list = response.data.list
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      // 查看详情
      getdetail() {
        const self = this;
        self.centerDialogVisible = true;
        self.axios.post('/list/info/view')
        .then((res) => {
          let _res = res.data;
          if (_res.state === 'success') {
            self.detail = _res.data.title;
          } else {
            self.$message.error(_res.msg);
          }
        });
      },
      datefor(date){
        return this.tools.getDateDiff(date)
      },
      dateFormat(row){
        return this.tools.getDateDiff(row.date)
      },
    },
    mounted(){
      this.getData()
      this.getData1()
    }
  }
</script>

<style scoped>
  /*admin样式*/
  .admin .has-gutter{
    background: #EEF1F6;
  }
  .admin .has-gutter th{
    background: #EEF1F6;
  }

  .admin .box-card{
    margin-bottom: 20px;
  }
  .admin .user-logo{
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    vertical-align: sub;
  }
  .admin .name{
    font-size: 14px;
  }
  .admin .right{
    float:right;padding-bottom:20px;
  }
  .admin .time{
    margin-right: 10px;
  }

  /*user样式*/
  .user .el-card{
    color: #fff;
  }
  .user .right{
    float:right;
  }
  .user .box-card:not(:last-child){
    margin: 10px 0;
  }
  .user .active0{
    background: #67C23A;
  }
  .user .active1{
    background: #F56C6C;
  }
  .user .active2{
    background: #E6A23C;
  }
  .user .show-more{
    color: #409eff;
    cursor: pointer;
    text-align: center;
    padding: 6px 0;
    transition: background 1s;
  }
  .user .show-more:hover{
    background-color: #F2F6FC;
  }
</style>
