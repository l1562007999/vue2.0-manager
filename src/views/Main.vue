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
      <el-main style="padding-left:20px">
        <!-- 右下角需要被动态渲染的大部分, 所以使用router-view -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    CommonAside,
    CommonHeader
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding: 0;
}
</style>