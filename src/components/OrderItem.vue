<template>
    <div>
      <el-col :span="12" :offset="6">
        <el-card>
          <el-row class="header">
            <el-col :span="14" :offset="2">
              <div class="headerText">下单日期:{{assembleDate(orderInfo.orderDate)}}</div>
            </el-col>
            <el-col :span="8">
              <div class="headerText">订单总额：{{formatPrice(orderInfo.totalSpend)}}元</div>
            </el-col>
          </el-row>
          <div v-for="orderItem in orderInfo.orderItems" v-bind:key="orderItem.itemId">
            <el-row>
              <el-col :span="15" :offset="2">
                <p class="bookName">{{orderItem.bookName}}</p>
                <p>{{orderItem.author}}</p>
                <p class="amount">×{{orderItem.amount}}</p>
              </el-col>
              <el-col :span="5">
                <p class="spend">{{formatPrice(orderItem.spend)}}元</p>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-card>
      </el-col>
    </div>
</template>

<script>
	export default {
		name: "OrderItem",
    props: ["orderInfo"]
	}
</script>

<style scoped>
  .header {
    height: 50px;
    padding-top: 15px;
    background-color: silver;
  }
  .headerText {
    font-weight: bolder;
  }
  .bookName {
    font-size: 1.2em;
    font-weight: bolder;
  }
  .amount {
    font-size: 0.8em;
    font-weight: lighter;
  }
  .spend {
    font-size: 1.2em;
    font-weight: bolder;
    color: red;
  }
</style>
