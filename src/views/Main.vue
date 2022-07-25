<template>
  <el-container style="height:100%">
    <el-aside width="auto">
      <!-- 左侧菜单栏 -->
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部 -->
        <common-header></common-header>
      </el-header>
      <common-tag></common-tag>
      <el-main style="padding-left:20px">
        <!-- 右下角需要被动态渲染的大部分, 所以使用router-view -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgb(81, 180, 247);
  border-radius: 10px;
  margin: 2px 5px 0px;
}
.el-aside {
  border-radius: 10px;
  margin: 2px 2px 2px 2px;
}
.el-main {
  padding: 0;
}
</style>