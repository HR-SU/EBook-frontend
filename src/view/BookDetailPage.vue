<template>
  <div>
    <AdminHead v-if="this.mode==='admin'"></AdminHead>
    <Head v-else></Head>
    <AdminMenu v-if="this.mode==='admin'" which-active="/"></AdminMenu>
    <Menu v-else which-active="/"></Menu>
    <BookDetail></BookDetail>
  </div>
</template>

<script>
	import BookDetail from "../components/BookDetail";
  export default {
		name: "BookDetailPage",
    components: {BookDetail},
    data () {
		  return {
		    mode: 'customer'
      }
    },
    mounted() {
      if(sessionStorage.getItem("user") === null) this.$router.push("/login");
      let authority = sessionStorage.getItem("authority");
      if(authority === "ADMIN") this.mode = "admin";
    }
  }
</script>

<style scoped>

</style>
