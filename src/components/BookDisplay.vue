<template>
  <div>
    <el-row v-if="mode === 'admin'" class="searchBar">
      <el-col :span="4" offset="1">
        <el-button type="primary" @click="addNewBook">
          添加新书籍
        </el-button>
      </el-col>
      <el-col :offset="1" :span="12">
        <el-input v-model="filterText" type="text" name="search" placeholder="搜索您想要的书籍"
                  @input="refresh"/>
      </el-col>
    </el-row>
    <el-row v-else class="searchBar">
      <el-col :offset="6" :span="12">
        <el-input v-model="filterText" type="text" name="search" placeholder="搜索您想要的书籍"
                  @input="refresh"/>
      </el-col>
    </el-row>
    <div>
      <Book v-for="bookInfo in books" v-bind:book-info="bookInfo"
            v-bind:key="bookInfo.bookId"></Book>
    </div>
  </div>
</template>

<script>
  export default {
		name: "BookDisplay",
    props: ['bookInfos'],
    data () {
      return{
        mode: 'customer',
        originData: this.bookInfos,
        books: this.bookInfos,
        filterText: ""
      }
    },
    methods: {
      refresh: function () {
        this.books = [];
        this.originData.forEach(
          (bookInfo) => {
            if(bookInfo.bookName.indexOf(this.filterText) === -1) return;
            this.books.push(bookInfo);
          }
        );
      },
      addNewBook: function () {
        this.$router.push({
          name: "BookDetailPage",
          query: {
            id: null
          }
        });
      }
    },
    mounted() {
		  let authority = sessionStorage.getItem("authority");
		  if(authority === "ADMIN") this.mode = "admin";
      this.$axios.get('http://localhost:9090/book/')
        .then(response => {this.originData.splice(0);response.data.forEach(item => {this.originData.push(item)})})
        .catch(err => {console.log(err);});
    }
  }
</script>

<style scoped>
  .searchBar {
    margin-top: 5px;
  }
</style>
