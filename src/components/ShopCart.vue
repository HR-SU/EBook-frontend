<template>
  <div>
    <el-row>
      <el-col :span="2" :offset="9">
        <p class="sum">合计：￥{{formatPrice(sum)}}</p>
      </el-col>
      <el-col :span="4">
        <el-button type="success" id="clear_shop_cart" icon="el-icon-shopping-cart-2"
                   v-on:click="clearAll">结算
        </el-button>
      </el-col>
    </el-row>
    <div v-if="crtData !== []">
      <ShopItem v-for="bookInfo in crtData" v-bind:book-info="bookInfo" v-bind:key="bookInfo.itemId"
                @handle-delete="handleDel"
                @handle-change="handleChange(arguments)">
      </ShopItem>
    </div>
    <div v-else>
      <el-row>
      <p>您的购物车空空如也</p>
      </el-row>
    </div>
  </div>
</template>

<script>
	export default {
		name: "ShopCart",
    data () {
	    return {
	      crtData: []
      };
    },
    computed: {
		  sum: function () {
		    let sum = 0;
        this.crtData.forEach(value => sum += value.amount * value.price);
        return sum;
      }
    },
    methods: {
	    clearAll () {
	      let url = 'http://localhost:9090/order/placeorder';
        let user = {
          userName: sessionStorage.getItem('user')
        };
        this.$axios.post(url, user)
          .then(() => this.$router.push("/orderList"));
	      this.crtData = "";
      },
	    handleDel (id) {
	      let url = 'http://localhost:9090/cart/delItem?id=' + id;
        this.$axios.post(url);
	      this.crtData = this.crtData.filter(function (value) {
          return value.itemId !== id;
        });
      },
      handleChange (arg) {
	      this.crtData.forEach(value => {
	        if(value.itemId === arg[0]) value.amount = arg[1];
        });
      }
    },
    mounted() {
		  let userName = sessionStorage.getItem('user');
      let url = 'http://localhost:9090/cart/shopcart?userName=' + userName;
      this.$axios.get(url)
        .then(response => {this.crtData = response.data})
        .catch(err => {console.log(err)});
    }
  }
</script>;

<style scoped>
  .sum{
    font-size: 0.8em;
    color: red;
    margin-left: 5px;
    margin-top: 15px;
  }
</style>
