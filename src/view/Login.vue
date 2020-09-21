<template>
  <div>
    <div class="background">
      <img :src="backgroundImg" width="100%" height="100%"/>
    </div>
    <div>
      <LoginCard v-on:login-end="handleLogin"/>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Login",
    data () {
		  return {
		    backgroundImg: require("../assets/back.jpg"),
      }
    },
    methods: {
		  handleLogin: function (isValid, userName, authority, isActive) {
        if(isValid) {
          if(isActive) {
            sessionStorage.setItem('user', userName);
            let role = "CUSTOMER";
            if (authority === "ROLE_ADMIN") role = "ADMIN";
            sessionStorage.setItem('authority', role);
            this.$router.push("/");
          }
          else {
            this.$alert("您已被禁用，无法登录", "登录出现问题...", {
              confirmButtonText: "确定"
            });
          }
        }
        else {
          this.$alert("用户名或密码错误", "登录出现问题...", {
            confirmButtonText: "确定"
          });
        }
      }
    }
	}
</script>

<style scoped>
  .background {
    width:100%;
    height:100%;
    z-index:-1;
    position: absolute;
  }
</style>
