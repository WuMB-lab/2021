<template>
  <div id="app">
    <router-view transition transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  *{
    padding: 0;
    margin: 0;
  }
  a{
    text-decoration: none;
  }
  #app {
    color: rgba(0, 0, 0, 0.65);
    font-feature-settings: 'tnum', "tnum";
    line-height: 1.5715;
    background-color: #fff;
    font-variant: tabular-nums;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
</style>
