<template>
  <div id="student">
    
    <el-card class="box-card">
      <el-select placeholder="选择班级" v-model="selected" @change="selectedClass">
        <el-option
          :label="item.className"
          :value="item.className"
          v-for="(item,index) in allClass"
          :key="index"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        @click="dialogFormVisible = true,button=1,form={}"
        icon="el-icon-circle-plus-outline"
      ></el-button>
      <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="stuName">
            <el-input v-model="form.stuName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth" prop="stuClassId">
            <el-select placeholder="选择班级" v-model="form.stuClassId">
              <el-option
                :label="item.className"
                :value="item.classId"
                v-for="(item,index) in allClass"
                :key="item.stuClassId"
                :index="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="stuSex">
            <el-select v-model="form.stuSex" placeholder="选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth" prop="stuBirthDay">
            <el-input v-model="form.stuBirthDay" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth" prop="stuMobile">
            <el-input v-model="form.stuMobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="stuPassword">
            <el-input v-model="form.stuPassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="classData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width:100%"
      >
        <el-table-column prop="className" label="班级" width="100"></el-table-column>
        <el-table-column prop="stuName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="stuAge" label="年龄" width="50"></el-table-column>
        <el-table-column prop="stuSex" label="性别" width="100"></el-table-column>
        <el-table-column prop="stuMobile" label="手机号码" width="150"></el-table-column>
        <el-table-column prop="stuPassword" label="密码" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row), dialogFormVisible=true,button=2"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row),button=3"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="classData.length"
      ></el-pagination>
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
      selected: "",
      button: 1, //添加
      dialogFormVisible: false, //表单是否打开，默认关闭
      currentPage: 1, //初始页
      pagesize: 4, //    每页的数据
      classData: [], //所有表格数据
      dataClass: [], //所有学生数据不直接渲染到表上
      allClass: [], //所有班级信息
      index: "", //所选下标
      formLabelWidth: "100px",
      stuUid: "", //学生标识符
      value:"",//选择的班级名
      className:"",//当前班级名称
      form: {
        stuName: "", //学生姓名
        stuClassId: "", // 班级编号
        stuBirthDay: "", //生日
        stuMobile: "", //手机号
        stuPassword: "", //登录密码，
        stuSex: "" //性别
      },
      rules: {
        stuName: [{ required: true, message: "请输入学生名", trigger: "blur" }],
        stuClassId: [
          { required: true, message: "请选择班级", trigger: "blur" }
        ],
        stuBirthDay: [
          { required: true, message: "请输入生日时间", trigger: "blur" }
        ],
        stuMobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" }
        ],
        stuPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度不小于6", trigger: "blur" }
        ],
        stuSex: [{ required: true, message: "请选择班级", trigger: "blur" }]
      }
    };
  },
  created() {
    this.tablaClass(); //表格数据
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    //表格基本数据
    tablaClass() {
      var that = this;
      this.$http
        .get("/api/Class/GetAllClass")
        .then(res => {
          var arr = [];
          console.log(res.data);
          that.allClass = res.data; //所有 班级
          res.data.forEach(el => {
            that.$http
              .get("/api/Student/GetClassStudent?classId=" + el.classId)
              .then(res => {
                console.log(res);
                arr.push(...res.data);
              })
              .catch(() => {});
          });
          that.classData = arr;
          that.dataClass = arr;
          
        })
        .catch(() => {});
    },
    //选择班级
    selectedClass(value) {
      var that = this;
      var arr = [];
      console.log(value);
      console.log(this.dataClass);
      this.dataClass.forEach(el => {
        if (el.className == value) {
          arr.push(el);
        }
      });
      that.classData = arr;
    },
    /**
     * 提交表单
     * @param {Strong} formName 表单名称
     *  */
    submitForm(formName) {
      let that = this;
      // console.log(data)
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(that.form);
          if (that.button == 1) {
            that.$http
              .post("/api/Student/AddStudent", that.form)
              .then(res => {
                console.log(res.data);
                that.result(res.data);
              })
              .catch(() => {});
          } else {
            that.$http
              .post("/api/Student/ModifyStudent", {
                stuUid: that.stuUid, // 要修改学生的唯一标识符
                stuName: that.form.stuName, //要修改的名称
                stuBirthDay: that.form.stuBirthDay, //要修改的生日
                stuClassId: that.form.stuClassId, //班级编号
                stuMobile: that.form.stuMobile, //要修改的手机号
                stuPassword: that.form.stuPassword, //要修改的密码
                stuSex: that.form.stuSex //要修改的性别
              })
              .then(res => {
                console.log(res.data);
                that.result(res.data);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     *
     * 请求数据返回的结果
     * @param {Object} content 请求返回的对象
     *  */
    result(content) {
      var that = this;
      switch (content.code) {
        case 1:
          that.$message({
            message: content.message,
            type: "success"
          });
          that.dialogFormVisible = false;
          if (that.button == 3) {
            //删除
            //删除成功
          that.classData.splice(that.index,1)
          that.dataClass=that.dataClass.filter(item=>item.stuUid!=that.stuUid)        
          } else {
            that.update(content); //渲染到表格
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
     * 更新数据
     * @param {Object} data请求返回的数据
     */
    update(data) {
      console.log(data);
      var that = this;
      if (that.button == 1) {
        console.log(data);
        that.classData.push(data.data);
        that.dataClass.push(data.data);
        
      } else if (that.button == 2) {
        console.log(that.form);
        var className = "";
        that.allClass.forEach(el => {
          if (el.classId == that.form.stuClassId) {
            className = el.className;
          }
        });
         that.classData[that.index].classId=that.form.stuClassId 
        that.classData[that.index].stuMobile = that.form.stuMobile;
        that.classData[that.index].className = className;
        that.classData[that.index].stuName = that.form.stuName;
        that.classData[that.index].stuPassword = that.form.stuPassword;
        that.classData[that.index].stuSex = that.form.stuSex;
        that.classData[that.index].stuAge = data.data;
        that.dataClass.forEach(el=>{
          if(el.stuUid==that.stuUid){
            el=that.classData[that.index]
          }
        })
          that.selectedClass(that.className)

      }
    },

    /**
     * 删除v数据
     * @ {Number} idnex 为下标
     * @param {Object} row 点击当行的下标
     */
    handleDelete(index, row) {
      var that = this;
      console.log(row);
      that.value=row.className
      that.stuUid=row.stuUid
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("/api/Student/RemoveStudent?uid=" + row.stuUid)
            .then(res => {
              console.log(res.data);
              that.index = index;
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
     * 编辑
     */
    handleEdit(index, row) {
      console.log(row);
      var that = this;
      that.index = index;
      that.stuUid = row.stuUid;
      that.className=row.className;
      that.dialogFormVisible = true; //打开
      (that.form.stuName = row.stuName), //学生姓名
        (that.form.stuClassId = row.classId), // 班级编号
        (that.form.stuBirthDay = row.stuBirthDay), //生日
        (that.form.stuMobile = row.stuMobile), //手机号
        (that.form.stuPassword = row.stuPassword), //登录密码，
        (that.form.stuSex = row.stuSex); //性别
    }
  }
};
</script>

<style scope>
</style>
