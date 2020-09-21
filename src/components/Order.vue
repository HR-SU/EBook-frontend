<template>
  <div>
    <el-row class="type">
      <el-col :span="4" :offset="10">
        <el-radio-group v-model="filterItem" @change="onRadioChange"
                        style="width: 100%">
          <el-radio-button label="byBook">按书名</el-radio-button>
          <el-radio-button label="byTime">按时间</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <div v-if="filterItem === 'byTime'" class="searchBar">
      <el-row>
        <el-col :span="8" :offset="8">
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至"
                          start-placeholder="开始日期" end-placeholder="结束日期"
                          style="width: 100%">
          </el-date-picker>
        </el-col>
      </el-row>
      <OrderItem v-for="orderInfo in rangedOrder" v-bind:order-info="orderInfo"
                 v-bind:key="orderInfo.orderId"/>
    </div>
    <div  v-if="filterItem === 'byBook'" class="searchBar">
      <el-row>
        <el-col :span="8" :offset="8">
          <el-input placeholder="输入内容以搜索" v-model="filterText"></el-input>
        </el-col>
      </el-row>
      <OrderItem v-for="orderInfo in filteredOrder" v-bind:order-info="orderInfo"
                 v-bind:key="orderInfo.orderId"/>
    </div>
  </div>
</template>

<script>
	import OrderItem from "./OrderItem";
  export default {
		name: "Order",
    components: {OrderItem},
    data () {
		  return {
		    filterItem: 'byTime',
        filterText: '',
		    dateRange: "",
        originData: []
      };
    },
    computed: {
      rangedOrder () {
		    if (this.dateRange === '' || this.dateRange === null) return this.originData;
        return this.originData.filter(
          order => {
            let s = new Date(order.orderDate);
            return s > this.dateRange[0] && s < this.dateRange[1];
        });
      },
      filteredOrder () {
		    if(this.filterText === '') return this.originData;
		    return this.originData.filter(
		      orderInfo => orderInfo.orderItems.some(orderItem =>
            orderItem.bookName.includes(this.filterText)
          )
        );
      }
    },
    mounted() {
		  let userName = sessionStorage.getItem('user');
      let url = 'http://localhost:9090/order/user?user=' + userName;
      this.$axios.get(url)
        .then(response => {
          this.originData = response.data;
          this.originData = this.originData.sort((a, b) => b.orderDate - a.orderDate);
        })
        .catch(err => {console.log(err)});
    }
  }
</script>

<style scoped>
  .type {
    margin-top: 5px;
  }
  .searchBar {
    margin-top: 5px;
    margin-bottom: 10px;
  }
</style>
