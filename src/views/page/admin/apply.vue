<template lang="html">
  <div>
    <fieldset>
      <legend>物资申领</legend>

      <el-table :data="applyData" highlight-current-row border stripe style="width: 100%" :default-sort = "{prop: 'name', order: 'descending'}">
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

    <!-- 申领物资 -->
    <el-dialog title="" :visible.sync="applyGoods" center fullscreen>
      <div>
        <fieldset>
          <legend>物资申领</legend>

          <el-form :model="applyForm" :rules="applyRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="分类" prop="classify">
              <el-select v-model="applyForm.classify" placeholder="请选择分类">
                <el-option label="电子元器件" value="1"></el-option>
                <el-option label="传感器" value="2"></el-option>
                <el-option label="专用设备" value="3"></el-option>
                <el-option label="办公用品" value="4"></el-option>
                <el-option label="日用电器" value="5"></el-option>
                <el-option label="书籍材料" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="名称" prop="name">
              <el-input v-model="applyForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="品牌" prop="brand">
              <el-input v-model="applyForm.brand" placeholder="请输入品牌"></el-input>
            </el-form-item>

            <el-form-item label="型号" prop="model">
              <el-input v-model="applyForm.model" placeholder="请输入型号"></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="单位" prop="unit">
                  <el-select v-model="applyForm.unit" placeholder="请选择单位">
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
                    <el-input-number v-model="applyForm.num" controls-position="right" :min="1" :max="10000"></el-input-number>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="价格/元" prop="price">
              <el-input v-model.number="applyForm.price" placeholder="请输入价格"></el-input>
            </el-form-item>

            <el-form-item label="供应来源" prop="source">
              <el-select v-model="applyForm.source" placeholder="请选择供应来源">
                <el-option label="淘宝/天猫/京东" value="1"></el-option>
                <el-option label="线上独立商城" value="2"></el-option>
                <el-option label="线下超市/五金店" value="3"></el-option>
                <el-option label="厂家" value="4"></el-option>
                <el-option label="自主研发" value="5"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="存放位置" prop="pos">
              <el-select v-model="applyForm.pos" placeholder="请选择存放位置">
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
              <el-button type="primary" @click="applyGoods = false">修改</el-button>
              <el-button @click="applyGoods = false">返回</el-button>
            </el-form-item>
          </el-form>

        </fieldset>
      </div>
    </el-dialog>

    <!-- 申领已批准 -->
    <el-dialog title="" :visible.sync="approved" center fullscreen>

      <fieldset>
        <legend>物资申领详情</legend>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applicant}}
          </div>
        </div>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applyTime}}
          </div>
        </div>

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

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>审核结果</h3>
          </div>
          <div style="width:100%;" v-html="applyRes">
          </div>
        </div>

      </fieldset>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approved = false">出 库</el-button>
      </span>
    </el-dialog>

    <!-- 申领已出库 -->
    <el-dialog title="" :visible.sync="outStore" center fullscreen>

      <fieldset>
        <legend>物资申领详情</legend>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applicant}}
          </div>
        </div>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applyTime}}
          </div>
        </div>

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

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>审核结果</h3>
          </div>
          <div style="width:100%;" v-html="applyRes">
          </div>
        </div>

      </fieldset>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="outStore = false">确 定</el-button> -->
        <el-button @click="outStore = false">返回</el-button>
      </span>
    </el-dialog>

    <!-- 申领待审核 -->
    <el-dialog title="" :visible.sync="notAudit" center fullscreen>

      <fieldset>
        <legend>物资申领详情</legend>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applicant}}
          </div>
        </div>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applyTime}}
          </div>
        </div>

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

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>审核结果</h3>
          </div>
          <div style="width:100%;" v-html="applyRes">
          </div>
        </div>

      </fieldset>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="notAudit = false">批 准</el-button>
        <el-button type="danger" @click="notAudit = false">拒 绝</el-button>
      </span>
    </el-dialog>

    <!-- 申领不通过 -->
    <el-dialog title="" :visible.sync="notPass" center fullscreen>

      <fieldset>
        <legend>物资申领详情</legend>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applicant}}
          </div>
        </div>

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>申请人</h3>
          </div>
          <div style="width:100%;">
            {{applyTime}}
          </div>
        </div>

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

        <div style="display:flex;align-items:center;padding:10px;">
          <div style="width:100px;">
            <h3>审核结果</h3>
          </div>
          <div style="width:100%;" v-html="applyRes">
          </div>
        </div>

      </fieldset>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="notPass = false">确 定</el-button> -->
        <el-button @click="notPass = false">返回</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        applyGoods:false,
        approved:false,
        outStore:false,
        notAudit:false,
        notPass:false,
        applicant:'',
        applyTime:'',
        applyRes:'',
        applyForm: {
          num: 1,
          name: '',
          brand: '',
          model: '',
          classify: '',
          unit: '',
          source: '',
          pos: '',
        },
        applyRules: {
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
        applyData:[],
      }
    },
    methods:{
      getData() {
        const self = this
        this.axios.get('/list/info')
        .then(function (response) {
          self.applyData = response.data.list
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      dateFormat(row){
        return this.tools.getDateDiff(row.date)
      },
      applyDetails(index,row) {
        const self = this
        self.applicant = row.name
        self.applyTime = this.tools.getDateDiff(row.date)
        if(row.status === 0){ //已批准
          self.approved = true
          self.applyRes = '<span class="el-tag el-tag--success el-tag--small">已批准</span>'
        }else if(row.status === 1){ //已出库
          self.outStore = true
          self.applyRes = '<span class="el-tag el-tag--dangerinfo el-tag--small">已出库</span>'
        }else if(row.status === 2){ //待审核
          self.notAudit = true
          self.applyRes = '<span class="el-tag el-tag--warning el-tag--small">待审核</span>'
        }else{ //审核不通过
          self.notPass = true
          self.applyRes = '<span class="el-tag el-tag--danger el-tag--small">审核不通过</span>'
        }
      },
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped>
  h3{
    margin: 0;
  }
</style>
