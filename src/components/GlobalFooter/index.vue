<template>
  <div class="footer-container">
    <p>
      <a v-for="item in links" :key="item.key" :href="item.href" :target="item.blankTarget && '_blank'">
        {{ item.title }}
      </a>
    </p>
    <p>
      Copyright
      <i class="iconfont sg-copyright" />
      {{ copyright + ' 出品' }}
    </p>
  </div>
</template>

<script>
  import { config } from '../../common/config';

  export default {
    name: "GlobalFooter",
    data: function () {
      return {
        links: [
          {
            key: 'Footer-WMBGitBook',
            title: 'Footer-WMB GitBook',
            href: 'http://www.baidu.com',
            blankTarget: true
          },
          {
            key: 'GitHub',
            title: 'GitHub',
            href: 'http://www.baidu.com',
            blankTarget: true
          },
          {
            key: 'Footer-WMBDocs',
            title: 'Footer-WMB Docs',
            href: 'http://www.baidu.com',
            blankTarget: true
          }
        ],
        copyright: config.copyright
      }
    }
  }
</script>

<style scoped lang="less">
  .footer-container{
    text-align: center;
    padding: 24px 0;
    width: 100%;
    height: 108px;
    box-sizing: border-box;
    p {
      font-size: 14px;
      color: #595959;
      margin-bottom: 1em;
      a {
        color: #595959;
        margin: 0 24px;
      }
    }
  }
</style>