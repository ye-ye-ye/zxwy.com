<template>
  <div id="give_problem">
    <el-card class="box-card">
      <el-steps :active="active" finish-status="success">
        <el-step title="试卷信息"></el-step>
        <el-step title="添加题目"></el-step>
        <el-step title="完成制作"></el-step>
      </el-steps>
    </el-card>
    <el-card class="two">
      <give-test @verify="next" v-if="active<1"></give-test>
      <ad-title v-else :message="testPaperId"></ad-title>
    </el-card>
    <el-card class="box-card" v-if="active!=0">
      <div slot="header" class="clearfix">
        <span>一、选择题 （本题共四道小题，共18/43)</span>
      </div>
      <div v-for="(item,index) in select " :key="index" class="text item">
        <div>{{index+1}}、{{item.tpqQuestion.questionTitle}}
          <el-input-number v-model="item.tpqScore" :min="1" size="mini"></el-input-number>
        </div>
        <div v-for="(value,index) in  item.tpqQuestion.chooseQuestion" :key="index+''+index">
          <div>
            <el-checkbox v-model="value.cqIsRight" disabled>{{String.fromCharCode(64 + parseInt(index+1))}} 、</el-checkbox>
            {{value.cqOption}}
          </div>
          
        </div>
          <el-button size="mini" round>编辑 </el-button>
         
      </div>
    </el-card>
  </div>
</template>

<script>
import giveTest from "@/components/inputGiveTest.vue";
import adTitle from "@/components/inputAddTitle.vue";
export default {
  components: {
    giveTest,
    adTitle
  },
  data() {
    return {
      active: 0,
      testPaperId: "", //试卷编号
      select: []
    };
  },
  created() {
    this.active = Number(sessionStorage.getItem("active"));
    this.getTestPaper();
  },
  methods: {
    next(data) {
      sessionStorage.setItem("tpqPaperId", data); //试卷主键保存本地
      console.log(data);
      this.testPaperId = data;
      this.active++;
      sessionStorage.setItem("active", this.active);
    },
    //获取选择题信息
    getTestPaper() {
      var that = this;
      this.$http
        .get(
          "/api/TestPaper/GetTestPaper?id=" +
            sessionStorage.getItem("tpqPaperId")
        )
        .then(res => {
          console.log(res.data);
          this.select = res.data;
        })
        .catch(() => {});
    }
  }
};
</script>

<style  scoped   lang="less">
@w-100: 90%;
.two {
  width: @w-100;
}
</style>>
 
