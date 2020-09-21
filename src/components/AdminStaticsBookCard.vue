<template>
    <div>
      <el-row class="datePicker">
        <el-col :span="6" :offset="8">
          <el-date-picker v-model="dateRange" type="daterange" range-separator="至"
                          start-placeholder="开始日期" end-placeholder="结束日期"
                          style="width: 100%" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <el-col :offset="1" :span="3">
          <el-button type="primary" icon="el-icon-s-data" @click="handleStart">
            开始统计
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="5" :span="4">
          <p>图书总销量：{{totalAmount}}</p>
        </el-col>
        <el-col :offset="4" :span="4">
          <p>总销售额：￥{{formatPrice(totalSpend)}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-divider>详细信息</el-divider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table :data="staticsResult" stripe
                    :default-sort="{prop: 'amount', order: 'descending'}">
            <el-table-column type="index" :index="1"/>
            <el-table-column prop="bookName" label="书名" sortable></el-table-column>
            <el-table-column prop="amount" label="总售本数" sortable></el-table-column>
            <el-table-column prop="spend" label="销售额"
                             :formatter="priceFormatter" sortable>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
	export default {
		name: "AdminStaticsBookCard",
    data () {
		  return {
		    dateRange: '',
        staticsResult: []
      }
    },
    computed: {
      totalSpend: function () {
        let tmp = 0;
        this.staticsResult.forEach(value => tmp += value.spend);
        return tmp;
      },
      totalAmount: function () {
        let tmp = 0;
        this.staticsResult.forEach(value => tmp += value.amount);
        return tmp;
      }
    },
    methods: {
      priceFormatter: function (row, colomn) {
        return this.formatPrice(row.spend);
      },
      handleStart: function () {
        let url = '';
        if(this.dateRange === '' || this.dateRange === null) {
          url = 'http://localhost:9090/statics/admin/book?start='
            + '2000-01-01' + '&end='
            + '2030-01-01';
        }
        else {
          url = 'http://localhost:9090/statics/admin/book?start='
            + this.dateRange[0] + '&end='
            + this.dateRange[1];
        }
        this.$axios.get(url)
          .then(response => {
            this.staticsResult = response.data;
          })
          .catch(err => console.log(err));
      }
    },
    mounted() {
      let url = 'http://localhost:9090/statics/admin/book?start='
        + '2000-01-01' + '&end='
        + '2030-01-01';
      console.log(url);
      this.$axios.get(url)
        .then(response => {
          this.staticsResult = response.data;
        })
        .catch(err => console.log(err));
    }
	}
</script>

<style scoped>
  .datePicker{
    margin-top: 5px;
  }
</style>
