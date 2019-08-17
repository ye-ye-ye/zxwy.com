 <template>
  <div class="giveTest">
    <el-form ref="ruleForm" :model="ruleForm" label-width="80px" style="width:70%;" :rules="rules">
      <el-form-item label="试卷名称" prop="tpTitle">
        <el-input v-model="ruleForm.tpTitle"></el-input>
      </el-form-item>
      <el-form-item label="课程名称" prop="tpCourseId">
        <el-select v-model="ruleForm.tpCourseId" placeholder="请选择课程" style="width:100%;">
          <el-option
            :label="item.courseName"
            :value="item.courseId"
            v-for="(item,index) in allCourse"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button style="margin-top: 12px;" @click="submitForm('ruleForm')" type="primary">下一步</el-button>
    </el-form>
  </div>
</template>
 <script>
export default {
  data() {
    var tpTitle = (rule, value, callback) => {
      if (!value) {
        return this.$message.error("请输入考试名称");
      } else {
        callback();
      }
    };
    var tpCourseId = (rule, value, callback) => {
      if (this.ruleForm.tpTitle != "") {
        if (!value) {
          return this.$message.error("请输入考试课程");
        } else {
          callback();
        }
      }
    };

    return {
      active: 0,
      allCourse: [], //所有课程
      ruleForm: {
        tpTitle: "",
        tptpCourseId: ""
      },
      rules: {
        tpTitle: [{ validator: tpTitle, trigger: "blur" }],
        tpCourseId: [{ validator: tpCourseId, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCourse(); //获得全部课程
  },
  methods: {
    //获得全部的课程渲染到表单
    getCourse() {
      var that = this;
      this.$http
        .get("/api/Class/GetAllCourse")
        .then(res => {
          console.log(res.data);
          that.allCourse = res.data;
        })
        .catch(() => {});
    },
    submitForm(formName) {
      let that = this;

      // console.log(data)
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$http.post(
            "/api/TestPaper/MakeTestPaper?uid=" +
              sessionStorage.getItem("userUid"),
              that.ruleForm
          ).then(res=>{
              console.log(res.data)
              if(res.data.code==1){
            that.$emit("verify", res.data.data.testPaperId);
                that.$message({
                  message:"添加成功",
                  type:"success"
                })
              }
          }).catch(()=>{
            
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
 <style scoped>
.el-form {
  margin: 0px auto;
}
</style>
 