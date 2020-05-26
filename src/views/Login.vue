<template>
  <div class="box" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="loginBox">
      <!-- 图标区域 -->
      <div class="logo">
        <img src="../assets/logo.png" />
      </div>

      <!-- 登录表单 -->
      <el-form ref="form" :model="form" :rules="formRule" label-width="70px" class="formBox">
        <el-form-item label="账号：" prop="userName">
          <el-input prefix-icon="el-icon-user" v-model="form.userName"></el-input>
        </el-form-item>
         <el-form-item label="密码：" prop="passWord">
          <el-input prefix-icon="el-icon-lock" show-password  v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item class="loginBtn" label-width="0">
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
          <el-button type="info" @click="onReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
  background: #1b57b1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loginBox {
  background: #fff;
  width: 500px;
  height: 300px;
  border-radius: 5px;
}

.logo {
  position: relative;
  margin: 0 auto;
  top: -50%;
  transform: translateY(50%);
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px;
  background: #fff;
  img {
    width: 100%;
    height: 100%;
    background: #eee;
    border-radius: 50%;
  }
}

.formBox{
  box-sizing: border-box;
  padding:  0 20px 10px 10px;
}

</style>

<script>
export default {
  data() {
    return {
      form:{
        userName:'',
        passWord:''
      },
      // Element表单验证规则
      formRule:{
        userName:[
          {
            required:true,
            message:'请输入账号！',
            trigger:'blur'
          },
          {
            min:5,
            max:10,
            message:'用户名最少五位数，最大不超过十位！',
            trigger:'blur'
          }
        ],
        passWord:[
          {
            required:true,
            message:'请输入密码！',
            trigger:'blur'
          },
          {
            min:6,
            max:10,
            message:'用户名最少六位数，最大不超过十位！',
            trigger:'blur'
          }
        ]
      },
      loading:false
    };
  },
  methods: {
    // 重置表单
    onReset(formObj){
      // this.form.userName = ''
      // this.form.passWord = ''
      this.$refs[formObj].resetFields();
    },
    // 提交表单验证，成功就发送请求
    onSubmit(formObj){
      this.loading = true
      this.$refs[formObj].validate((valid)=>{
        if(valid){
          this.$message({
            type:'success',
            message:'成功登录！'
          })
          this.$axios.post('/login',this.form)
          .then(res=>{
            // 解构赋值出res里的data，直接打印出来
            const { data } = res
            console.log(data)
            window.sessionStorage.setItem('tokenid',data.token)
            window.sessionStorage.setItem('username',data.username)
            this.loading = false
            this.$router.push('/home')
          })  
            
        }else{
          this.$message({
            type:'error',
            message:'登录失败，账号或密码不符合规则'
          })
          this.loading = false
        }
      })
    }
  },
};
</script>