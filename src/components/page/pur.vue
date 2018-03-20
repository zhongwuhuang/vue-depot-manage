<template lang="html">

  <div class="admin" v-if="role === 'ROLE_ADMIN'">

    <fieldset>
      <legend>物资采购</legend>

      <div style="display:flex;align-items:center;padding:10px 14px;">
        <div style="width:100%;">
        </div>
        <div style="width:200px;">
            <!-- <router-link to="/applytest"><el-button type="success">采购物资</el-button></router-link> -->
            <el-button @click="pur()" type="success">采购</el-button>
        </div>
      </div>

      <el-table :data="purData" highlight-current-row border stripe style="width: 100%" :default-sort = "{prop: 'name', order: 'descending'}">
        <el-table-column align="center" prop="name" label="申请人" sortable  width="auto"></el-table-column>
        <el-table-column align="center" prop="date" label="申请时间" :formatter="dateFormat" sortable width="auto"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="auto">
          <template slot-scope="scope">
            <el-tag size="small" type="success" v-if="scope.row.status == 0">已批准</el-tag>
            <el-tag size="small" type="dangerinfo" v-if="scope.row.status == 1">已出库</el-tag>
            <el-tag size="small" type="warning" v-if="scope.row.status == 2">待审核</el-tag>
            <el-tag size="small" type="danger" v-if="scope.row.status == 3">审核不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goods" label="物资名称" width="auto"></el-table-column>
        <el-table-column align="center" label="操作" width="auto">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="applyDetails(scope.$index,scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

    </fieldset>

  </div>

  <div class="user" v-else>

    <fieldset>
      <legend>物资采购</legend>

      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="采购目的" prop="purpose">
          <el-input v-model="purForm.purpose"></el-input>
        </el-form-item>

        <el-form-item label="采购要求" prop="required">
          <el-input type="textarea" v-model="purForm.required"></el-input>
        </el-form-item>

        <el-form-item label="相关图片">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="相关链接" prop="link">

          <el-row v-for="(item,key) in purForm.link" :key="key" class="linklist">
            <el-col :span="6" style="margin-right:16px;">
              <el-input v-model="purForm.link[key]"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" round @click="removeLink(key)">删除</el-button>
            </el-col>
          </el-row>

          <el-row class="linklist">
            <el-col :span="6">
              <el-button type="success" round @click="addLink">添加</el-button>
            </el-col>
          </el-row>

        </el-form-item>

        <el-form-item>
          <el-button type="primary">确定</el-button>
          <el-button v-if="realRole === 'ROLE_ADMIN'" @click="pur()">返回</el-button>
        </el-form-item>
      </el-form>

    </fieldset>

  </div>

</template>

<script>
  export default {
    data(){
      return {
        role:'',
        realRole:'',
        purData:[],
        purForm: {
          purpose: '目的',
          required: '要求',
          link: [
            ' ',
          ],
        },
      }
    },
    // computed:{
    //   role(){
    //     return this.tools.roles()[0]
    //   },
    // },
    methods:{
      getRole() {
        const self = this
        self.role = self.tools.roles()[0]
        self.realRole = self.tools.roles()[0]
      },
      pur(){
        const self = this
        if(self.role === 'ROLE_ADMIN'){
          self.role = 'ROLE_USER'
        }else{
          self.role = 'ROLE_ADMIN'
        }
      },
      getPurData() {
        const self = this
        this.axios.get('/list/info')
        .then(function (response) {
          self.purData = response.data.list
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      // 删除链接
      removeLink(index) {
        console.log(index);
        this.purForm.link.splice(index, 1)
      },
      // 添加链接
      addLink() {
        this.purForm.link.push('')
        console.log(this.purForm.link);
      },
      dateFormat(row){
        return this.tools.getDateDiff(row.date)
      },
    },
    created(){
      this.getPurData(),
      this.getRole()
    }
  }
</script>

<style scoped>
  .user .el-input>input{
     border-radius:30px;
  }
  .user .linklist:not(:last-child){
    margin-bottom: 10px;
  }
</style>
