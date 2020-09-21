<template>
  <div>
    <div class="background">
      <img :src="backgroundImg" width="100%" height="100%"/>
      <div>
        <RegisterCard @reg-end="handleRegEnd" @reg-cancel="handleRegCal"/>
      </div>
    </div>
  </div>
</template>

<script>
	import RegisterCard from "../components/RegisterCard";
  export default {
		name: "Register",
    components: {RegisterCard},
    data () {
		  return {
        backgroundImg: require("../assets/back.jpg")
      }
    },
    methods: {
		  handleRegEnd() {
		    this.$router.push("/login");
      },
      handleRegCal() {
		    this.$router.push("/login");
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
