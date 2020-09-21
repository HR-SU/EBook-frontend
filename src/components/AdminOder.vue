<template>
  <div>
    <el-row class="type">
      <el-col :span="6" :offset="9">
        <el-radio-group v-model="filterItem" @change="onRadioChange">
          <el-radio-button label="byBook">按书名</el-radio-button>
          <el-radio-button label="byUser">按用户</el-radio-button>
          <el-radio-button label="byTime">按时间</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row v-if="filterItem === 'byTime'" class="searchBar">
      <el-col :span="12" :offset="6">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row v-else class="searchBar">
      <el-col :span="12" :offset="6">
        <el-input placeholder="输入内容以搜索" v-model="filterText"></el-input>
      </el-col>
    </el-row>
    <el-row  v-if="filterItem !== 'byBook'">
      <el-col :span="16" :offset="4">
        <el-table :data="filteredOrders"
                  :default-sort="{prop: 'orderDate', order: 'descending'}">
          <el-table-column prop="userName" label="用户" sortable></el-table-column>
          <el-table-column prop="orderDate" label="下单时间"
                           :formatter="dateFormatter" sortable>
          </el-table-column>
          <el-table-column prop="totalSpend" label="账单总额"
                           :formatter="priceFormatter" sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleLookUp(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row  v-if="filterItem === 'byBook'">
      <el-col :span="16" :offset="4">
        <el-table :data="filteredOrderItems"
                  :default-sort="{prop: 'orderDate', order: 'descending'}">
          <el-table-column prop="bookName" label="书名" sortable></el-table-column>
          <el-table-column prop="userName" label="用户" sortable></el-table-column>
          <el-table-column prop="orderDate" label="下单时间"
                           :formatter="dateFormatter" sortable>
          </el-table-column>
          <el-table-column prop="amount" label="购书数量" sortable>
            <template slot-scope="scope">
              <p>{{scope.row.amount}}本</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleLookUp(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "AdminOder",
    data () {
		  return {
		    filterText: '',
        filterItem: 'byUser',
        dateRange: '',
        orders: [],
        orderItems: []
      }
    },
    computed: {
		  filteredOrders: function () {
        if(this.filterItem === 'byUser') {
          if(this.filterText === '') return this.orders;
          return this.orders.filter(order => order.userName.includes(this.filterText));
        }
        if(this.filterItem === 'byTime') {
          if (this.dateRange === "" || this.dateRange === null) return this.orders;
          return this.orders.filter(
            order => {
              let s = new Date(order.orderDate);
              return s > this.dateRange[0] && s < this.dateRange[1];
            }
          );
        }
        else return this.orders;
      },
      filteredOrderItems: function () {
        if(this.filterText === '') return this.orderItems;
        if(this.filterItem === "byBook")
          return this.orderItems.filter(
            orderItem => orderItem.bookName.includes(this.filterText)
          );
        else return this.orderItems;
      }
    },
    mounted() {
		  this.$axios.get('http://localhost:9090/order/admin')
        .then(response => {
          this.orders = response.data;
        })
        .catch(err => console.log(err));
    },
    methods: {
		  onRadioChange: function (val) {
		    if(val === 'byBook') {
		      this.$axios.get('http://localhost:9090/orderItem/admin')
            .then(response => {
              this.orderItems = response.data;
            })
            .catch(err => console.log(err));
        }
		    else {
          this.$axios.get('http://localhost:9090/order/admin')
            .then(response => {
              this.orders = response.data;
            })
            .catch(err => console.log(err));
        }
      },
		  handleLookUp: function (row) {
        let routeData = this.$router.resolve({
          name: "AdminOrderDetail",
          query: {
            orderId: row.orderId
        }});
        window.open(routeData.href, "_blank");
      },
      dateFormatter: function (row, colomn) {
        return this.assembleDate(row.orderDate);
      },
      priceFormatter: function (row, colomn) {
        return this.formatPrice(row.totalSpend);
      }
    }
  }
</script>

<style scoped>
  .type {
    margin-top: 5px;
  }
  .searchBar {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
