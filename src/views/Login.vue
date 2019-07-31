<template>
	<div class="content">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
			<h3>后台管理系统</h3>
			<el-form-item prop="name">
				<el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="用户名/邮箱"></el-input>
			</el-form-item>
			<el-form-item prop="psd">
				<el-input type="password" v-model="ruleForm.psd" autocomplete="off" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="checked">记住密码</el-checkbox>
				<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		name: 'Login',
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'));
				} else {
					if (this.ruleForm.psd !== '') {
						this.$refs.ruleForm.validateField('psd');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					name: '',
					psd: ''
				},
				rules: {
					name: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					psd: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				checked: false
			};

		},
		mounted() {
			 this.getCookie()
		},
		methods: {
			submitForm(formName) {
				var that=this
				this.$refs[formName].validate((valid) => {
					if (valid) {
						//判断复选框是否被勾选 勾选则调用配置cookie方法
						if (this.checked == true) {
							console.log("checked == true");
							//传入账号名，密码，和保存天数3个参数
							this.setCookie(this.ruleForm.name, this.ruleForm.psd, 7);
						} else {
							console.log("清空Cookie");
							//清空Cookie
							that.clearCookie();
						}
					} else {

						return false;
					}
				})
			},
			setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "name" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "psd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'name') {
                            this.ruleForm.name = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'psd') {
                            this.ruleForm.psd = arr2[1];
                        }
                    }
									this.checked=true	
                }
            },
			
			
			
			
		}

	}
</script>

<style scoped="scoped">
	@import url("//unpkg.com/element-ui@2.10.0/lib/theme-chalk/index.css");

	.content {
		position: fixed;
		height: 100%;
		width: 100%;
		background-image: url("../assets/timg 1.jpg");
		background-size: 100% 100%;
		display: flex;
	}

	form {
		background-color: white;
		padding: 0px;
		margin: auto;
		padding: 15px;
		opacity: .8;
		border-radius: 10px;
		width: 30%;
		height: 43%;
		margin: auto;
	}

	input {
		margin-bottom: 20px;
	}

	button {
		width: 100%;

	}

	#top {
		height: 50px;
		line-height: 50px;
		background-color: #3BAFDA;

	}

	h3 {
		text-align: center;
	}
</style>
