<template>
  <div id="add_title">
    <div class="top">
      <span>题目类型</span>
      <el-radio v-model="radio" label="1">选择题</el-radio>
      <el-radio v-model="radio" label="2">填空题</el-radio>
      <el-radio v-model="radio" label="3">问答题</el-radio>
    </div>
    <div class="content">
      <!-- //添加选择题 -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="radio<2">
        <el-form-item label="题干" prop="tpqQuestion.questionTitle">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="ruleForm.tpqQuestion.questionTitle"
          ></el-input>
        </el-form-item>
        <el-form-item
          label
          v-for="(item,index) in ruleForm.tpqQuestion.chooseQuestion"
          :key="index"
        >
          <el-checkbox v-model="item.cqIsRight">{{String.fromCharCode(64 + parseInt(index+1))}} 、</el-checkbox>
          <el-input v-model="item.cqOption" style="width:80%;"></el-input>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deletffe(index)"
            v-if="ruleForm.tpqQuestion.chooseQuestion.length>2"
          ></el-button>
        </el-form-item>
        <div>
          <el-input-number v-model="ruleForm.tpqScore" :min="1"></el-input-number>
        </div>
        <el-button round @click="resetForm('ruleForm')" size="mini">重置</el-button>
        <el-button type="info" round size="mini" @click="add">新增选项</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" round size="mini">
          <i class="el-icon-document"></i>保存题目
        </el-button>
      </el-form>
      
      <tgap-filling  v-else-if="radio==2" ></tgap-filling>
      <!-- 问答题 -->
      <essay-question  v-else></essay-question>
    </div>

  </div>
</template>
<script>
import essayQuestion from '@/components/essayQuestion.vue' 
import tgapFilling  from  '@/components/inpuTgapFilling.vue'
export default {
  props:['message'],//父组件传过来的试卷主键
  components:{
     essayQuestion,
     tgapFilling
  },
  data() {
    return {
      radio: "1",
      ruleForm: {
        tpqPaperId:"", //试卷主键编号
        tpqScore: 2, //分数
        tpqQuestion: {
          questionTitle: "", //题目的标题
          questionTypeId: 1, //题目的类型 1=选择题 2=填空题 3=问答题
          chooseQuestion: [
            {
              cqOption: "", //选项内容
              cqIsRight: false //是否为正确答案 true:正确答案 false：不是
            },
            {
              cqOption: "",
              cqIsRight: false
            },
            {
              cqOption: "",
              cqIsRight: false
            },
            {
              cqOption: "",
              cqIsRight: false
            }
          ]
        }
      }
    };
  },
  created(){
    if(sessionStorage.getItem("radio")){
this.radio=sessionStorage.getItem("radio")
    }
       
  // sessionStorage.setItem("tpqPaperId",this.message)//试卷主键保存本地
  this.ruleForm.tpqPaperId=sessionStorage.getItem("tpqPaperId")
  },
  watch:{
    radio:function(newVal){
        // this.ruleForm.tpqQuestion.questionTypeId=newVal
        // alert(this.ruleForm.tpqQuestion.questionTypeId)
        sessionStorage.setItem("radio",newVal)
    }
  },
  methods: {
    deletffe(i) {
      this.ruleForm.tpqQuestion.chooseQuestion.splice(i, 1);
    },
    submitForm(formName) {
      var that = this;
          var num = 0;//选项内容不为空的此数
          //验证提交表单
          var num2=0;
          if(that.ruleForm.tpqQuestion.questionTitle==''){
            that.$message.error("题干不能为空");
            return
            
          }
          that.ruleForm.tpqQuestion.chooseQuestion.forEach(el => {
            if (el.cqOption != "") {
              num++;
            }
            if(el.cqIsRight==false){
              num2++
            }
          });
          if (num < that.ruleForm.tpqQuestion.chooseQuestion.length) {
            that.$message.error("选项内容不能为空");
            return false;
          }
             if(num2==that.ruleForm.tpqQuestion.chooseQuestion.length){
            that.$message.error("至少选择一项为正确答案");
            return false
          }
          
          that.$http.post("/api/TestPaper/AddQuestionToTestPaper",that.ruleForm).then(
            res=>{
              console.log(res.data)
            }
          )
          console.log(this.ruleForm);
      
       
    },

    //重置
    resetForm() {
      // this.ruleForm =''
      this.ruleForm.tpqQuestion.questionTitle=""
      var arr=this.ruleForm.tpqQuestion.chooseQuestion.filter(el=>{
          el.cqOption="",
          el.cqIsRight=false

      })
            
           this.ruleForm.tpqQuestion.chooseQuestio=arr    




    
      console.log(this.message)
    },
    add() {

      console.log(this.radio);
      if (this.ruleForm.tpqQuestion.chooseQuestion.length < 7) {
        this.ruleForm.tpqQuestion.chooseQuestion.push({
          cqOption: "",//选择内容
          cqIsRight: false//按钮
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
.top {
  > span {
    margin-right: 10%;
  }
}
</style>