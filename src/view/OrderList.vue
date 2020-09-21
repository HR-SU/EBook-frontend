<template>
  <div>
    <Head/>
    <Menu which-active="/orderList"/>
    <Order/>
  </div>
</template>

<script>
	import Order from "../components/Order";
  export default {
		name: "OrderList",
    components: {Order},
    mounted() {
      if(sessionStorage.getItem("user") === null) this.$router.push("/login");
    }
  }
</script>

<style scoped>

</style>
