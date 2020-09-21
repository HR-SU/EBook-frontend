<template>
  <div>
    <AdminHead></AdminHead>
    <AdminMenu which-active="/admin/order"></AdminMenu>
    <OrderItem :order-info="orderInfo"></OrderItem>
  </div>
</template>

<script>
  import OrderItem from "../components/OrderItem";
  export default {
		name: "AdminOrderDetail",
    components: {OrderItem},
    data () {
		  return {
		    orderInfo: {
		      orderItems: []
        }
      };
    },
    mounted() {
		  let orderId = this.$route.query.orderId;
		  this.$axios.get("http://localhost:9090/order/admin/detail", {
		    params: {
		      orderId: orderId
        }
      })
        .then(response => this.orderInfo = response.data)
        .catch(err => console.log(err));
    }
  }
</script>

<style scoped>

</style>
