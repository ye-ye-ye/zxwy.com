import sudentRouter from '@/views/base/student'
import classRouter from '@/views/base/class.vue'
import teacherRouter from '@/views/base/teacher.vue'
import userType from '@/views/base/userType.vue'
import changePass from '@/views/base/changePass.vue'
 
export default [{
		path: '/sudentRouter',
		name: 'sudentRouter',
		meta: { title: '学生管理' } ,
		components: {
			right: sudentRouter
		}
	},
	{
			path: '/classRouter',
			name: 'classRouter',
			meta: { title: '班级管理' },
			components: {
				right: classRouter
			}
		},
		{
				path: '/teacherRouter',
				name: 'teacherRouter',
				meta: { title: '教师管理' },
				components: {
					right: teacherRouter
				}
			},
			
{
				path: '/changePass',
				name: 'changePass',
				meta: { title: '修改密码' } ,
				components: {
					right: changePass
				}
			},
			{
				path: '/userType',
				name: 'userType',
				meta: { title: '角色管理' },
				components: {
					right: userType
				}
			}

]
