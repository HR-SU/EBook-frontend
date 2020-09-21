<template>
  <div>
    <el-row id="head">
      <el-col :offset="2" :span="10" id="headName">
        e-book
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'Head'
  }
</script>

<style scoped>
  #head {
    width: 100%;
    height: 50px;
    background-color: #F0F0F0;
  }
  #headName {
    color: #84C1FF;
    font-style: italic;
    font-size: 40px;
  }
</style>
