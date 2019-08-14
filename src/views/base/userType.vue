<template>
  <div id="user_type">
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="dialogFormVisible = true,button=1,form={}"
        icon="el-icon-circle-plus-outline"
      >添加用户</el-button>
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="角色名称" prop="userRoleName">
            <el-input v-model="form.userRoleName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="userType">
        <el-table-column prop="userTypeId" label="编号"></el-table-column>
        <el-table-column prop="userTypeTypeName" label="角色名称"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row), dialogFormVisible=true,button=2"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="userType[scope.$index].disable"
              @click="handleDelete(scope.$index, scope.row),button=3"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      button: 1, //1代表添加按钮，2代表编辑按钮，3代表删除按钮
      userType: [], //所有角色信息
      dialogFormVisible: false, //弹出表单状态
      id: "", //点击当行的编号
      index:"",//点击当行的下标
      form: {
        userRoleName: "" //角色名称
      },
      rules: {
        userRoleName: [
          { required: true, message: "请选择角色", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.allData();
  },
  methods: {
    //所有角色信息
    allData() {
      var that = this;
      this.$http
        .get("/api/UserType/GetUserRoles")
        .then(res => {
          console.log(res.data);
          that.userType = res.data;
        })
        .catch(() => {});
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.dialogFormVisible = false;
          if (that.button == 1) {
            that.$http
              .post(
                "/api/UserType/AddUserRole?userRoleName=" +
                  that.form.userRoleName
              )
              .then(res => {
                console.log(res.data);
                that.result(res.data);
              })
              .catch(() => {});
          } else {
            that.$http
              .post(
                "/api/UserType/ModifyUserRole?id=" +
                  that.id +
                  "&userRoleName=" +
                  that.form.userRoleName
              )
              .then(res => {
                console.log(res.data);
                that.result(res.data);
              })
              .catch(() => {});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    result(data) {
      console.log(data);
      var that = this;
      switch (data.code) {
        case 1:
          that.$message({
            message: data.message,
            type: "success"
          });
          if (that.button == 3) {
            //删除成功
            that.userType.splice(that.index, 1);
          } else {
            //添加编辑
            that.update(data); //渲染到表格
          }
          break;
        case 0:
          that.$message("没有变化");
          break;
        case -1:
          that.$message("系统异常");
          break;
        case -2:
          that.$message.error("参数错误");
          break;
        default:
          that.$message.error("其他错误");
          break;
      }
    },
    /**
     * 编辑
     * @param {Number} index 当行下标
     * @param {Object} row  当行信息
     */
    handleEdit(index, row) {
      console.log(row);
      var that = this;
      that.id = row.userTypeId;
      that.index=index//点击当行的下标
      this.dialogFormVisible = true;
      that.form.userRoleName = row.userTypeTypeName;
    },
    /**
     * 删除当行
     */
    handleDelete(index, row) {
      var that = this;
      console.log(row.userId);
        that.index=index;
      that.index = index; //删除的用户下标
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api/UserType/RemoveUserRole?userRoleId=" + row.userTypeId)
            .then(res => {
              console.log(res.data);
              that.result(res.data);
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * 更新表格数据
     * @param {Object} content 请求返回的数据
     */
    update(content) {
      var that = this;
      if (that.button == 1) {
        console.log(content);
        that.userType.push(content.data);
      }else{
        that.userType[that.index].userTypeTypeName=that.form.userRoleName

      }
    }
  }
};
</script>
<style scoped>
</style>