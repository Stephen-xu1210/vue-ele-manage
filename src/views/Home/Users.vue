<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :style="{marginBottom:'15px'}">
        <el-col :span="8">
          <el-input v-model="inputValue" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="number" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" @change="toggleSwitch"></el-switch>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="80"></el-pagination>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
<script>
export default {
  name: "Users",
  data() {
    return {
      inputValue: "",
      tableData: [],
      value:true
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/users").then(res => {
        console.log(res);
        const { userInfo: userData } = res.data;
        console.log(userData);
        this.tableData = userData;
      });
    },
    toggleSwitch(){
        this.value = !this.value
    }
  }
};
</script>