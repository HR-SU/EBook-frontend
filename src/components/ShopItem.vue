<template>
  <div>
    <el-col :span="12" :offset="6">
      <el-card>
        <el-row>
          <el-col :span="8">
            <img :src="bookInfo.bookCover" alt='' class="img"/>
          </el-col>
          <el-col :span="16">
            <p class="title">{{bookInfo.bookName}}</p>
            <p>{{bookInfo.author}}</p>
            <p class="price">￥{{formatPrice(bookInfo.price)}}</p>
            <el-row>
              <el-col :span="6">
                <el-input-number v-model="amount"
                                 :min="1" label="购书数量" size="small"
                                 @change="changeAmount">
                </el-input-number>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-button type="info" icon="el-icon-delete"
                           v-on:click="delItem">从购物车中移除
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </div>
</template>

<script>
	export default {
		name: "ShopItem",
    props: ['bookInfo'],
    data () {
		  return {
		    amount: 1
      };
    },
    methods: {
		  delItem () {
		    this.$emit("handle-delete", this.bookInfo.itemId);
      },
      changeAmount () {
        let url = 'http://localhost:9090/cart/changeAmount';
        let requestBody = {
          itemId: this.bookInfo.itemId,
          amount: this.amount
        };
        this.$axios.post(url, requestBody);
        this.$emit("handle-change", this.bookInfo.itemId, this.amount);
      }
    },
    created() {
		  this.amount = this.bookInfo.amount;
    }
  }
</script>

<style scoped>
  .img {
    width: 200px;
    height: 200px;
  }
  .title {
    font-size: 1.5em;
    font-weight: bolder;
  }
  .price {
    font-weight: bolder;
    color: red;
  }
</style>
