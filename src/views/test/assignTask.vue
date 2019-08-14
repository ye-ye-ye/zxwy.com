<template>
  <div id="assign_task">
		<el-card class="box-card">
    <el-steps :active="active" finish-status="success">
      <el-step title="试卷信息"></el-step>
      <el-step title="添加题目"></el-step>
      <el-step title="完成制作"></el-step>
    </el-steps>
    
		</el-card>
			<el-card class="two">
        <give-test></give-test>
        <el-button style="margin-top: 12px;" @click="next"type="primary">下一步</el-button>
			</el-card> 
  </div>
</template>

<script>
import giveTest  from "@/components/inputGiveTest.vue";
export default {
components:{
giveTest
},
  data() {
    return {
      active: 0
    };
  },

  methods: {
    next() {
     
        console.log(this.active)
       
       
    }
  }
};
</script>

<style  scoped   lang="less">
 @w-100:90%;
.two{
  width:@w-100;
}
</style>>
 
