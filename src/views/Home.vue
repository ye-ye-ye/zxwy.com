<template>
	<div class="home">
		<router-link to="/sudentRouter">学生管理</router-link>|
		<router-link to="/classRouter">班级管理</router-link>|
		<router-link to="/teacherRouter">教师管理</router-link>|
		<router-link to="/teacherInfoRouter">管理员信息</router-link>|
		<router-link to="/testRouter">测试维护</router-link>|
		<router-link to="/assignTaskRouter">布置任务</router-link>|
		<router-link to="/checkRouter">查阅试卷</router-link>|
		<router-link to="/resultsRouter">查看学成绩</router-link>
		 <div>
				 <router-view name="right"></router-view>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'home',

	}
</script>
