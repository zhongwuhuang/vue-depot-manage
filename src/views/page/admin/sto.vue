<template lang="html">
  <div>
    <fieldset>
      <legend>物资入库</legend>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="分类">
          <el-select v-model="ruleForm.classify" placeholder="请选择分类">
            <el-option v-for="(item,index) in options1" :key="index" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="ruleForm.brand" placeholder="请输入品牌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号" prop="model">
              <el-input v-model="ruleForm.model" placeholder="请输入型号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-select v-model="ruleForm.unit" placeholder="请选择单位">
                <el-option v-for="(item,index) in options4" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="num">
              <template>
                <el-input-number v-model="ruleForm.num" controls-position="right" :min="0" :max="10000"></el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="价格/元" prop="price">
          <el-input v-model.number="ruleForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>

        <el-form-item label="供应来源">
          <el-select v-model="ruleForm.source" placeholder="请选择供应来源">
            <el-option v-for="(item,index) in options2" :key="index" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="存放位置">
          <el-select v-model="ruleForm.pos" placeholder="请选择存放位置">
            <el-option v-for="(item,index) in options3" :key="index" :label="item.label" :value="item.label"></el-option>
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </fieldset>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        options1: [
          {
            value: 1,
            label: '电子元器件'
          },
          {
            value: 2,
            label: '传感器'
          },
          {
            value: 3,
            label: '专用设备'
          },
          {
            value: 4,
            label: '办公用品'
          },
          {
            value: 5,
            label: '日用电器'
          },
          {
            value: 6,
            label: '书籍材料'
          }
        ],
        options2: [
          {
            value: 1,
            label: '淘宝/天猫/京东'
          },
          {
            value: 2,
            label: '线上独立商城'
          },
          {
            value: 3,
            label: '线下超市/五金店'
          },
          {
            value: 4,
            label: '厂家'
          },
          {
            value: 5,
            label: '自主研发'
          }
        ],
        options3: [
          {
            value: 1,
            label: '储物间'
          },
          {
            value: 2,
            label: '办公室'
          },
          {
            value: 3,
            label: '会客室'
          },
          {
            value: 4,
            label: '学校仓库'
          }
        ],
        options4: [
          {
            value: 1,
            label: '个/把/本/套'
          },
          {
            value: 2,
            label: '包'
          },
          {
            value: 3,
            label: '箱'
          },
          {
            value: 4,
            label: '千克'
          }
        ],
        ruleForm: {
          classify: '',
          name: '',
          brand: '',
          model: '',
          unit: '',
          num: 0,
          price: '',
          source: '',
          pos: '',
        },
        rules: {
          // classify: [
          //   { required: true, message: '请选择分类', trigger: 'change' }
          // ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          // unit: [
          //   { required: true, message: '请选择单位', trigger: 'change' }
          // ],
          num: [
            { required: true, message: '请输入数量', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入价格',  trigger: 'blur' },
            { type: 'number',message: '请输入数值', trigger: 'blur' }
          ],
          // source: [
          //   { required: true, message: '请选择采购来源', trigger: 'change' }
          // ],
          // pos: [
          //   { required: true, message: '请选择存放位置', trigger: 'change' }
          // ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log('34234'+this.dialogImageUrl);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log('eeeee');
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    created(){
      this.ruleForm.classify = this.options1[0].label
      this.ruleForm.unit = this.options4[0].label
      this.ruleForm.source = this.options2[0].label
      this.ruleForm.pos = this.options3[0].label
    }
  }
</script>

<style scoped>
  .el-select{
    width:100%;
  }
</style>
