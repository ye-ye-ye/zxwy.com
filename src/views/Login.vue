<template>
  <div id="content">
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
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Base64 from "@/utli/Base64.js";
import Cookie from "@/utli/Cookie.js";
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("手机号码错误"));
      } else {
        if (this.ruleForm.psd !== "") {
          this.$refs.ruleForm.validateField("psd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!/^\w{6,}$/.test(value)) {
        callback(new Error("密码长度大于5"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",//用户账号
        psd: ""//用户密码
      },
      rules: {//验证信息
        name: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        psd: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      checked: false,//是否记住密码
      loading: false//点击加载图标
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    /** 
     * 点击提交
    */
    submitForm(formName) {
      var that = this;
      that.loading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$http
            .get(
              "/api/OAuth/authenticate?userMobile=" +
                this.ruleForm.name +
                "&userPassword=" +
                that.ruleForm.psd
            )
            .then(res => {
              console.log(res.data.access_token)
              // sessionStorage.getItem(token, res.data.access_token)
              this.$store.commit('SET_TOKEN', res.data.access_token);
             //判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.checked == true) {
             //保存到cookie
            let name = Base64.encode(this.ruleForm.name);
            let psd = Base64.encode(this.ruleForm.psd);
            Cookie.setCookie("name",name,{maxAge:60*60*24*30})
            Cookie.setCookie("psd",psd,{maxAge:60*60*24*30})
          } else {
            console.log("清空Cookie");
            //清空Cookie
            that.clearCookie();
          }
              that.loading = false;
              that.$router.replace("/Home");
              that.$message({
                message: "登录成功",
                type: "success"
              });
            })
            .catch(() => {
              that.loading = false;
             
              that.$message.error("用户名或密码错误，请重新输入");
            });
        } else {
           that.loading = false;
          return false;
        }
      });
    },
  
    //读取cookie
    getCookie: function() {
          this.ruleForm.name=Base64.decode(Cookie.getCookie('name')) 
          this.ruleForm.psd=Base64.decode(Cookie.getCookie('psd'))
         this.checked = true;
    },
    //清除cookes
    clearCookie: function() {
      this.setCookie("", "", -1);
    }
  }
};
</script>

<style  lang="less" scoped="scoped">
#content {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("../assets/timg 1.jpg");
  background-size: 100% 100%;
  display: flex;
}

form {
  background-color: black;
  padding: 15px;
  opacity: 0.5;
  border-radius: 10px;

  margin: auto;
}

input {
  margin-bottom: 20px;
}

button {
  width: 100%;
}

h3 {
  text-align: center;
  color: aqua;
}
</style>
