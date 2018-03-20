<template lang="html">
  <div>
    <fieldset>
      <legend>申领进度</legend>

      <el-card v-for="(item,key) in showList" :key="key" class="box-card" :class="'active' + item.status">
        <span>
          <i class="el-icon-success" v-if="item.status == 0"></i>
          <i class="el-icon-error" v-if="item.status == 1"></i>
          <i class="el-icon-question" v-if="item.status == 2"></i>
          {{item.goods}}
        </span>
        <div class="right">
          <span class="time">{{item.time}}</span>
        </div>
      </el-card>
      <div @click="showAll = !showAll" class="show-more">{{word}}</div>

    </fieldset>
    <br>
    <fieldset>
      <legend>申领进度</legend>

      <el-card v-for="(item,key) in list" :key="key" class="box-card" :class="'active' + item.status">
        <span>
          <i class="el-icon-success" v-if="item.status == 0"></i>
          <i class="el-icon-error" v-if="item.status == 1"></i>
          <i class="el-icon-question" v-if="item.status == 2"></i>
          {{item.goods}}
        </span>
        <div class="right">
          <span class="time">{{item.time}}</span>
        </div>
      </el-card>

    </fieldset>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        list:[
          {'status':1,'goods':'圆珠笔','time':'2018-03-14'},
          {'status':2,'goods':'笔记本','time':'2018-03-14'},
          {'status':0,'goods':'电脑','time':'2018-03-14'},
          {'status':1,'goods':'器件','time':'2018-03-14'},
        ],
        showAll:false,
      }
    },
    computed:{
      showList:function(){
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
      word:function(){
        if(this.showAll == false){　　　　　　　　　　　//对文字进行处理
          return '查看所有'
        }else{
          return '收起'
        }
      }
    }
  }
</script>

<style scoped>
  .el-card{
    color: #fff;
  }
  .right{
    float:right;
  }
  .box-card:not(:last-child){
    margin-bottom: 20px;
  }
  .active0{
    background: #67C23A;
  }
  .active1{
    background: #F56C6C;
  }
  .active2{
    background: #E6A23C;
  }
  .show-more{
    color: #409eff;
    cursor: pointer;
    text-align: right;
    padding: 6px 0;
    transition: background 1s;
  }
  .show-more:hover{
    background-color: #F2F6FC;
  }
</style>
