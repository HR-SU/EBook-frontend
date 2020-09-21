<template>
  <div>
    <el-col :span="12" :offset="6" v-if="editing === false">
        <el-card>
          <el-row>
            <el-col :span="12">
              <div class="left">
                <img :src="bookInfo.bookCover" class="img" alt="">
              </div>
            </el-col>
            <el-col :span="12">
              <div class="right">
                <p class="bgg_font_size bolder_font_weight">{{bookInfo.bookName}}</p>
                <p>{{bookInfo.author}}</p>
                <p>库存：{{bookInfo.stock}}</p>
                <p class="price">￥{{formatPrice(bookInfo.price)}}</p>
                <el-input-number v-model="amount" :min="1" label="购书数量" size="small"
                                 v-if="mode === 'customer'">
                </el-input-number>
                <el-button v-if="mode==='customer'" type="primary" @click="addToCart" icon="el-icon-shopping-cart-2">
                  加入购物车</el-button>
                <el-button v-if="mode === 'admin'" @click="editBookInfo">编辑书籍信息</el-button>
                <el-button v-if="mode === 'admin'" @click="deleteBook">删除书籍</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div>
              <el-divider>详细信息</el-divider>
              <P>ISBN号：{{bookInfo.isbn}}</P>
              <pre class="pre">{{bookInfo.detail}}</pre>
            </div>
          </el-row>
      </el-card>
    </el-col>
    <div v-else>
      <BookModifyCard :book-info="bookInfo" @edit-end="handleEditEnd"
                      @edit-cancel="handleEditCancel"
                      @handle-coverChange="coverChange"></BookModifyCard>
    </div>
  </div>
</template>

<script>
	import BookModifyCard from "./BookModifyCard";
  export default {
		name: "bookDetail",
    components: {BookModifyCard},
    data: function () {
		  return {
		    mode: "customer",
		    bookId: '',
        bookInfo: {},
        amount: 1,
        editing: false
      };
    },
    mounted() {
      let authority = sessionStorage.getItem("authority");
      if(authority === "ADMIN") this.mode = "admin";
		  let id = this.$route.query.id;
		  if(id === null) {
		    this.editing = true;
		    return;
      }
      let url = 'http://localhost:9090/book/detail?id=' + id;
      this.$axios.get(url)
        .then(response => {this.bookInfo = response.data})
        .catch(err => {console.log(err)});
    },
    methods: {
      addToCart: function () {
        let url = 'http://localhost:9090/cart/addcart';
        let request = {
          userName: sessionStorage.getItem('user'),
          bookId: this.bookInfo.bookId,
          amount: this.amount
        };
        this.$axios.post(url, request);
        this.$alert("已成功加入购物车", {
          confirmButtonText: "确定"
        });
      },
      editBookInfo: function () {
        this.editing = true;
      },
      deleteBook: function () {
        let url = 'http://localhost:9090/book/delete?id=' + this.bookInfo.bookId;
        this.$axios.post(url);
        this.$router.push("/");
      },
      handleEditEnd: function (modifiedBook) {
        let bookCover = this.bookInfo.bookCover;
        this.bookInfo = modifiedBook;
        this.bookInfo.detail = modifiedBook.bookOther.bookDetail;
        this.bookInfo.bookCover = bookCover;
        if(!modifiedBook.bookOther.bookCoverModified) this.editing = false;
      },
      coverChange: function (base64) {
        this.bookInfo.bookCover = base64;
        this.editing = false;
      },
      handleEditCancel: function () {
        this.editing = false;
      }
    }
  }
</script>

<style scoped>
  .left {
    height: 400px
  }
  .right {
    height: 400px;
  }
  .img {
    height: 300px;
    width: 300px;
  }
  .price {
    font-weight: bolder;
    font-size: 35px;
    color: red;
    margin-right: 1px;
  }
  .pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
