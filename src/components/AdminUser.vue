<template>
  <div>
    <el-row class="searchBar">
      <el-col :offset="6" :span="12">
        <el-input placeholder="输入内容以搜索" v-model="filterText"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="4" :span="16">
        <el-table :data="filteredUserInfos"
                  :default-sort="{prop: 'authority', order: 'descending'}">
          <el-table-column prop="userName" label="用户名" sortable></el-table-column>
          <el-table-column prop="authority" label="用户类型" sortable></el-table-column>
          <el-table-column label="禁用">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isActive"
                         active-color="#13ce66" inactive-color="#ff4949"
                         active-text="启用" inactive-text="禁用"
                         :disabled="scope.row.authority === '管理员'"
                         @change="onSwitchChange($event, scope.row.userId)">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "AdminUser",
    data () {
		  return {
		    filterText: '',
        userInfos: []
      }
    },
    computed: {
		  filteredUserInfos: function () {
        if(this.filterText === '') return this.userInfos;
        return this.userInfos.filter(user => user.userName.includes(this.filterText));
      }
    },
    methods: {
		  onSwitchChange: function (val, id) {
        let url = 'http://localhost:9090/user/able?userId=' + id + '&active=' + val;
        this.$axios.put(url);
      }
    },
    created() {
      this.$axios.get('http://localhost:9090/user/allUser')
        .then(res => {
          this.userInfos = res.data;
          this.userInfos.forEach(userInfo => {
            if(userInfo.authority === 'ROLE_ADMIN')
              userInfo.authority = '管理员';
            else if(userInfo.authority === 'ROLE_CUSTOMER')
              userInfo.authority = '普通用户';
          });
        })
        .catch(err => {console.log(err)});
    }
  }
</script>

<style scoped>
  .searchBar {
    margin-top: 5px;
  }
</style>
