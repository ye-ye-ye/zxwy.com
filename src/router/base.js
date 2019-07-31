import sudentRouter from '@/views/base/student'
import classRouter from '@/views/base/class.vue'
import teacherRouter from '@/views/base/teacher.vue'
import teacherInfoRouter from '@/views/base/teacherInfo'

export default [{
		path: '/sudentRouter',
		name: 'sudentRouter',
		components: {
			right: sudentRouter
		}
	},
	{
			path: '/classRouter',
			name: 'classRouter',
			components: {
				right: classRouter
			}
		},
		{
				path: '/teacherRouter',
				name: 'teacherRouter',
				components: {
					right: teacherRouter
				}
			},
			
{
				path: '/teacherInfoRouter',
				name: 'teacherInfoRouter',
				components: {
					right: teacherInfoRouter
				}
			}

]
