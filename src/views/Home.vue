<template>
  <el-container class="containerBox">
    <!-- 顶部导航栏 -->
    <el-header>
      <div class="titleBox">
        <img src="../assets/logo.png" alt />
        <span>xx后台管理系统</span>
      </div>
      <span class="userinfo">欢迎您，亲爱的{{userName}}</span>
      <el-button class="exitBtn" type="info" @click="onExit">注销</el-button>
    </el-header>
    <!-- 侧边导航区域 -->
    <el-container>
      <el-aside :width="isCollapse? '64px':'200px'" >
        <el-menu
          default-active="/users"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#4d4d4d"
          text-color="#ffffff"
          unique-opened
          :collapse-transition="false"
          router
        >
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-location"></i>&emsp;
              <span slot="title">用户管理</span>
            </template>
             <el-menu-item index="/users">
            <i class="el-icon-menu"></i>&emsp;
            <span slot="title">用户列表</span>
          </el-menu-item>
            </el-submenu>
            
            <el-submenu index="2">
            <template slot="title">
               <i class="el-icon-menu"></i>&emsp;
              <span slot="title">权限管理</span>
            </template>
             <el-menu-item index="/roles">
            <i class="el-icon-menu"></i>&emsp;
            <span slot="title">角色列表</span>
          </el-menu-item>
          <el-menu-item index="/auth">
            <i class="el-icon-menu"></i>&emsp;
            <span slot="title">权限列表</span>
          </el-menu-item>
            </el-submenu>

           <el-submenu index="3">
            <template slot="title">
               <i class="el-icon-menu"></i>&emsp;
              <span slot="title">商品管理</span>
            </template>
             <el-menu-item index="/goods">
            <i class="el-icon-menu"></i>&emsp;
            <span slot="title">商品列表</span>
          </el-menu-item>
            </el-submenu>
         
         
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>&emsp;
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-data-line"></i>&emsp;
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item class="collapseBtn"  @click="collapseChange">
            <i :class="[isCollapse ? 'el-icon-right' : 'el-icon-back']"></i>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主要内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.containerBox {
  height: 100vh;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b2b2b;
  color: #ffffff;
}
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #4d4d4d;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.titleBox {
  width: 300px;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  display: flex;
  img {
    width: 60px;
    height: 60px;
  }
  span {
    font-size: 25px;
  }
}

.exitBtn {
  height: 40px;
  widows: 40px;
}

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

.el-menu{
  background:#4d4d4d;
  color: #ffffff; 
  text-align: left;
}


.collapseBtn{
  position: relative;
  bottom: 0;
  text-align: center;
}

.userinfo{
  text-align: right;
}
</style>
<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse:false,
      userName:''
    }
  },
  methods: {
    // 退出事件
    onExit() {
      this.$confirm("您确定要退出吗？（会清空您的本地登录状态）", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warnning"
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "您已退出系统"
          });
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "您已取消登录"
          });
        });
    },
    //侧边导航栏收缩事件
    collapseChange(){
      this.isCollapse = !this.isCollapse
    }
  }
};
</script>
