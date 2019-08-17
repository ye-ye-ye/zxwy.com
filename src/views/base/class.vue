<template>
  <div id="class">
    
    <el-card class="box-card">
      <!-- Form -->
      <el-button
        type="primary"
        @click="dialogFormVisible = true,button=1,form={}"
        icon="el-icon-circle-plus-outline"
      >添加班级</el-button>
      <el-dialog title="增加班级" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="班级" :label-width="formLabelWidth" prop="className">
            <el-input v-model="form.className" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="教师" :label-width="formLabelWidth" prop="classTeacherId">
            <el-select v-model="form.classTeacherId" placeholder="请选择教师">
              <el-option
                v-for="item in teachers"
                :label="item.userName"
                :value="item.userId"
                :key="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth" prop="classCourseId">
            <el-select v-model="form.classCourseId" placeholder="请选择专业">
              <el-option
                v-for="item in allCourse"
                :label="item.courseName"
                :value="item.courseId"
                :key="item.courseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column prop="className" label="班级名称" width="150"></el-table-column>
        <el-table-column prop="userName" label="老师名称" width="150"></el-table-column>
        <el-table-column prop="courseName" label="专业名称"></el-table-column>
        <el-table-column prop="classStudents" label="班级人数"></el-table-column>
        <el-table-column prop="classCreateTime" label="创班日期" :formatter="dateForma"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row),button=2">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="tableData[scope.$index].classStudents>0"
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
      dialogFormVisible: false, //嵌套表单 false 为关闭状态
      button: 1, //1表示添加 2表示编辑 3表示删除
      tableData: [], //表格数据
      teachers: [], //所有教师
      allCourse: [], //所有课程
      classId: "", //班级编号
      index: "", //编辑时当行下标
      classCreateTime: "", //编辑时当行创班时间
      classStudents: "", //编辑时当行班级人数
      form: {
        className: "", //班级名称
        classTeacherId: "", //教师编号
        classCourseId: "" //课程编号
      },
      rules: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        classTeacherId: [
          { required: true, message: "请选择教师", trigger: "blur" }
        ],
        classCourseId: [
          { required: true, message: "请选择专业", trigger: "blur" }
        ]
      },

      formLabelWidth: "100px" //嵌套表单表单宽度
    };
  },

  created() {
    this.getAllClass(); //所有班级
    this.getTeachers(); //所有 教师
    this.getAllCourse(); //全部课程
  },

  methods: {
    //日期格式
    dateForma: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.moment(date).format("YYYY年MM月DD日 HH:mm:ss");
    },

    /**
     * 获得所以班级信息
     *
     */
    getAllClass() {
      let that = this;
      this.$http
        .get("/api/Class/GetAllClass")
        .then(res => {
          // console.log(res.data);
          res.data.forEach(element => {
            that.tableData.push({
              classId: element.classId, //班级主键编号
              className: element.className, //班级名
              userName: element.userName, //教师名
              courseName: element.courseName, //课程
              classStudents: element.classStudents, //学生人数
              classCreateTime: element.classCreateTime //创班日期
            });
          });
        })
        .catch(() => {});
    },
    /**
     * 获得所有教师
     */
    getTeachers() {
      let that = this;
      that.$http
        .get("/api/User/GetTeachers")
        .then(res => {
          // console.log(res.data)
          that.teachers = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     *获得所有课程
     */
    getAllCourse() {
      let that = this;
      that.$http
        .get("/api/Class/GetAllCourse")
        .then(res => {
          // console.log(res.data)
          that.allCourse = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 表单提交
     * @param {String} formName 表单名称
     */
    submitForm(formName) {
      let that = this;
      // console.log(data)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (that.button == 2) {
            //编辑信息
            that.$http
              .post("/api/Class/ModifyClass", {
                classId: that.classId, //要修改的班级主键
                className: that.form.className, //要修改的班级名称
                classCourseId: that.form.classCourseId, //课程编号
                classTeacherId: that.form.classTeacherId //老师编号
              })
              .then(res => {
                that.result(res.data);
                console.log(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          } else if (that.button == 1) {
            //添加班级
            that.$http
              .post("/api/Class/AddClass", {
                className: that.form.className, //班级名称
                classCourseId: that.form.classCourseId, //课程编号
                classTeacherId: that.form.classTeacherId //老师编号
              })
              .then(res => {
                that.result(res.data);
                console.log(res.data);
              })
              .catch(err => {
                console.log(err);
              });
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
      var that = this;
      this.dialogFormVisible = true; //表单弹出
      this.form.className = row.className; //班级名
      this.teachers.forEach(item => {
        if (item.userName == row.userName) {
          that.form.classTeacherId = item.userId; //获得教师编号
        }
      });
      this.allCourse.forEach(item => {
        if (item.courseName == row.courseName) {
          that.form.classCourseId = item.courseId; //获得课程编号
        }
      });
      that.classId = that.tableData[index].classId; //获得班级编号
      that.classCreateTime = that.tableData[index].classCreateTime; //当行创班时间
      that.classStudents = that.tableData[index].classStudents; //当行创班时间
      that.index = index; //当行下标
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
            that.dialogFormVisible = false; //关闭提交表单
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
      var userName = ""; //老师名称
      var courseName = ""; //课程名称
      let that = this;
      if (that.button == 1) {
        that.teachers.forEach(item => {
          //获得编号对应的教师
          if (item.userId == data.data.classTeacherId) {
            userName = item.userName;
          }
        });
        that.allCourse.forEach(item => {
          //获得编号对应的课程
          if (item.courseId == data.data.classCourseId) {
            courseName = item.courseName;
          }
        });

        this.tableData.unshift({
          //添加到表格第一行
          classId: data.data.classId,
          className: data.data.className,
          userName,
          courseName,
          classStudents: data.data.classStudents,
          classCreateTime: data.data.classCreateTime
        });
      } else {
        that.teachers.forEach(item => {
          //获得编号对应的教师
          if (item.userId == that.form.classTeacherId) {
            userName = item.userName;
          }
        });
        that.allCourse.forEach(item => {
          //获得编号对应的教师
          if (item.courseId == that.form.classCourseId) {
            courseName = item.courseName;
          }
        });
        that.tableData.splice(that.index, 1, {
          //替换编辑项内容
          classId: that.classId,
          className: that.form.className,
          userName: userName,
          courseName: courseName,
          classStudents: that.classStudents,
          classCreateTime: that.classCreateTime
        });
      }
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
            .get("/api/Class/RemoveClass?classId=" + row.classId)
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

 
<style scope lang="less">
.box-card {
  margin-top: 20px;
  width: 90%;
}
.el-dialog__header {
  margin-left: 45%;
}
</style>
 
