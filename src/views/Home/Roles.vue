<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="2">
          <el-button type="primary">新增角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData" style="width: 100%;margin-top:15px;" stripe  border >
        <el-table-column type="expand">
          <template v-slot="scope">
            <pre>
              {{scope.row}}
            </pre>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDetail" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>

            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>

            <el-button type="warning" icon="el-icon-user-solid" size="mini">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getRolesInfo();
  },
  methods: {
    async getRolesInfo(){
      const res  =  await this.$axios.get('/auths');
      console.log('roles res',res);
      this.tableData = res.data;
    }
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>