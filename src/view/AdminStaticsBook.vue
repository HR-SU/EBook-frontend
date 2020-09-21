<template>
  <div>
    <AdminHead></AdminHead>
    <AdminMenu which-active="/admin/statics/book"></AdminMenu>
    <AdminStaticsBookCard></AdminStaticsBookCard>
  </div>
</template>

<script>
	import AdminStaticsBookCard from "../components/AdminStaticsBookCard";
  export default {
		name: "AdminStaticsBook",
    components: {AdminStaticsBookCard}
  }
</script>

<style scoped>

</style>
