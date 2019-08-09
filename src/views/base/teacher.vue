 <template>
  <div id="student">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="dialogFormVisible = true,button=1,form={}"
        icon="el-icon-circle-plus-outline"
      >添加用户</el-button>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth" prop="userMobile">
            <el-input v-model="form.userMobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="userSex">
            <el-select v-model="form.userSex" placeholder="选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="userPassword">
            <el-input v-model="form.userPassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userId" label="编号" width="100"></el-table-column>
        <el-table-column prop="userName" label="老师名称" width="100"></el-table-column>
        <el-table-column prop="userSex" label="性别" width="50"></el-table-column>
        <el-table-column prop="userMobile" label="手机号码" width="150"></el-table-column>
        <el-table-column prop="userPassword" label="密码"></el-table-column>
        <el-table-column prop="userTypeTypeName" label="职务"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row), dialogFormVisible=true,button=2"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="tableData[scope.$index].disableDelete"
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
  name: "student",
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号码输入错误"));
      } else {
        callback();
      }
    };
    return {
      button: 1,
      dialogFormVisible: false,
      tableData: [], //表格，
      formLabelWidth: "100px", //嵌套表单表单宽度
      userUid: "", //要修改的用户标识符
      userUserTypeId: "", //要修改的角色编号
      index: "", //需要修改或删除的下标
      form: {
        userName: "", //用户名，不能为空
        userMobile: "", //手机号，长度11位
        userSex: "", //性别，男|女
        userPassword: "" //密码，长度6~18
      },

      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userMobile: [
          { required: true, message: "输入手机号码", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" }
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "密码长度6~18", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.database(); //后台获取表格数据
  },
  methods: {
    //后台获取表格数据
    database() {
      this.$http
        .get("/api/User/GetTeachers")
        .then(res => {
          console.log(res.data);

          this.tableData = res.data;
        })
        .catch(() => {});
    },
    /**提交表单数据
     * @param {String} formName 为表单名称
     */
    submitForm(formName) {
      let that = this;
      // console.log(data)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (that.button == 1) {
            console.log(that.form)
            that.$http
              .post("/api/User/AddTeacher",that.form)
              .then(res => {
                console.log(res.data);
                that.result(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (that.button == 2) {
            that.$http
              .post("/api/User/ModifyTeacher", {
                userUid: that.userUid, //要修改的用户标识符
                userName: that.form.userName, //修改名称
                userMobile: that.form.userMobile, //要修改的手机号，11位手机号
                userSex: that.form.userSex, //要修改的性别，男|女
                userUserTypeId: that.userUserTypeId, //角色
                userPassword: that.form.userPassword //密码
              })
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
    /**编辑
     * @param {Number}index 为当行下标
     * @param  {Object}row 当行信息
     */
    handleEdit(index, row) {
      let that = this;
      console.log(index, row);
      that.form.userName = row.userName;
      that.form.userMobile = row.userMobile;
      that.form.userSex = row.userSex;
      that.form.userPassword = row.userPassword;
      that.userUid = row.userUid; //要修改的用户标识符
      that.userUserTypeId = row.userUserTypeId; //要修改的角色编号
      that.index = index; //要修改的下标
    },
    /**
     * 添加，编辑,删除 返回结果
     * @param {Object} data 请求返回的数据
     */
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
            that.tableData.splice(that.index, 1);
          } else {
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
     * 更新数据（编辑、添加)
     * @param {Object} data 新增班级的信息
     */
    update(data) {
      let that = this;
      if (that.button == 1) {
      } else if (that.button == 2) {
        //编辑后局部渲染

        that.tableData[that.index].userMobile = that.form.userMobile;
        that.tableData[that.index].userSex = that.form.userSex;
        that.tableData[that.index].userPassword = that.form.userPassword;
        that.tableData[that.index].userName = that.form.userName;
      }
      that.dialogFormVisible = false; //关闭提交表单
    },
    /**
     *  删除当行数据
     * @param index 为当行下标， row 为当行信息
     */
    handleDelete(index, row) {
      var that = this;
      that.index = index;
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api/User/RemoveTeacher", row.userUid)
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
    }
  }
};
</script>

<style>
</style>
