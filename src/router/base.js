import sudentRouter from '@/views/base/student'
import classRouter from '@/views/base/class.vue'
import teacherRouter from '@/views/base/teacher.vue'
import changePass from '@/views/base/changePass'

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
				path: '/changePass',
				name: 'changePass',
				components: {
					right: changePass
				}
			}

]
