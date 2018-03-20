<template>

<div class="login-wrap">
    <!-- <div class="head-log">
        <img class="company-log" src="/static/images/common/company-log.png" alt="公司log" />
    </div> -->
    <div class="ms-title">仓储管理系统</div>
    <div class="ms-login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-button style="float:right;padding:2px 0;" type="text" @click="open">忘记密码</el-button>
            <br>
            <br>
            <div class="login-btn">
                <el-button type="primary" :loading="loading"  @click.native.prevent="handleLogin">登录</el-button>
            </div>
        </el-form>
    </div>
</div>

</template>

<script>
import jwt from 'jwt-simple'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      checked: true,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }]
      },
      loading: false
    }
  },
  //页面加载调用获取cookie值
  mounted() {
    this.Cookies.set('34634565', 'self.loginForm.username', { expires: 7 });
    console.log('2314145');
    this.loginForm.username = this.Cookies.get('userName')
    this.loginForm.password = this.Cookies.get('userPwd')

    // 本地测试数据
    this.axios.post('/user/login', {
      'username':'admin',
      'password':'12334523445',
    }).then((res) => {
      let _res = res.data;
      // console.log(_res);
      if (_res.code === 0) {
        const decoded = jwt.decode(_res.data.token,'9FE9DF13C0C959EF',true,'HS512').scopes
        // console.log(decoded);
      } else {
        console.log('错误错误错误错误错误错误错误');
      }
    })
  },
  methods: {
    handleLogin() {
      const self = this;
      self.$refs.loginForm.validate(valid => {
        if (valid) {
          self.$store.dispatch('Login', self.loginForm).then(() => {
            self.loading = true
            // alert('登录成功')
            if (self.checked == true) {
              console.log("checked == true");
              //传入账号名，密码，和保存天数3个参数
              self.Cookies.set('userName', self.loginForm.username, { expires: 7 });
              self.Cookies.set('userPwd', self.loginForm.password, { expires: 7 });
            }else {
              //清空Cookie
              console.log("checked == false");
              self.Cookies.remove('userName');
              self.Cookies.remove('userPwd');
            }
            localStorage.setItem('ms_username', self.loginForm.username)
            self.$router.push('/index')
          }).catch(() => {
            self.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    open() {
      this.$alert('请联系管理员重置密码', '忘记密码', {
        confirmButtonText: '确定',
      });
    },
  }
}

</script>

<style scope>

  .head-log {
    height: 200px;
  }

  .company-log {
    width: 300px;
  }

  .ms-title {
    margin-top: 200px;
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(64, 158, 255, 0.71);
    overflow: auto;
  }

  .ms-login {
    width: 28%;
    height: auto;
    margin: 60px auto 0;
    padding: 30px 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }

  .user-defined-style {
    top: 800px;
  }
</style>
