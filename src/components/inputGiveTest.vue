 <template>
  <div class="giveTest">
    <el-form ref="ruleForm" :model="ruleForm" label-width="80px" style="width:70%;" :rules="rules">
      <el-form-item label="试卷名称" prop="testName">
        <el-input v-model="ruleForm.testName"></el-input>
      </el-form-item>
      <el-form-item label="课程名称"  prop="courseId">
        <el-select v-model="ruleForm.courseId" placeholder="请选择课程" style="width:100%;">
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
     var checkAge = (rule, value, callback) => {
        if (!value) {
          return  this.$message.error("请输入考试名称");
        }else{
               callback();
        }
        
      };
    if(checkAge!=''){
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
           return this.$message.error("你还没有选择课程")
        } else {
          callback();
        }
      };
    }
    return {
      active: 0,
      allCourse: [], //所有课程
      ruleForm: {
        testName: "",
        courseId: ""
      },
      rules: {
        testName: [
         
            { validator: checkAge, trigger: 'blur' }
        ],
        courseId: [ { validator:validatePass2, trigger: 'blur' }]
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
 