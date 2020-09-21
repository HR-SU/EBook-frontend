<template>
  <div>
    <AdminHead></AdminHead>
    <AdminMenu which-active="/admin/order"></AdminMenu>
    <AdminOder></AdminOder>
  </div>
</template>

<script>
	import AdminOder from "../components/AdminOder";
  export default {
		name: "AdminOrderMng",
    components: {AdminOder},
    mounted() {
      if(sessionStorage.getItem("user") === null) this.$router.push("/login");
    }
  }
</script>

<style scoped>

</style>
