<template>
  <div>
    <AdminHead></AdminHead>
    <AdminMenu which-active="/admin/statics/user"></AdminMenu>
    <AdminStaticsUserCard></AdminStaticsUserCard>
  </div>
</template>

<script>
	import AdminStaticsUserCard from "../components/AdminStaticsUserCard";
  export default {
		name: "AdminStaticsUser",
    components: {AdminStaticsUserCard}
  }
</script>

<style scoped>

</style>
