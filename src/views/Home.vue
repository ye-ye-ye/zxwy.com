<template>
	<div class="home">




		<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">
	 
		<router-link to="/sudentRouter">学生管理</router-link>|
		<router-link to="/classRouter">班级管理</router-link>|
		<router-link to="/teacherRouter">教师管理</router-link>|
		<router-link to="/teacherInfoRouter">管理员信息</router-link>|
		<router-link to="/testRouter">测试维护</router-link>|
		<router-link to="/assignTaskRouter">布置任务</router-link>|
		<router-link to="/checkRouter">查阅试卷</router-link>|
		<router-link to="/resultsRouter">查看学成绩</router-link>

		</el-aside>
    <el-main>
			
				 <div>
				 <router-view name="right"></router-view>
		</div>
		</el-main>
  </el-container>
</el-container>
	
	
	</div>
	
</template>

<script>
	export default {
		name: 'home',

	}
</script>

<style scoped="scoped">
	.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

	.home{width: 100%;height: 100%;background-color: black;
	position: relative;}
</style>
