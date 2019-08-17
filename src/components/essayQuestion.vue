<template>
  <div id="essay_quesion">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      
    >
      <el-form-item label="题干" prop="tpqQuestion.questionTitle">
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="ruleForm.tpqQuestion.questionTitle"
        ></el-input>
      </el-form-item>
       <el-form-item label="参考答案" prop="tpqQuestion.questionTitles">
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="ruleForm.tpqQuestion. answerQuestion.aqAnswer"
        ></el-input>
      </el-form-item>
      <div>
        <el-input-number v-model="ruleForm.tpqScore" :min="1"></el-input-number>
      </div>
       <el-button size="small" round>重置</el-button>
        <el-button type="primary" @click="submitForm" round size="mini">
          <i class="el-icon-document"></i>保存题目
        </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        tpqPaperId: "", //试卷主键编号
        tpqScore: 5, //分值
        tpqQuestion: {
          questionTitle: "", //题目的标题
          questionTypeId: 3, //题目的类型 1=选择题 2=填空题 3=问答题
          answerQuestion: {
            aqAnswer: "" //问答题的答案
          }
        }
      }
    };
  },
  created(){
      this.ruleForm.tpqPaperId=sessionStorage.getItem("tpqPaperId")
  },
  methods:{
submitForm(){
  var that=this
      if(this.ruleForm.tpqQuestion.questionTitle==''){
           this.$message.error("题干不能为空");
            return
      }
   if(this.ruleForm.tpqQuestion.answerQuestion.aqAnswer==''){
           this.$message.error("参考答案不能为空");
            return
      }
      console.log(that.ruleForm)
    this.$http.post("/api/TestPaper/AddQuestionToTestPaper",this.ruleForm).then(res=>{
      console.log(res.data)
      
    }).catch(()=>{

    })

  }
  





  }
};
</script>
<style scoped>
</style>