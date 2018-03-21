<template lang="html">
  <div>
    <fieldset>
      <legend>物资查询</legend>

      <div style="display:flex;align-items:center;padding:10px 14px;">
        <div style="width:100%;">
          <el-row>
            <el-col :span="24">
              <el-input prefix-icon="el-icon-search" v-model="input" placeholder="查询名称"></el-input>
            </el-col>
          </el-row>
        </div>
        <div style="width:100px;">
          <el-button style="float:right;" type="primary" round>搜索</el-button>
        </div>
      </div>

      <el-row>
        <el-col :span="24">
          <hr style="border:2px solid #E4E7ED;">
        </el-col>
      </el-row>

      <div style="display:flex;align-items:center;padding:10px 14px;margin-bottom:20px;">
        <div style="width:100px;text-align:center;">
          分类
        </div>
        <div style="width:100%;">
          <el-col :span="24">
            <template>
              <el-select style="width:100%;" v-model="categoryId" placeholder="请选择">
                <el-option v-for="item in options" :key="item.categoryId" :label="item.name" :value="item.categoryId"></el-option>
              </el-select>
            </template>
          </el-col>
        </div>
      </div>

      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row border stripe style="width: 100%" :default-sort = "{prop: 'goods', order: 'descending'}">
        <el-table-column align="center" prop="goods" label="物资名称" sortable  width="auto"></el-table-column>
        <el-table-column align="center" prop="classify" label="分类" sortable width="auto"></el-table-column>
        <el-table-column align="center" prop="brand" label="品牌" width="auto"></el-table-column>
        <el-table-column align="center" prop="model" label="型号" width="auto"></el-table-column>
        <el-table-column align="center" prop="unit" label="单位" width="auto"></el-table-column>
        <el-table-column align="center" prop="num" label="库存数量" sortable width="auto"></el-table-column>
        <el-table-column align="center" label="操作" :width="dynWidth">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="getdetail(scope.$index,scope.row)">详情</el-button>
            <el-button size="mini" type="success" @click="getapply(scope.row)">申领</el-button>
            <el-button size="mini" type="warning" @click="getpur">采购</el-button>
            <el-button size="mini" type="info" v-if="role==='ROLE_ADMIN'">入库</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
      </div>

    </fieldset>

    <el-dialog title="" :visible.sync="details" center fullscreen>
      <div>
        <fieldset>
          <legend>物资详情</legend>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="分类" prop="classify">
              <el-select v-model="ruleForm.classify" placeholder="请选择分类">
                <el-option label="电子元器件" value="1"></el-option>
                <el-option label="传感器" value="2"></el-option>
                <el-option label="专用设备" value="3"></el-option>
                <el-option label="办公用品" value="4"></el-option>
                <el-option label="日用电器" value="5"></el-option>
                <el-option label="书籍材料" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="品牌" prop="brand">
              <el-input v-model="ruleForm.brand" placeholder="请输入品牌"></el-input>
            </el-form-item>

            <el-form-item label="型号" prop="model">
              <el-input v-model="ruleForm.model" placeholder="请输入型号"></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位" prop="unit">
                  <el-select v-model="ruleForm.unit" placeholder="请选择单位">
                    <el-option label="个/把/本/套" value="1"></el-option>
                    <el-option label="包" value="2"></el-option>
                    <el-option label="箱" value="3"></el-option>
                    <el-option label="千克" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="库存数量">
                  <template>
                    <el-input-number v-model="ruleForm.num" controls-position="right" :min="1" :max="10000"></el-input-number>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="价格/元" prop="price">
              <el-input v-model.number="ruleForm.price" placeholder="请输入价格"></el-input>
            </el-form-item>

            <el-form-item label="供应来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择供应来源">
                <el-option label="淘宝/天猫/京东" value="1"></el-option>
                <el-option label="线上独立商城" value="2"></el-option>
                <el-option label="线下超市/五金店" value="3"></el-option>
                <el-option label="厂家" value="4"></el-option>
                <el-option label="自主研发" value="5"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="存放位置" prop="pos">
              <el-select v-model="ruleForm.pos" placeholder="请选择存放位置">
                <el-option label="储物间" value="1"></el-option>
                <el-option label="办公室" value="2"></el-option>
                <el-option label="会客室" value="3"></el-option>
                <el-option label="学校仓库" value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="图片">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
              <el-button @click="details = false">返回</el-button>
            </el-form-item>
          </el-form>

        </fieldset>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="apply" center fullscreen>

      <fieldset>
        <legend>物资申领</legend>

        <el-table :data="apllyData" highlight-current-row border stripe style="width: 100%">
          <el-table-column align="center" prop="goods" label="物资名称" sortable  width="auto"></el-table-column>
          <el-table-column align="center" prop="classify" label="分类" sortable width="auto"></el-table-column>
          <el-table-column align="center" prop="brand" label="品牌" width="auto"></el-table-column>
          <el-table-column align="center" prop="model" label="型号" width="auto"></el-table-column>
          <el-table-column align="center" prop="unit" label="单位" width="auto"></el-table-column>
          <el-table-column align="center" prop="num" label="库存数量" sortable width="auto"></el-table-column>
          <el-table-column align="center" prop="applyNum" label="申领数量" width="auto">
            <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.applyNum"></el-input>
            </template>
          </el-table-column>
        </el-table>

      </fieldset>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="apply = false">确 定</el-button>
        <el-button @click="apply = false">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog title="" :visible.sync="pur" center fullscreen>
      <div class="pur">
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
              <el-button type="primary" @click="pur = false">修改</el-button>
              <el-button @click="pur = false">返回</el-button>
            </el-form-item>
          </el-form>

        </fieldset>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        total:0,//默认数据总数
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        tableData:[],
        options: [],
        categoryId:'',
        details:false,
        apply:false,
        pur:false,
        ruleForm: {
          num: 1,
          name: '',
          brand: '',
          model: '',
          classify: '',
          unit: '',
          source: '',
          pos: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          brand: [
            { required: true, message: '请输入品牌', trigger: 'blur' },
          ],
          model: [
            { required: true, message: '请输入型号', trigger: 'blur' },
          ],
          unit: [
            { required: true, message: '请选择单位', trigger: 'change' }
          ],
          classify: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入价格',  trigger: 'blur' },
            { type: 'number',message: '请输入数值', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '请选择采购来源', trigger: 'change' }
          ],
          pos: [
            { required: true, message: '请选择存放位置', trigger: 'change' }
          ],
        },
        apllyData: [
          {
            "goods": "",
            "brand": "",
            "model": "",
            "classify": "",
            "unit": "",
            "num": 0,
            "applyNum": 0,
          },
        ],
        purForm: {
          purpose: '目的',
          required: '要求',
          link: [
            'www.baidu.com/',
            'www.runoob.com/',
            'www.qdfuns.com/',
          ],
        },
      }
    },
    computed:{
      role(){
        return this.tools.roles()[0]
      },
      dynWidth(){
        return this.role === 'ROLE_ADMIN'?'350':'300'
      }
    },
    methods:{
      // 查看详情
      getdetail(index,row) {
        const self = this;
        self.details = true;
        self.ruleForm.name = row.goods
        self.ruleForm.classify = row.classify
        self.ruleForm.brand = row.brand
        self.ruleForm.model = row.model
        self.ruleForm.unit = row.unit
        self.ruleForm.num = row.num
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      // 提交详情表单申请
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 申领
      getapply(row){
        const self = this
        self.apply = true
        self.apllyData[0].goods = row.goods
        self.apllyData[0].brand = row.brand
        self.apllyData[0].model = row.model
        self.apllyData[0].classify = row.classify
        self.apllyData[0].unit = row.unit
        self.apllyData[0].num = row.num
      },
      // 采购
      getpur(){
        const self = this
        self.pur = true
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
      // 获取物品列表
      getGoods() {
        const self = this
        self.axios.get('/list/goods')
        .then(function (response) {
          self.tableData = response.data.list
          self.total = response.data.list.length
          console.log(self.total);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      // 获取分类列表
      getCategory(){
        const self = this
        console.log(self.tools.$axios('get','api/categories'))
      },
    },
    // 下拉框默认选中
    created(){
      this.getGoods()
      // this.getCategory()
      // this.selected = this.options[0].categoryId
    }
  }
</script>

<style scoped>
  .pur .el-input>input{
     border-radius:30px;
  }
  .pur .linklist:not(:last-child){
    margin-bottom: 10px;
  }
  .pagination{
    margin: 20px auto 0;
    text-align: center;
  }
</style>
