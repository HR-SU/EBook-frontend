<template>
  <div>
    <AdminHead v-if="this.mode==='admin'"></AdminHead>
    <Head v-else></Head>
    <AdminMenu v-if="this.mode==='admin'" which-active="/"></AdminMenu>
    <Menu v-else which-active="/"></Menu>
    <BookDisplay v-bind:book-infos="bookData"></BookDisplay>
  </div>
</template>

<script>
    export default {
      name: "Home",
      data () {
        return {
          bookData: [],
          mode: "customer"
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
