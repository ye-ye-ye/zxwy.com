<template>
  <div id="tIfo">
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPsd">
          <el-input type="password" v-model="ruleForm.oldPsd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "changePass",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPsd: "", //旧密码
        pass: "", //新密码
        checkPass: "" //确认新密码
      },
      rules: {
        oldPsd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交
    submitForm(formName) {
      let that = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          let uid = sessionStorage.getItem("userUid");
          // console.log(sessionStorage.getItem("userUid"));
          // console.log(that.ruleForm.pass, that.ruleForm.oldPsd);

          that.$http
            .get("/api/User/ModifyPassword", {
              params: {
                uid: uid,
                oldPassword: that.ruleForm.oldPsd,
                newPassword: that.ruleForm.pass
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 1) {
                that.$message({
                  message: "修改成功",
                  type: "success"
                });
                 sessionStorage.removeItem("token_type");
                that.$router.push({ path: "/"});
               
              }
              if (res.data.code == -3) {
                that.$message.error("旧密码错误");
              }
              if (res.data.code == -2) {
                that.$message.error("参数错误");
              }
              if (res.data.code == 0) {
                that.$message("密码没有变化");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
