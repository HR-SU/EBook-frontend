<template>
  <el-card id="login_div">
    <div id="login_header" slot="header">用户登录</div>
    <div>
      <el-form id="login_sheet" label-position="left" :model="ruleForm"
               :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" type="text" name="username"
                    placeholder="用户名" class="login"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="text" name="password"
                    placeholder="请输入密码" class="login" show-password/>
        </el-form-item>
        <el-form-item>
          <el-col :span="7" :offset="3">
            <router-link to="/register" class="login">
              <el-button type="primary" plain style="width: 100%">注册账号</el-button>
            </router-link>
          </el-col>
          <el-col :span="7" :offset="4">
            <el-button type="success" @click="login('ruleForm')" style="width: 100%">登录</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
	export default {
		name: "LoginCard",
    data () {
		  return {
		    ruleForm: {
          userName: "",
          password: ""
        },
        rules: {
		      userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
		  login: function (form) {
        this.$refs[form].validate(valid =>{
          if(valid) {
            this.loginRequest(this.ruleForm);
          }
          else console.log('login error');
        });
      },
      loginRequest: async function (form) {
        let url = 'http://localhost:9090/user/login';
        let response = await this.$axios.post(url, form);
        let isValid = response.data.isValid;
        if(isValid) {
          let authority = response.data.authority;
          let isActive = response.data.isActive;
          this.$emit('login-end', true, form.userName, authority, isActive);
        }
        else this.$emit('login-end', false);
      }
    }
	}
</script>

<style scoped>
  #login_div {
    width: 500px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    opacity: 0.85;
  }
</style>
