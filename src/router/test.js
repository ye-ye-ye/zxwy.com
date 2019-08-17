import testRouter from '@/views/test/test.vue'
import giveProblem from '@/views/test/giveProblem.vue'
import checkRouter from '@/views/test/check.vue'
import resultsRouter from '@/views/test/results.vue'
 
export default [{
		path: '/testRouter',
		name: 'testRouter',
		meta: { title: '测试维护' } ,
		components: {
			right: testRouter
		}
	},
 {
 	path: '/giveProblem',
	 name: 'giveProblem',
	 meta: { title: '老师出卷' } ,
 	components: {
 		right:giveProblem
 	}
 },
	{
		path: '/checkRouter',
		name: 'checkRouter',
		meta: { title: '查阅试卷' } ,
		components: {
			right:checkRouter
		}
	},

	{
		path: '/resultsRouter',
		name: 'resultsRouter',
		meta: { title: '查看学生成绩' } ,
		components: {
			right: resultsRouter
		}
	}

]
