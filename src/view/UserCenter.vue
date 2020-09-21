<template>
  <div>
    <Head/>
    <Menu which-active="userCenter"/>
  </div>
</template>

<script>
	export default {
		name: "UserCenter",
    mounted() {
      if(sessionStorage.getItem("user") === null) this.$router.push("/login");
    }
	}
</script>

<style scoped>

</style>
