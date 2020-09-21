<template>
    <el-card id="book_modify_div">
      <div id="book_modify_header" slot="header">编辑书籍信息</div>
      <div>
        <el-form id="book_modify_form" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="封面">
            <el-upload ref="upload" action="string" :auto-upload="false"
                       :file-list="fileList" list-type="picture-card"
                       :http-request="uploadFile" limit="1"
                       :on-exceed="onExceed">
            </el-upload>
          </el-form-item>
          <el-form-item label="书籍名称" prop="bookName">
            <el-input v-model="ruleForm.bookName" type="text" name="bookname"
                      placeholder="书籍名称" class="book_modify_item"/>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author" type="text" name="author"
                      placeholder="作者" class="book_modify_item"/>
          </el-form-item>
          <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="ruleForm.isbn" type="text" name="isbn"
                      placeholder="ISBN" class="book_modify_item"/>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model.number="ruleForm.stock" type="text" name="stock"
                      placeholder="库存" class="book_modify_item"/>
          </el-form-item>
          <el-form-item label="价格（单位：分）" prop="price">
            <el-input v-model.number="ruleForm.price" type="text" name="price"
                      placeholder="价格（单位：分）" class="book_modify_item"/>
          </el-form-item>
          <el-form-item label="详细信息">
            <el-input v-model="ruleForm.bookOther.bookDetail" type="textarea" autosize name="detail"
                      placeholder="详细信息" class="book_modify_item"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
</template>

<script>
	export default {
		name: "BookModifyCard",
    props: ['bookInfo', 'bookDetail'],
    data () {
		  return {
		    fileList: [{name: 'prev', url: this.bookInfo.bookCover}],
		    ruleForm: {
		      bookId: this.bookInfo.bookId,
		      bookName: this.bookInfo.bookName,
          author: this.bookInfo.author,
          isbn: this.bookInfo.isbn,
          stock: this.bookInfo.stock,
          price: this.bookInfo.price,
          bookOther: {
		        bookId: this.bookInfo.bookId,
            bookDetail: this.bookInfo.detail,
            bookCoverModified: false
          }
        },
        rules: {
		      bookName: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          isbn: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          stock: [
            {required: true, message: '此项不能为空', trigger: 'blur'},
            {type: 'number', message: '请输入数字值', trigger: 'change'},
            {type: 'number', min: 0, message: '请输入正数'}
          ],
          price: [
            {required: true, message: '此项不能为空', trigger: 'blur'},
            {type: 'number', message: '请输入数字值', trigger: 'change'},
            {type: 'number', min: 0, message: '请输入正数'}
          ]
        }
      }
    },
    methods: {
		  onExceed: function () {
        this.$alert("最多只能上传1个图片", {
          confirmButtonText: "确定"
        });
      },
		  uploadFile: function (params) {
        let file = params.file;
        if(file === null) return true;
        this.ruleForm.bookOther.bookCoverModified = true;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          let base64str = fileReader.result;
          this.$emit("handle-coverChange", base64str);
          let data = {
            base64: base64str,
            bookId: this.ruleForm.bookId
          };
          let url = 'http://localhost:9090/book/uploadCover';
          this.$axios.post(url, data)
            .then(response => {console.log(response)})
            .catch(err => {console.log(err)});
          return true;
        }
      },
		  submit: function (form) {
        this.$refs[form].validate(valid =>{
          if(valid) {
            this.submitRequest();
          }
          else console.log('book submit error');
        })
      },
      submitRequest: async function () {
        let url = 'http://localhost:9090/book/modify';
        let response = await this.$axios.post(url, this.ruleForm);
        this.ruleForm.bookId = response.data;
        this.$refs.upload.submit();
        this.$alert("编辑成功", {
          confirmButtonText: "确定"
        });
        this.$emit('edit-end', this.ruleForm);
      },
      cancel: function () {
        this.$emit('edit-cancel');
      }
    }
	}
</script>

<style scoped>

</style>
