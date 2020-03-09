<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <el-row :style="{marginBottom:'15px'}">
        <el-col :span="8">
          <el-input v-model="inputValue" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格组件 -->
      <el-table :data="tableData" style="width: 100%" border stripe highlight-current-row>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="number" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot:default="scope">
            <el-switch v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="play" label="操作" width="180">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="修改" placement="top-start" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-user-solid" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-table {
  font-size: 12px;
  margin-bottom: 10px;
}
</style>
<script>
export default {
  name: "Users",
  data() {
    return {
      inputValue: "",
      tableData: [],
      value: true,
      currentPage:1,
      pageSize:2,
      total:0
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
        this.total = this.tableData.length
      });
    },
    toggleSwitch() {
      this.value = !this.value;
    },
    //切换每页显示条数事件
    handleSizeChange(newPage){
      console.log(newPage)
      this.pageSize = newPage
      this.getUserInfo()
    },
    //每次切换页码触发事件
    handleCurrentChange(newPage){
      console.log(newPage)
      this.currentPage = newPage
      this.getUserInfo()
    }
  }
};
</script>