<template>
  <div class="home-container" style="minHeight: 500; height: 60%">
    <div style="textAlign: center; marginTop: 30px">
      <img alt="#" src="../../../../public/favicon.png" />
      <div class="home-content">
        <h1> Hello {{ testName }}! </h1>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "HomeContainer",
    computed: {
      ...mapState({
        testName: state => state.home.TEST_NAME
      })
    },
  }
</script>

<style scoped lang="less">
  .home-container{
    .home-content{
      margin-top: 30px;
      color: @sg-font-color;
    }
  }
</style>