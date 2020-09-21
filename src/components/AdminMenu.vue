<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-menu :default-active="activeIndex" mode="horizontal" :router="true"
                 background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="/">主页</el-menu-item>
          <el-menu-item index="/admin/order">订单管理</el-menu-item>
          <el-menu-item index="/admin/user">用户管理</el-menu-item>
          <el-submenu>
            <template slot="title">购书统计</template>
            <el-menu-item index="/admin/statics/book">书籍热销榜</el-menu-item>
            <el-menu-item index="/admin/statics/user">用户消费榜</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="3">
        <el-menu mode="horizontal" @select="handleSelect"
                 background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b">
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
		name: "AdminMenu",
    props: ["whichActive"],
    data () {
		  return {
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
