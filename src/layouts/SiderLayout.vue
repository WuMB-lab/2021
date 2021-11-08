<template>
  <!-- <router-view transition transition-mode="out-in"></router-view> -->
  <!-- <div>这里已经被我关闭了，这里是 BasicLayout</div> -->
  <div class="slider-layout">
    <a-layout>
      <a-layout-sider
        :width="280"
        v-model="collapse"
        :trigger="null"
        collapsible
        collapsedWidth="48px">
        <global-menus></global-menus>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <!-- <global-header></global-header>
          <global-breadcrumb
            style="padding-bottom: 0;"
            v-if="setting.showBreadcrumb"
            :title="title"
          ></global-breadcrumb> -->
        </a-layout-header>
        <a-layout-content>

        </a-layout-content>
        <a-layout-footer>

        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  import { Layout } from 'ant-design-vue';
  import GlobalMenus from '../components/GlobalMenus/GlobalMenus.jsx';
  // import GlobalHeader from '../components/GlobalHeader/index.vue';
  // import GlobalBreadcrumb from '../components/GlobalBreadcrumb/index.vue';
  import { mapState } from 'vuex';
  const ALayoutHeader = Layout.Header;
  const ALayoutFooter = Layout.Footer;
  const ALayoutSider = Layout.Sider;
  const ALayoutContent = Layout.Content;
  export default {
    name: "SiderLayout",
    components: {
      ALayoutHeader,
      ALayoutFooter,
      ALayoutSider,
      ALayoutContent,
      ALayout: Layout,
      GlobalMenus,
      // GlobalHeader,
      // GlobalBreadcrumb
    },
    computed: {
      ...mapState([
        'setting', 'collapse'
      ])
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>

</style>