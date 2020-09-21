<template>
  <div>
    <el-row id="head">
      <el-col :offset="2" :span="10" id="headName">
        e-book(administrator)
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'AdminHead'
  }
</script>

<style scoped>
  #head {
    width: 100%;
    height: 50px;
    background-color: #5B5B5B;
  }
  #headName {
    color: #FFDC35;
    font-style: italic;
    font-size: 40px;
  }
</style>
