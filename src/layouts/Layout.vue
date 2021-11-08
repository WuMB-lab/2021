<template>
  <div>
    <component :is="layout">
      <router-view v-if="isRouterAlive" transition transition-mode="out-in"></router-view>
    </component>
  </div>
</template>

<script>
  import { config } from '../common/config';
  import SiderLayout from './SiderLayout.vue';
  import NewLayout from './NewLayout.vue';
  export default {
    name: "LayoutContainer",
    components:{
      SiderLayout,
      NewLayout
    },
    provide(){
      return {
        reload: this.reload
      }
    },
    data(){
      return {
        default_layout: config.globalSetting.layout,//设置layout
        isRouterAlive: true,
        isSessionInit: false
      }
    },
    computed:{
      layout(){
        // if(this.isRouterAlive){
        //   console.log('this.$route.meta.layout:', this.$route.meta.layout);
        //   console.log('config.globalSetting.layout:', config.globalSetting.layout);
        // }
        return (this.$route.meta.layout || config.globalSetting.layout || 'sider-layout')
      }
    },
    methods: {
      //通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      }
    }
  }
</script>

<style scoped>

</style>