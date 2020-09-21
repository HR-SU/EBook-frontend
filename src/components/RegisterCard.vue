<template>
  <el-card id="reg_div">
    <div id="reg_header" slot="header">用户注册</div>
    <div>
      <el-form id="reg_sheet" label-position="left" :model="ruleForm"
               :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" type="text" name="username"
                    placeholder="用户名" class="login"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="text" name="password"
                    placeholder="请输入密码" class="login" show-password/>
        </el-form-item>
        <el-form-item label="重复密码" prop="checkPassword">
          <el-input v-model="ruleForm.checkPassword" type="text" name="checkPassword"
                    placeholder="请再次输入密码" class="login" show-password/>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="ruleForm.email" type="text" name="email"
                    placeholder="请输入邮箱地址" class="login"/>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :offset="2" :span="4">
              <el-button @click="cancel">取消</el-button>
            </el-col>
            <el-col :offset="12" :span="4">
              <el-button type="success" @click="submit('ruleForm')">注册</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
	export default {
		name: "RegisterCard",
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let validateUsername = (rule, value, callback) => {
        let url = 'http://localhost:9090/user/isDuplicate';
        let user = {
          userName: this.ruleForm.userName
        };
        this.$axios.post(url, user)
          .then(res => {
            if(res.data === true) callback(new Error('用户名重复'));
            else callback();
          })
          .catch(err => console.log(err));
      };
		  return {
		    ruleForm: {
		      userName: "",
          password: "",
          checkPassword: "",
          email: ""
        },
        rules: {
		      userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur'},
            {validator: validateUsername, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        }
      };
    },
    methods: {
      submit: function (form) {
        console.log("submit");
        this.$refs[form].validate(valid =>{
          if(valid) {
            this.$alert("注册成功", {
              confirmButtonText: "确定"
            });
            let regUser = {
              userName: this.ruleForm.userName,
              password: this.ruleForm.password,
              email: this.ruleForm.email
            };
            let url = 'http://localhost:9090/user/register';
            this.$axios.post(url, regUser)
              .then(response => {console.log(response)})
              .catch(err => {console.log(err)});
            this.$emit('reg-end');
          }
          else console.log('user submit error');
        })
      },
      cancel: function () {
        this.$emit('reg-cancel');
      }
    }
	}
</script>

<style scoped>
  #reg_div{
    width: 500px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    opacity: 0.85;
  }
</style>
