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
          <el-input
            v-model="queryInfo.queryValue"
            placeholder="请输入内容"
            clearable
            @clear="getUserInfo"
          >
            <el-button type="primary" slot="append" @click="getUserInfo" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格组件 -->
      <el-table :data="tableData" style="width: 100%" border stripe highlight-current-row>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="phoneNum" label="电话"></el-table-column>
        <el-table-column prop="roles" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot:default="scope">
            <el-switch v-model="scope.row.status" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="play" label="操作" width="180">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="修改" placement="top-start" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserInfo(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserInfo(scope.row.id)"></el-button>
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
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- Dialog添加用户对话框组件 -->
    <el-dialog title="添加用户信息" :visible.sync="dialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addRuleFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="addForm.roles" placeholder="请选择用户角色" style="display:block;">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="用户" value="用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phonenum">
          <el-input v-model="addForm.phonenum"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- Dialog修改用户对话框组件 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phoneNum">
          <el-input v-model="editForm.phoneNum"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
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
    // 自定义验证规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        //验证通过 合法邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };
    // 手机号验证规则
    var checkPhoneNum = (rule, value, cb) => {
      const regPhoneNum = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regPhoneNum.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      // 整个表格的数据集
      tableData: [],
      value: true,
      // 分页请求的数据源
      queryInfo: {
        queryValue: "",
        pageNum: 1,
        pageSize: 10
      },
      // 数据总数
      total: 0,
      dialogVisible: false,
      // 添加用户表单初始数据
      addForm: {
        username: "",
        roles: "",
        email: "",
        phonenum: ""
      },
      // 添加用户表单验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 ~ 10 个字符", trigger: "blur" }
        ],
        roles: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phonenum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhoneNum, trigger: "blur" }
        ]
      },
      editDialogVisible: false,
      // 修改用户表单初始数据
      editForm: {
        id:0,
        name: "",
        email: "",
        phoneNum: ""
      },
      // 修改用户表单验证规则
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phonenum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhoneNum, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 执行数据请求
    this.getUserInfo();
  },
  methods: {
    // 发起网络请求获取用户数据
    getUserInfo() {
      this.$axios
        .get("/users", {
          params: this.queryInfo
        })
        .then(res => {
          console.log("请求到的源数据", res);
          const { allList, list } = res.data.res;
          console.log("list", list);
          this.tableData = list;
          this.total = allList.length;
          console.log(this.total);
        });
    },
    //切换每页显示条数事件
    handleSizeChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageSize = newPage;
      console.log("newpagesize", this.queryInfo.pageSize);
      this.getUserInfo();
    },
    //每次切换页码触发事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNum = newPage;
      this.getUserInfo();
    },
    // Dialog关闭重置表单
    addDialogClose() {
      this.$refs.addRuleFormRef.resetFields();
    },
    // 添加用户确认
    addUser() {
      this.$refs.addRuleFormRef.validate(async valid => {
        if (!valid) return;
        // 验证成功发起添加用户请求
        const res = await this.$axios.post("/users", this.addForm);
        console.log("addres", res);
        // if (res.meta.status !== 201) {
        //   this.$message.error("添加用户失败");
        //   return;
        // }

        this.$message.success("添加用户成功");
        // 隐藏dialog
        this.dialogVisible = false;
        // 重新发起请求刷新列表
        this.getUserInfo();
      });
    },
    // 修改用户按钮
    async editUserInfo(id) {
      console.log('id:',id);
      const res = await this.$axios.get('users/' + id)
        console.log(res)
        this.editForm  = res.data.result[0];
        this.editDialogVisible = true;
      
    },
    // 修改用户确认事件
    editUser(){
      this.$refs.editFormRef.validate(async valid =>{
        if(!valid) return;
        const res = await this.$axios.post('/editusers',this.editForm);
        console.log(res);
        if(res.data.status == 200){
          this.$message.success('已更新数据成功')
        }else{
          this.$message.error('更新数据操作失败，请重试')
        }
        this.editDialogVisible = false;
        this.getUserInfo();
      })
    },
    // 删除用户按钮
    async deleteUserInfo(id){
      const resultConfirm = await this.$confirm('您确定要删除该用户的记录吗？','操作提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).catch(err => err)
      console.log(resultConfirm);
      if(resultConfirm !== 'confirm'){
        return this.$message.info('您已取消删除操作')
      } 
    //发起删除请求  
     const { data } = await this.$axios.delete('users/' + id);

     if(data.meta.status !== 200){
       return this.$message.error('删除数据失败')
     }

     this.$message.success('数据已成功删除！')
    //若成功删除，则刷新列表
     this.getUserInfo()
          
    
    }
  }
};
</script>