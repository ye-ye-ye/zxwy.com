<template>
  <div id="gap_filling">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="题干" prop="tpqQuestion.questionTitle">
        <el-button>插入填空</el-button>
      </el-form-item>
      <el-form-item prop="tpqQuestion.questionTitle">
        <el-input type="text" v-model="ruleForm.tpqQuestion.questionTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="ruleForm.tpqQuestion.fillQuestion.fqAnswer" placeholder="请输入参考答案" style="width:70%;"></el-input>
       <el-input-number v-model="ruleForm.tpqScore" :min="1" :max="10" label="描述文字"size="mini"></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        tpqPaperId: 1, //试卷的编号
        tpqScore: 4, //题目的分值
        tpqQuestion: {
          questionTitle: "", //填空题的标题
          questionTypeId: 2, //题目类型 1=选择题 2=填空题 3=问题
          fillQuestion: [
            {
              fqOrder: 1, //填空序号
              fqAnswer: "行级标签", //第一个空的答案
              fillQuestionScore: [
                {
                  fqsScore: 2 //第一个空的分值
                }
              ]
            }
          ]
        }
      }
    };
  },
  methods: {}
};
</script>
<style scoped lang="less"> 
 
.el-input__inner{
  border:0px;
}

</style>