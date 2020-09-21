<template>
  <div>
    <Head></Head>
    <Menu which-active="/statics"/>
    <StaticsCard></StaticsCard>
  </div>
</template>

<script>
	import StaticsCard from "../components/StaticsCard";
  export default {
		name: "Statics",
    components: {StaticsCard}
  }
</script>

<style scoped>

</style>
