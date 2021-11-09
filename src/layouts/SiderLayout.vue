<template>
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
          <global-header></global-header>
          <global-breadcrumb
            style="padding-bottom: 0;"
            v-if="setting.showBreadcrumb"
            :title="title"
          ></global-breadcrumb>
        </a-layout-header>
        <a-layout-content>
          <global-tags-view
            style="background-color: #fff; margin-bottom: 16px; height: 42px;"
            :tabs="tabs"
            :current-tab="currentTab"
            @on-click="handleClickTabs"
            @on-close="handleCloseTabs"
            @close-all="handleCloseAllTabs"
            @close-other="handleCloseOtherTabs"
            @refresh="handleRefresh"
          ></global-tags-view>
          <transition>
            <keep-alive>
              <router-view
                transition
                transition-mode="out-in"></router-view>
            </keep-alive>
          </transition>
        </a-layout-content>
        <a-layout-footer>
          <global-footer></global-footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  import { Layout } from 'ant-design-vue';
  import GlobalMenus from '../components/GlobalMenus/GlobalMenus.jsx';
  import GlobalHeader from '../components/GlobalHeader/index.vue';
  import GlobalBreadcrumb from '../components/GlobalBreadcrumb/index.vue';
  import GlobalFooter from '../components/GlobalFooter/index.vue';
  import GlobalTagsView from '../components/GlobalTagsView/index.vue';
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
      GlobalHeader,
      GlobalBreadcrumb,
      GlobalFooter,
      GlobalTagsView
    },
    computed: {
      ...mapState([
        'setting', 'collapse', 'currentTab', 'tabs'
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
      },
      handleCloseTabs(tab) {
        this.closeTabs(tab);
      },
      handleClickTabs(tab) {
        let fullPath;
        this.tabs.every((item) => {
          if (item.fullPath === tab) {
            fullPath = item.fullPath;
            return false;
          } else {
            return true;
          }
        });
        this.$router.push(fullPath);
      },
      handleCloseAllTabs() {
        this.closeAllTabs();
      },
      handleCloseOtherTabs() {
        this.closeOtherTabs();
      },
      handleRefresh() {
        if (this.$route.path.startsWith('/management')) {
          if (this.$refs.microApp.microApp) {
            this.$refs.microApp.microApp.unmount();
          }
          setTimeout(() => {
            this.$refs.microApp.loadManagementApp();
          }, 50)
        } else {
          this.isRouterAlive = !this.isRouterAlive;
          this.exclude = this.$route.name;
          this.$nextTick(function () {
            this.isRouterAlive = !this.isRouterAlive;
            this.exclude = null;
          })
        }
      },
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