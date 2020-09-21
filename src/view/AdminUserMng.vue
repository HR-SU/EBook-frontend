<template>
  <div>
    <AdminHead></AdminHead>
    <AdminMenu which-active="/admin/user"></AdminMenu>
    <AdminUser></AdminUser>
  </div>
</template>

<script>
	import AdminUser from "../components/AdminUser";
  export default {
		name: "AdminUserMng",
    components: {AdminUser}
  }
</script>

<style scoped>

</style>
