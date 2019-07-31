import testRouter from '@/views/test/test.vue'
import assignTaskRouter from '@/views/test/assignTask.vue'
import checkRouter from '@/views/test/check.vue'
import resultsRouter from '@/views/test/results.vue'

export default [{
		path: '/testRouter',
		name: 'testRouter',
		components: {
			right: testRouter
		}
	},
 {
 	path: '/assignTaskRouter',
 	name: 'assignTaskRouter',
 	components: {
 		right:assignTaskRouter
 	}
 },
	{
		path: '/checkRouter',
		name: 'checkRouter',
		components: {
			right:checkRouter
		}
	},

	{
		path: '/resultsRouter',
		name: 'resultsRouter',
		components: {
			right: resultsRouter
		}
	}

]
