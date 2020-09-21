<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
          <el-menu-item index="/">主页</el-menu-item>
          <el-menu-item index="/orderList">我的订单</el-menu-item>
          <el-menu-item index="/shopList">我的购物车</el-menu-item>
          <el-menu-item index="/statics">购书统计</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3">
        <el-menu mode="horizontal" @select="handleSelect">
          <el-submenu>
            <template slot="title">欢迎，{{userName}}</template>
            <el-menu-item index="1">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    props: ['whichActive'],
    data () {
      return{
        activeIndex: this.whichActive,
        userName: ''
      }
    },
    methods: {
      handleSelect: function (index) {
        console.log(index);
        if(index === '1') this.logout();
      },
      logout: function () {
        sessionStorage.clear();
        this.$router.push("/login");
      }
    },
    mounted() {
      this.userName = sessionStorage.getItem('user');
    }
  }
</script>

<style scoped>

</style>
