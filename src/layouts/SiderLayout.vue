<template>
  <!-- <router-view transition transition-mode="out-in"></router-view> -->
  <!-- <div>这里已经被我关闭了，这里是 BasicLayout</div> -->
  <div class="sider-layout">
    <a-layout>
      <a-layout-sider
        :width="280"
        v-model="collapse"
        :trigger="null"
        collapsible
        collapsedWidth="48px">
        <global-menus @on-collapse-change="handleChange"></global-menus>
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
          <transition>
            <keep-alive>
              <router-view
                transition
                transition-mode="out-in"></router-view>
            </keep-alive>
          </transition>
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
  import { mapState, mapActions } from 'vuex';
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
    },
    methods: {
      ...mapActions([
        'changeCollapse'
      ]),
      handleChange: function(collapse) {
        this.changeCollapse(collapse)
      }
    }
  }
</script>

<style scoped lang="less">
  .sider-layout{
    background-color: #f0f2f5;
    min-height: 100vh;
    height: 100%;
    .ant-layout{
      min-height: 100%;
    }
    .ant-layout-header{
      padding: 0;
      background: #f0f2fa;
    }
  }
</style>