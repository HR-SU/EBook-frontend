<template>
  <div>
    <Head/>
    <Menu which-active="/shopList"/>
    <ShopCart/>
  </div>
</template>

<script>
	export default {
		name: "ShopList",
    mounted() {
      if(sessionStorage.getItem("user") === null) this.$router.push("/login");
    }
	}
</script>

<style scoped>

</style>
