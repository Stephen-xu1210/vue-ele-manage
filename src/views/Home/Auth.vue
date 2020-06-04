<template>
    <div>
        <!-- 面包屑组件 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限等级列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="tableData" stripe border >
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column prop="authName" label="权限名称"></el-table-column>
          <el-table-column prop="path" label="路径"></el-table-column>
          <el-table-column prop="level" label="权限等级">
              <template v-slot="scope">
                  <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                  <el-tag type="warning" v-else-if="scope.row.level === '1'">二级</el-tag>
                  <el-tag type="danger" v-else>三级</el-tag>
              </template>
          </el-table-column>
        </el-table>
    </el-card>
    
    </div>
</template>

<script>
export default {
    name:'Auth',
    data() {
        return {
            tableData:[]
        }
    },
    mounted() {
        this.getAuthInfo()
    },
    methods: {
        // 获取权限列表数据
        async getAuthInfo(){
         const res = await this.$axios.get('auths/list')
         console.log('auth res ',res);
         this.tableData = res.data;
        }
    },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>