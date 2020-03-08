<template>
  <div class="home">
    <el-button type="info" @click="onExit">退出登录</el-button>   
  </div>
</template>

<script>


export default {
  name: 'Home',
  methods: {
    onExit(){
      this.$confirm('您确定要退出吗？（会清空您的本地登录状态）','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warnning'
      }).then(()=>{
        this.$message({
          type:'info',
          message:'您已退出系统'
        })
        window.sessionStorage.clear()
        this.$router.push('/login')
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'您已取消登录'
        })
      })
      
    }
  },
}
</script>
