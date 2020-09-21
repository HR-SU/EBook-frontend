<template>
  <div class="books" @click="fetchDetail">
    <el-col :span="24">
      <el-card shadow="hover">
        <img v-bind:src="bookInfo.bookCover" class="img" alt=''/>
        <p class="bolder_font_weight bg_font_size one_row">{{bookInfo.bookName}}</p>
        <p>{{bookInfo.author}}</p>
        <p>库存：{{bookInfo.stock}}</p>
        <p class="float_right price">￥{{formatPrice(bookInfo.price)}}</p>
      </el-card>
    </el-col>
  </div>
</template>

<script>
    export default {
        name: "Book",
        props: ['bookInfo', 'index', 'mode'],
        data: function () {
          return{
            edit: '0',
            editValue: '',
            detail:''
          }
        },
        methods: {
          save: function (property) {
            this.edit = '0';
            this.$emit('handle-edit', this.index, property, this.editValue);
            this.editValue = '';
          },
          fetchDetail : function () {
            this.$router.push({
              name: "BookDetailPage",
              query: {
                id: this.bookInfo.bookId
              }
            });
          }
        }
    }
</script>

<style scoped>

</style>
